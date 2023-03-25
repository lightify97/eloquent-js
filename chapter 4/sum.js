// Your code here.
const range = (start, end, step = 1) => {
    let result = [];
    for (let i = start; i != end + step; i += step)
        result.push(i);
    return result;
};

const sum = (list) => {
    let total = 0;
    for (let num of list)
        total += num;
    return total;
};

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55