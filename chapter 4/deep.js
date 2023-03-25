// Your code here.
const deepEqual = (a, b) => {

    // My Solution
    if (a === b) return true;
    if (a == null || typeof a != "object" ||
        b == null || typeof b != "object")
        return false;
    let props1 = Object.keys(a);
    let props2 = Object.keys(b);
    if (props1.length !== props2.length)
        return false;
    for (let prop of props1) {
        if (!prop in props2)
            return false;
        return deepEqual(a[prop], b[prop]);
    }
    return true;

    // Original Solution
    if (a === b) return true;
    if (a == null || typeof a != "object" ||
        b == null || typeof b != "object")
        return false;
    let keysA = Object.keys(a), keysB = Object.keys(b);
    if (keysA.length != keysB.length)
        return false;
    for (let key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key]))
            return false;
    }
    return true;


};

let obj = { here: { is: "an" }, object: 2 };

console.log(deepEqual({}, {}));
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// → true