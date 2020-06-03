class Tester {
  constructor(
    treeBuilderClass = require('@gravity-simulator/barnes-hut-tree-builder').BarnesHutTreeBuilder,
    testDataBuilder = require('../test-data/createTestData'),
    resolverModule = require('@gravity-simulator/gravity-resolver')) {
    this.treeBuilderClass = treeBuilderClass;
    this.testDataBuilder = testDataBuilder;
    this.GravityResolver = resolverModule.GravityResolver 
    this.TreeResolver = resolverModule.BarnesHutTreeResolver 
  }

  async testBuild(bodyCount, size = 1000, maxMass = 1000, minMass = 0) {
    const bodies = this.testDataBuilder.generateRandomBodies(bodyCount, size, maxMass, minMass)
    return await this.testBuildWithData(bodies, size, 0, 0);
  }

  async testBuildWithData(bodies, width, cornerX, cornerY) {
    const treeBuilder = await this.treeBuilderClass.create();

    return this.time(() => treeBuilder.build(bodies, width, cornerX, cornerY));
  }

  testResolve(bodyCount, size = 1000, maxMass = 1000, minMass = 0) {
    const bodies = this.testDataBuilder.generateRandomBodies(bodyCount, size, maxMass, minMass);

    return this.testResolveWithData(bodies);
  }

  testResolveWithData(bodies) {
    const resolver = new this.GravityResolver();

    return this.time(() => resolver.resolveNewPositions(bodies));
  }

  async testBuildAndResolveTree(bodyCount, size = 1000, maxMass = 1000, minMass = 0) {
    const bodies = this.testDataBuilder.generateRandomBodies(bodyCount, size, maxMass, minMass)

    const treeBuilder = await this.treeBuilderClass.create();
    let bodyTree;
    return [
      this.time(() => bodyTree = treeBuilder.build(bodies, size, 0, 0)),
      this.testResolveTree(bodyTree)
    ]
  }

  testResolveTree(bodyTree) {
    const resolver = new this.TreeResolver();

    return this.time(() => resolver.resolveNewPositions(bodyTree));
  }

  time(fn) {
    const t1 = performance.now();
    fn()
    const t2 = performance.now();
    return t2 - t1;
  }
}

exports.Tester = Tester;