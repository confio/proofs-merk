const { calculateExistenceRoot } = require("@confio/proofs"); 
const { Encoding } = require("@iov/encoding");

const { convertProof, extractOps, getKeyValue } = require("./index");
 
describe("getKeyValue", () => {
    it("works with leaf node", () => {
        const input = { left: null, right: null, key: '.', value: '{"dead":"beef"}' };
        const {key, value} = getKeyValue(input);
        expect(key).toEqual(".");
        expect(value).toEqual('{"dead":"beef"}');
    });

    it("works with depth one", () => {
        const input = { 
            left: 'F4j9DF3/N4rBqoX4JYyW9AdvDAo=',
            right: { 
                left: null, 
                right: null, 
                key: '.baz.y', 
                value: '{"z":456}' 
            },
            key: '.baz',
            value: '{"x":123}'
        };
        const {key, value} = getKeyValue(input);
        expect(key).toEqual('.baz.y');
        expect(value).toEqual('{"z":456}');
    });
});

describe("extractOps", () => {
    it("can convert a leaf node", () => {
        const input = { left: null, right: null, key: '.', value: '{"dead":"beef"}' };
        const std = extractOps(input);
        // one leaf and one inner
        expect(std.length).toEqual(2); 
    });

    it("can convert a sample proof", () => {
        const input = { 
            left: 'F4j9DF3/N4rBqoX4JYyW9AdvDAo=',
            right: { 
                left: null, 
                right: null, 
                key: '.baz.y', 
                value: '{"z":456}' 
            },
            key: '.baz',
            value: '{"x":123}'
        };
        const std = extractOps(input);
        // one leaf and two inner
        expect(std.length).toEqual(3); 
    });
});


describe("convertProot", () => {
    it("can convert a leaf node", () => {
        const input = { left: null, right: null, key: '.', value: '{"dead":"beef"}' };
        const std = convertProof(input);
        // one leaf and one inner
        expect(std.steps.length).toEqual(2); 
        expect(std.key).toEqual(Encoding.toAscii('.'));

        const root = calculateExistenceRoot(std);
        expect(Encoding.toHex(root)).toEqual("986e31a92d538f98da9378a4c6e49ad8c03b9470");
    });

    it("can convert a sample proof", () => {
        const input = { 
            left: 'F4j9DF3/N4rBqoX4JYyW9AdvDAo=',
            right: { 
                left: null, 
                right: null, 
                key: '.baz.y', 
                value: '{"z":456}' 
            },
            key: '.baz',
            value: '{"x":123}'
        };
        const std = convertProof(input);

        expect(std.steps.length).toEqual(3); 
        expect(std.key).toEqual(Encoding.toAscii('.baz.y'));

        const root = calculateExistenceRoot(std);
        expect(Encoding.toHex(root)).toEqual("a5a3a7255ef65deea2ba17b22b3b5b1521628a22");
    });
});
