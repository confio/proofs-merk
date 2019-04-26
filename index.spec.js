const { convertProof } = require("./index");
 
describe("convertProof", () => {
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
        // one leaf and two inner
        expect(std.length).toEqual(3); 
    });
});