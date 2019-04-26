const merk = require('merk');
const levelup = require('levelup');
const memdown = require('memdown');

// demoSingle is just a leaf node
async function demoSingle() {
    const db = levelup(memdown());
    let state = await merk(db);

    state.dead = 'beef';
    await merk.commit(state)

    let rootHash = merk.hash(state)
    console.log(`root = ${rootHash}`)

    // create a JSON Merkle proof of the queried path
    let proof = await merk.proof(state, 'dead')
    console.log("")
    console.log(proof)
}


// demoTree contains many items which embed other ones
// this creates somewhat complex proofs
async function demoTree() {
    const db = levelup(memdown());
    let state = await merk(db);

    // TODO: add more data
    state.foo = 'bar';
    state.food = 'yummy';
    state.bath = {tub: 'full', room: 'small'};
    state.baz = { x: 123, y: { z: 456 } };

    await merk.commit(state)

    let rootHash = merk.hash(state)
    console.log(`root = ${rootHash}`)

    // create a JSON Merkle proof of the queried path
    let proof = await merk.proof(state, 'baz.y')
    console.log("")
    console.log("merk.proof(state, 'baz.y')")
    console.log(proof)

    proof = await merk.proof(state, 'food')
    console.log("")
    console.log("merk.proof(state, 'food')")
    console.log(proof)

    proof = await merk.proof(state, 'baz')
    console.log("")
    console.log("merk.proof(state, 'baz')")
    console.log(proof)
} 

// demoLeaves is a nested heirarchy to simulate ibc packets.
// we only query for end results, never prefixes.
// example: 
//   ibc.chain_a.in.0 = "abcd"
//   ibc.chain_a.in.1 = "deaf"
//   ibc.chain_a.out.0 = "food"
async function demoLeaves() {
    const db = levelup(memdown());
    let state = await merk(db);

    state.ibc = {}
    state.ibc.chain_a = {}
    state.ibc.chain_b = {}

    state.ibc.chain_a.in = {
        0: "abcd",
        1: "deaf",
        2: "limit",
    }
    state.ibc.chain_a.out = {
        0: "resp",
        1: "reqd",
    }
    state.ibc.chain_b.in = {
        0: "pending",
    }

    state.cash = {
        "foo": 100,
        "bar": 1000,
        "dings": 59.45,
    }

    await merk.commit(state)

    let rootHash = merk.hash(state)
    console.log(`root = ${rootHash}`)

    // create a JSON Merkle proof of the queried path
    let proof = await merk.proof(state, 'ibc.chain_a.out.0')
    console.log("")
    console.log("merk.proof(state, 'ibc.chain_a.out.0')")
    console.log(proof)
}


demoTree().
    then(demoLeaves).
    then(demoSingle).
    then(() => console.log("done")).
    catch(err => console.log(`error: ${err}`));
