const { extractOps, getKeyValue } = require("./index");
 
describe("extractOps", () => {
    it("can convert a leaf node", () => {
        const input = { left: null, right: null, key: '.', value: '{"dead":"beef"}' };
        const std = extractOps(input);
        // one leaf and one inner
        expect(std.length).toEqual(2); 

        // const rootHash = "986e31a92d538f98da9378a4c6e49ad8c03b9470";
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