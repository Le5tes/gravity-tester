const TreeBuilder = require('barnes-hut-tree-builder').BarnesHutTreeBuilder;
const generateRandomBodies = require('./createTestData').generateRandomBodies;
const performance = require('perf_hooks').performance;

runTest = async (numberOfBodies) => {
    treeBuilder = await TreeBuilder.create();
    bodies = generateRandomBodies(numberOfBodies, 1000, 100, 500)
    time0 = performance.now();
    treeBuilder.buildToArray(bodies, 1000,0,0);
    time1 = performance.now();
    const buildArray = treeBuilder.buildToArray(bodies, 1000,0,0);
    time2 = performance.now();
    treeBuilder.build(bodies,1000,0,0);
    time3 = performance.now();
    console.log(`Ran buildToArray with ${numberOfBodies} bodies in ${time2 - time1}ms`);
    console.log(`created ${buildArray.length} nodes`);
    console.log(`Ran build with ${numberOfBodies} bodies in ${time3 - time2}ms`);
    console.log("\n")
}

runTestInternalPerformanceLogs = async (numberOfBodies) => {
    console.log(`Running test with internal logs, ${numberOfBodies} bodies`)
    treeBuilder = await TreeBuilder.create({debug: true});
    bodies = generateRandomBodies(numberOfBodies, 1000, 100, 500)
    treeBuilder.buildToArray(bodies, 1000,0,0);
}

runRepeatedTest = async(numberOfBodies, times) => {
    treeBuilder = await TreeBuilder.create();
    console.log(`Running repeated tests with ${numberOfBodies} bodies`)
    Array(times).fill('').forEach(() => {
        bodies = generateRandomBodies(numberOfBodies, 1000, 100, 500)
        time1 = performance.now();
        const buildArray =treeBuilder.buildToArray(bodies, 1000,0,0);
        time2 = performance.now();
        console.log(`Time: ${time2 - time1}ms, Nodes: ${buildArray.length}`);
    })
}

runTestNumberOfEmptyNodes = async (numberOfBodies) => {
    treeBuilder = await TreeBuilder.create();
    bodies = generateRandomBodies(numberOfBodies, 1000, 100, 500)
    result = treeBuilder.buildToArray(bodies, 1000,0,0);
    nodes = result.length;
    emptyNodes = result.filter(val => {
        return (val[7] == -1 && val[8] == -1 && val[9] == -1 && val[10] == -1 && val[11] == -1)
    }).length;

    console.log(`Number of empty nodes: ${emptyNodes}/${nodes} (built with ${numberOfBodies} bodies)`)
}

runTests = async () => {
    await runTest(5);
    await runTest(1000);
    await runTest(10000);
    await runTest(20000);
    await runTest(100000);

    await runTestInternalPerformanceLogs(20000);
    await runTestNumberOfEmptyNodes(20000);

    await runRepeatedTest(10000, 20);
}

runTests();
