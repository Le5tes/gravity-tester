const TreeBuilder = require('barnes-hut-tree-builder').BarnesHutTreeBuilder;
const generateRandomBodies = require('./createTestData').generateRandomBodies;
const performance = require('perf_hooks').performance;

runTest = async (numberOfBodies) => {
    treeBuilder = await TreeBuilder.create();
    bodies = generateRandomBodies(numberOfBodies, 1000, 100, 500)
    time1 = performance.now();
   const buildArray =treeBuilder.buildToArray(bodies, 1000,0,0);
    time2 = performance.now();
    console.log(`Ran ${numberOfBodies} bodies in ${time2 - time1}ms`);
    console.log(`created ${buildArray.length} nodes`)
}

runTest(5);
runTest(1000);
runTest(10000);
runTest(20000);
runTest(100000);
