// Your code here.
const listToArray = (list) => {
    let array = [], ref = list;
    while (ref.value) {
        array.push(ref.value);
        if (!ref.rest) break;
        ref = ref.rest;
    }
    return array;
};

const arrayToList = (array) => {
    let list = null;
    for (let i = array.length - 1; i >= 0; i--)
        list = { value: array[i], rest: list };
    return list;
};

const prepend = (elem, list) => {
    return { value: elem, rest: list };
};

const nth = (list, idx) => {
    let i = 0;
    while (list?.value) {
        if (i == idx)
            return list.value;
        i++;
        list = list.rest;
    }
    return;
};

const nthRec = (list, idx) => {
    if (idx == 0)
        return list?.value;
    else
        return nthRec(list.rest, idx - 1);
};


console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
console.log(nthRec(arrayToList([10, 20, 30]), 2));
// → 20