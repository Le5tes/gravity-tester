function generateRandomBodies(numberOfBodies, size, minMass, maxMass) {
    return Array(numberOfBodies).fill('').map(() => generateBody(size, minMass, maxMass))
}

const generateBody = (size, minMass, maxMass) => {
    return {
        mass: Math.random() * (maxMass - minMass) + minMass,
        posX: Math.random() * size,
        posY: Math.random() * size
    };
}

exports.generateRandomBodies = generateRandomBodies;