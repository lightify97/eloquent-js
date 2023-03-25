class Group {
    constructor() {
        this.store = [];
    }

    add(val) {
        if (!this.store.includes(val))
            this.store.push(val);
    }

    delete(val) {
        let exists = this.store.indexOf(val);
        if (exists > -1)
            this.store.splice(exists, 1);
    }

    has(val) {
        if (this.store.includes(val))
            return true;
        return false;
    }

    static from(vals) {
        let n = new Group();
        for (let val of vals)
            n.add(val);
        return n;
    }

    [Symbol.iterator]() {
        let index = 0;
        return {
            next: function () {
                if (index < this.store.length)
                    return { value: this.store[index++], done: false };
                return { done: true };
            }.bind(this)
        };
    }
}

let g1 = new Group();
g1.add(1);
g1.add(2);
g1.add(3);
g1.add(4);
g1.delete(4);
g1.delete(1);
console.log(g1);
let g2 = Group.from([1, 2, 4]);
console.log(g2);

for (let value of Group.from(["a", "b", "c"]))
    console.log(value);

// Solution of the borrowing a method

let map = { one: true, two: true, hasOwnProperty: true };


// Fix this call
console.log(Object.prototype.hasOwnProperty.call(map, "one"));
let mapHasOwnProperty = (property) => Object.prototype.hasOwnProperty.bind(map, [property]);

console.log(mapHasOwnProperty("on")());