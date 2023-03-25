function filter(array, test) {
    let filtered = [];
    for (let item of array)
        if (test(item))
            filtered.push(item);
    return filtered;
}


console.log(filter([1, 2, 3, 4, 10, 11, 14], (n) => n >= 10));