// Your code here.
const reverseArray = (array) => {
    let reversed = [];
    while (array.length)
        reversed.push(array.pop());
    return reversed;
};

const reverseArrayInPlace = (array) => {
    let length = array.length;
    let mid = Math.floor(length / 2);
    for (let i = 0; i <= mid; i++) {
        let temp = array[i];
        array[i] = array[length - i - 1];
        array[length - i] = temp;
    }
};
console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
  // → [5, 4, 3, 2, 1]