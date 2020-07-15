function generateRandomBodies(numberOfBodies, size, minMass, maxMass) {
    return Array(numberOfBodies).fill('').map(() => generateBody(size, minMass, maxMass))
}

const generateBody = (size, minMass, maxMass) => {
    return {
        mass: Math.random() * (maxMass - minMass) + minMass,
        positionX: Math.random() * size,
        positionY: Math.random() * size,
        velocityX: 0,
        velocityY: 0
    };
}

exports.generateRandomBodies = generateRandomBodies;