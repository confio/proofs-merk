# Proofs merk

Creating generic [@confio/proofs](https://github.com/confio/proofs) from "merk" output.

## Demo

This is just demo code now to understand the format.

**Required node 10+** (async support)

```shell
yarn install
node demo.js
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

Another example:

```js
root = 5fa943e9dac00adac3c1e52ef2ac3dfd0c348451

merk.proof(state, 'ibc.chain_a.out.0')
{ left: 
   { left: 'PCZt2mUUKj31EXESUYo+BVYcRrA=',
     right: 
      { left: null,
        right: null,
        key: '.ibc.chain_a.in',
        value: '{"0":"abcd","1":"deaf","2":"limit"}' },
     kvHash: 'USRr7L8cAVK76DfAJsfk6kct6OY=' },
  right: 
   { left: null,
     right: 'bMSoOILGkbp2M9ShvyDX+kvNMxw=',
     key: '.ibc.chain_b',
     value: '{}' },
  key: '.ibc.chain_a.out',
  value: '{"0":"resp","1":"reqd"}' }
  ```

Also see https://github.com/nomic-io/merk/issues/9 for a discussion of the format and validation algorithm
