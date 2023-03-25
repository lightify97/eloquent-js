const every = (array, test) => {
    for (let item of array) {
        if (!test(item))
            return false;
    }
    return true;
};

const everySome = (array, test) => {
    return !array.some(element => !test(element));
};

console.log(everySome([1, 2, 4, 5], (n) => n >= 1));