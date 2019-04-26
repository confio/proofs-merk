const merk = require('merk');
const levelup = require('levelup');
const memdown = require('memdown');

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

demoTree().then(() => console.log("done"));