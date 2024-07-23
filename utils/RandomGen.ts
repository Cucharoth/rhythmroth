const getRandomNumbers = (
    count: number,
    min: number,
    max: number
): number[] => {
    const randomNumbers: Set<number> = new Set();
    while (randomNumbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomNumbers.add(randomNumber);
    }
    return Array.from(randomNumbers);
};

export default getRandomNumbers;
