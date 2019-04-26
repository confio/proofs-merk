# Proofs merk

Creating generic [@confio/proofs](https://github.com/confio/proofs) from "merk" output.

## Demo

This is just demo code now to understand the format.

**Required node 10+** (async support)

```shell
yarn install
node index.js
```

### Example output

```js
root = a5a3a7255ef65deea2ba17b22b3b5b1521628a22

merk.proof(state, 'baz.y')
{ left: 'F4j9DF3/N4rBqoX4JYyW9AdvDAo=',
  right:
   { left: null, right: null, key: '.baz.y', value: '{"z":456}' },
  key: '.baz',
  value: '{"x":123}' }

merk.proof(state, 'food')
{ left:
   { left:
      { left: null,
        right: null,
        key: '.',
        value: '{"foo":"bar","food":"yummy"}' },
     right: null,
     key: '.bath',
     value: '{"room":"small","tub":"full"}' },
  right: 'Z7Rs82itYwVwev3PUp0KFDpX9hc=',
  kvHash: '2RiU70Z1dYW4CHRnRkzZ2YlqJDI=' }

merk.proof(state, 'baz')
{ left:
   { left: 'Gz3aZl3tnR+LqpSZMgcA2pb23oI=',
     right: null,
     key: '.bath',
     value: '{"room":"small","tub":"full"}' },
  right:
   { left: null, right: null, key: '.baz.y', value: '{"z":456}' },
  key: '.baz',
  value: '{"x":123}' }
```

Also see https://github.com/nomic-io/merk/issues/9 for a discussion of the format and validation algorithm
