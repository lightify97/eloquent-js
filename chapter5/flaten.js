const flaten = (array) => {
    return array.reduce((prev, current) => prev.concat(current), []);
};

console.log(flaten([[1, 2, 3], [4, 5], [6], 7, 9]));