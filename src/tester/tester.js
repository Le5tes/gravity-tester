class Tester {
  constructor(
    treeBuilderClass = require('@gravity-simulator/barnes-hut-tree-builder').BarnesHutTreeBuilder,
    testDataBuilder = require('../test-data/createTestData')) {
    this.treeBuilderClass = treeBuilderClass;
    this.testDataBuilder = testDataBuilder;
  }

  async testBuild(bodyCount, size = 1000, maxMass = 1000, minMass = 0) {
    const bodies = this.testDataBuilder.generateRandomBodies(bodyCount, size, maxMass, minMass)
    return await this.testBuildWithData(bodies, size, 0, 0);
  }

  async testBuildWithData(bodies, width, cornerX, cornerY) {
    const treeBuilder = await this.treeBuilderClass.create();

    const t1 = performance.now();
    treeBuilder.build(bodies, width, cornerX, cornerY);
    const t2 = performance.now();
    return t2 - t1;
  }
}

exports.Tester = Tester;