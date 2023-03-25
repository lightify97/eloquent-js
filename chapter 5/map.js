function map(array, action) {
    let mapped = [];
    for (let item of array)
        mapped.push(action(item));
    return mapped;
}

console.log(map([1, 2, 3, 4], (n) => n ** 2));

