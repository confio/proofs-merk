const { applyLeaf, proofs } = require("@confio/proofs");
const { Encoding } = require("@iov/encoding");

// convertProof converts a merk.js proof into @confio/proof format
// returns existence proofs, only works with one leaf
function convertProof(root) {
    const { key, value } = getKeyValue(root);
    return {
        key: Encoding.toAscii(key),
        value: Encoding.toUtf8(value),
        steps: extractOps(root),
    }
}

// get key value returns the key and value of leaf node as strings
function getKeyValue(node) {
    if (isLeaf(node)) {
        return {key: node.key, value: node.value}
    }
    return isChild(node.left) ? getKeyValue(node.left): getKeyValue(node.right)
}

function extractOps(node) {
    if (isLeaf(node)) {
        return genLeafProof(node);
    }
    return genInnerProof(node);
}

const isLeaf = (node) => (!node.left && !node.right);

const isChild = (child) => (child !== null && typeof child === "object");

const isEmpty = (child) => (child === null || child === undefined);

const merkLeafOp = {
    hash: proofs.HashOp.BITCOIN,
    length: proofs.LengthOp.VAR_PROTO,    
}

function genLeafProof(node) {
    const leaf = {
        leaf: merkLeafOp,
    };
    const rehash = {
        inner: {
            hash: proofs.HashOp.BITCOIN,
            prefix: new Uint8Array(40),
        }
    }
    return [leaf, rehash];
}

// this means either left or right is a child
function genInnerProof(node) {
    if (isChild(node.left)) {
        const subtree = extractOps(node.left);
        const step = {
            inner: {
                hash: proofs.HashOp.BITCOIN,
                suffix: new Uint8Array([...childHash(node.right), ...kvHash(node)]),
            }
        }
        return [...subtree, step];
    } else if (isChild(node.right)) {
        const subtree = extractOps(node.right);
        const step = {
            inner: {
                hash: proofs.HashOp.BITCOIN,
                prefix: childHash(node.left),
                suffix: kvHash(node),
            }
        }
        return [...subtree, step];
    } else {
        throw new Error("call genInnerProof, but left nor right are child");
    }
}

function kvHash(node) {
    if (node.kvHash) {
        return Buffer.from(node.kvHash, 'base64');
    }
    return applyLeaf(merkLeafOp, node.key, node.value);
}

function childHash(child) {
    if (isEmpty(child)) {
        return new Uint8Array(20);
    } else if (typeof child === "string") {
        return Buffer.from(child, "base64");
    } else {
        throw new Error(`Cannot return child hash of ${child}`);
    }
}

module.exports = {
    convertProof,
    getKeyValue,
    extractOps,
};