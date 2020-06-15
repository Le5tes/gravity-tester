/**
 * @jest-environment node
 */

const Tester = require('./tester').Tester;
const getStub = require('../../test-utils/test-utils').getStub;

describe('Tester', () => {
    let tester;
    let stubTreeBuilderClass;
    let stubTreeBuilder;
    let stubTestData;
    let stubResolve;
    let stubBarnesHutResolve;

    beforeEach(() => {
        stubTreeBuilderClass = { create: getStub()}
        stubTreeBuilder = { build: getStub(), buildToArray: getStub() }
        stubTreeBuilderClass.create.returnVal = new Promise(res => {
            res(stubTreeBuilder);
        })
        const stubGravityResolver = { GravityResolver: function() {}, BarnesHutTreeResolver: function() {} }

        stubResolve = stubGravityResolver.GravityResolver.prototype.resolveNewPositions = getStub();
        stubBarnesHutResolve = stubGravityResolver.BarnesHutTreeResolver.prototype.resolveNewPositions = getStub();

        stubTestData = {generateRandomBodies: getStub()}

        tester = new Tester(stubTreeBuilderClass, stubTestData, stubGravityResolver);

        performance.now.sequencedReturnValues = [0,5];
    });

    it('should exist', () => {
        expect(tester).toBeTruthy();
    });

    describe('#testBuildWithData', () => {
        let result;
        beforeEach(async () => {
            result = await tester.testBuildWithData([{mass: 100, xPosition: 50, yPosition: 800}], 1000, 0, 0);
        });

        it('should exist', () => {
            expect(tester.testBuildWithData).toBeTruthy();
        });

        it('should create a new treebuilder', () => {
            expect(stubTreeBuilderClass.create.callCount).toEqual(1);
        });

        it('should call the build method on the treebuilder with the data passed in', () => {
            expect(stubTreeBuilder.build.callCount).toEqual(1);
        
            expect(stubTreeBuilder.build.lastCallArgs).toEqual([[{mass: 100, xPosition: 50, yPosition: 800}], 1000, 0, 0]);
        });

        it('should return the time taken in ms', () => {
            expect(result).toEqual(5);
        });
    });

    describe('#testBuild', () => {
        let result;
        let generateRandomBodiesReturnVal;
        beforeEach(async () => {
            generateRandomBodiesReturnVal = [{mass:1, xPosition: 1, yPosition: 2}, {mass:1, xPosition: 1, yPosition: 2}, {mass:1, xPosition: 1, yPosition: 2}]
            stubTestData.generateRandomBodies.returnVal = generateRandomBodiesReturnVal;
        });

        it('should exist', () => {
            expect(tester.testBuild).toBeTruthy();
        });

        describe('when called with default arguments', () => {
            beforeEach(async () => {
                result = await tester.testBuild(1000);
            });

            it('should create a new treebuilder', () => {
                expect(stubTreeBuilderClass.create.callCount).toEqual(1);
            });

            it('should generate the number of random bodies passed in, using the default parameters', () => {
                expect(stubTestData.generateRandomBodies.callCount).toEqual(1);
                expect(stubTestData.generateRandomBodies.lastCallArgs[0]).toEqual(1000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[1]).toEqual(1000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[2]).toEqual(1000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[3]).toEqual(0);
            });

            it('should call the build method on the treebuilder with the number of bodies passed in, the default size, and the origin at 0,0', () => {
                expect(stubTreeBuilder.build.callCount).toEqual(1);
                expect(stubTreeBuilder.build.lastCallArgs[0]).toEqual(generateRandomBodiesReturnVal);
                expect(stubTreeBuilder.build.lastCallArgs[1]).toEqual(1000);
                expect(stubTreeBuilder.build.lastCallArgs[2]).toEqual(0);
                expect(stubTreeBuilder.build.lastCallArgs[3]).toEqual(0);
            });
    
            it('should return the time taken in ms', () => {
                expect(result).toEqual(5);
            });
        });

        describe('when called with custom arguments', () => {
            beforeEach(async () => {
                result = await tester.testBuild(1000, 10000, 500, 100);
            });

            it('should generate the number of random bodies passed in, using the parameters passed in', () => {
                expect(stubTestData.generateRandomBodies.callCount).toEqual(1);
                expect(stubTestData.generateRandomBodies.lastCallArgs[0]).toEqual(1000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[1]).toEqual(10000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[2]).toEqual(500);
                expect(stubTestData.generateRandomBodies.lastCallArgs[3]).toEqual(100);
            });

            it('should call the build method on the treebuilder with the number of bodies passed in, the size passed in, and the origin at 0,0', () => {
                expect(stubTreeBuilder.build.callCount).toEqual(1);
                expect(stubTreeBuilder.build.lastCallArgs[0]).toEqual(generateRandomBodiesReturnVal);
                expect(stubTreeBuilder.build.lastCallArgs[1]).toEqual(10000);
                expect(stubTreeBuilder.build.lastCallArgs[2]).toEqual(0);
                expect(stubTreeBuilder.build.lastCallArgs[3]).toEqual(0);
            });
        });
    });

    describe('#testResolveWithData', () => {
        it('should exist', () => {
            expect(tester.testResolveWithData).toBeTruthy();
        });

        it('should call the resolve function with the bodies', () => {
            tester.testResolveWithData([{mass: 100, xPosition: 50, yPosition: 800}]);

            expect(stubResolve.callCount).toEqual(1);
            expect(stubResolve.lastCallArgs).toEqual([[{mass: 100, xPosition: 50, yPosition: 800}]]);
        });

        it('should return the time taken in ms', () => {
            expect(tester.testResolveWithData([{mass: 100, xPosition: 50, yPosition: 800}])).toEqual(5);
        });
    });

    describe('#testResolve', () => {
        let result;
        let generateRandomBodiesReturnVal;
        beforeEach(async () => {
            generateRandomBodiesReturnVal = [{mass:1, xPosition: 1, yPosition: 2}, {mass:1, xPosition: 1, yPosition: 2}, {mass:1, xPosition: 1, yPosition: 2}]
            stubTestData.generateRandomBodies.returnVal = generateRandomBodiesReturnVal;
        });

        it('should exist', () => {
            expect(tester.testResolve).toBeTruthy();
        });

        describe('when called with default arguments', () => {
            beforeEach(async () => {
                result = await tester.testResolve(1000);
            });

            it('should generate the number of random bodies passed in, using the default parameters', () => {
                expect(stubTestData.generateRandomBodies.callCount).toEqual(1);
                expect(stubTestData.generateRandomBodies.lastCallArgs[0]).toEqual(1000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[1]).toEqual(1000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[2]).toEqual(1000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[3]).toEqual(0);
            });

            it('should call the resolve method with the number of bodies passed in', () => {
                expect(stubResolve.callCount).toEqual(1);
                expect(stubResolve.lastCallArgs[0]).toEqual(generateRandomBodiesReturnVal);
            });
    
            it('should return the time taken in ms', () => {
                expect(result).toEqual(5);
            });
        });

        describe('when called with custom arguments', () => {
            beforeEach(async () => {
                result = await tester.testResolve(1000, 10000, 500, 100);
            });

            it('should generate the number of random bodies passed in, using the parameters passed in', () => {
                expect(stubTestData.generateRandomBodies.callCount).toEqual(1);
                expect(stubTestData.generateRandomBodies.lastCallArgs[0]).toEqual(1000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[1]).toEqual(10000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[2]).toEqual(500);
                expect(stubTestData.generateRandomBodies.lastCallArgs[3]).toEqual(100);
            });
        });
    })

    describe('#testResolveTree', () => {
        it('should exist', () => {
            expect(tester.testResolveTree).toBeTruthy();
        });

        it('should call the barnes hut resolve function with the body tree', () => {
            tester.testResolveTree([{mass: 100, xPosition: 50, yPosition: 800}], [{mass: 101, xPosition: 50, yPosition: 800}]);

            expect(stubBarnesHutResolve.callCount).toEqual(1);
            expect(stubBarnesHutResolve.lastCallArgs).toEqual([[{mass: 100, xPosition: 50, yPosition: 800}], [{mass: 101, xPosition: 50, yPosition: 800}]]);
        });

        it('should return the time taken in ms', () => {
            expect(tester.testResolveTree([{mass: 100, xPosition: 50, yPosition: 800}])).toEqual(5);
        });
    });

    describe('#testBuildAndResolveTree', () => {
        it('should exist', () => {
            expect(tester.testBuildAndResolveTree).toBeTruthy();
        });

        describe('when called with default arguments', () => {
            let result
            let generateRandomBodiesReturnVal;
            let stubBuildReturn;

            beforeEach(async () => {
                generateRandomBodiesReturnVal = [{mass:1, xPosition: 1, yPosition: 2}, {mass:1, xPosition: 1, yPosition: 2}, {mass:1, xPosition: 1, yPosition: 2}]
                stubTestData.generateRandomBodies.returnVal = generateRandomBodiesReturnVal;
                stubBuildReturn =[[0,1,2,3],[0,1,2,3]]
                stubTreeBuilder.buildToArray.returnVal = stubBuildReturn;
                performance.now.sequencedReturnValues = [0,5, 10, 20];
                result = await tester.testBuildAndResolveTree(1000);
            });

            it('should create a new treebuilder', () => {
                expect(stubTreeBuilderClass.create.callCount).toEqual(1);
            });

            it('should generate the number of random bodies passed in, using the default parameters', () => {
                expect(stubTestData.generateRandomBodies.callCount).toEqual(1);
                expect(stubTestData.generateRandomBodies.lastCallArgs[0]).toEqual(1000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[1]).toEqual(1000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[2]).toEqual(1000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[3]).toEqual(0);
            });

            it('should call the buildToArray method on the treebuilder with the number of bodies passed in, the default size, and the origin at 0,0', () => {
                expect(stubTreeBuilder.buildToArray.callCount).toEqual(1);
                expect(stubTreeBuilder.buildToArray.lastCallArgs[0]).toEqual(generateRandomBodiesReturnVal);
                expect(stubTreeBuilder.buildToArray.lastCallArgs[1]).toEqual(1000);
                expect(stubTreeBuilder.buildToArray.lastCallArgs[2]).toEqual(0);
                expect(stubTreeBuilder.buildToArray.lastCallArgs[3]).toEqual(0);
            });


            it('should call the barnes hut resolve function with the body tree', () => {
                expect(stubBarnesHutResolve.callCount).toEqual(1);
                expect(stubBarnesHutResolve.lastCallArgs).toEqual([generateRandomBodiesReturnVal, stubBuildReturn]);
            });
    
            it('should return the time taken in ms', () => {
                expect(result).toEqual([5, 10]);
            });
        });

        describe('when called with custom arguments', () => {
            let result
            let generateRandomBodiesReturnVal;
            let stubBuildReturn;

            beforeEach(async () => {
                generateRandomBodiesReturnVal = [{mass:1, xPosition: 1, yPosition: 2}, {mass:1, xPosition: 1, yPosition: 2}, {mass:1, xPosition: 1, yPosition: 2}]
                stubTestData.generateRandomBodies.returnVal = generateRandomBodiesReturnVal;
                stubBuildReturn =[[0,1,2,3],[0,1,2,3]]
                stubTreeBuilder.buildToArray.returnVal = stubBuildReturn;
                performance.now.sequencedReturnValues = [0,5, 10, 20];
                result = await tester.testBuildAndResolveTree(1000, 10000, 2000, 5);
            });

            it('should generate the number of random bodies passed in, using the parameters passed in', () => {
                expect(stubTestData.generateRandomBodies.callCount).toEqual(1);
                expect(stubTestData.generateRandomBodies.lastCallArgs[0]).toEqual(1000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[1]).toEqual(10000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[2]).toEqual(2000);
                expect(stubTestData.generateRandomBodies.lastCallArgs[3]).toEqual(5);
            });

            it('should call the build method on the treebuilder with the number of bodies passed in, the size passed in, and the origin at 0,0', () => {
                expect(stubTreeBuilder.buildToArray.callCount).toEqual(1);
                expect(stubTreeBuilder.buildToArray.lastCallArgs[0]).toEqual(generateRandomBodiesReturnVal);
                expect(stubTreeBuilder.buildToArray.lastCallArgs[1]).toEqual(10000);
                expect(stubTreeBuilder.buildToArray.lastCallArgs[2]).toEqual(0);
                expect(stubTreeBuilder.buildToArray.lastCallArgs[3]).toEqual(0);
            });
        });
    });
});

describe('Tester integration', () => {
    it('should create sucessfully with default params', () => {
        expect(new Tester()).toBeTruthy();
    });

    it('should successfully test', async () => {
        performance = require('perf_hooks').performance;

        const val = await new Tester().testBuild(1000);

        expect(val).toBeTruthy();
    });

    it('should successfully test with build from tree', async () => {
        performance = require('perf_hooks').performance;

        const val = await new Tester().testBuildAndResolveTree(1000);

        expect(val).toBeTruthy();
    });
});
