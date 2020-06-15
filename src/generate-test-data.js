const fs = require('fs');
const generateRandomBodies = require('./test-data/createTestData').generateRandomBodies;
const TreeBuilder = require('@gravity-simulator/barnes-hut-tree-builder').BarnesHutTreeBuilder;
const util = require('util');



const bodies = generateRandomBodies(1000,10000,0,200);
TreeBuilder.create().then(treebuilder => {
    const tree = treebuilder.buildToArray(bodies, 10000, 0, 0);
    fs.writeFileSync('./out-bodies.js', util.inspect(bodies, { maxArrayLength: null }) , 'utf-8')
    fs.writeFileSync('./out-tree.js', util.inspect(tree, { maxArrayLength: null }) , 'utf-8')
})
