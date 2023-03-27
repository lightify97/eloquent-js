class PGroup {
    constructor() {
        this.store = [];
    }

    add(val) {
        if (!this.store.includes(val)) {
            let n = PGroup.empty();
            n.store = [...this.store, val];
            return n;
        }
        return this;
    }

    delete(val) {
        if (this.store.includes(val)) {
            let n = PGroup.empty();
            n.store = [...this.store];
            n.store.splice(this.store.indexOf(val), 1);
            return n;
        }
        return this;
    }

    has(val) {
        return this.store.includes(val) ? true : false;
    }

    static empty() {
        return new PGroup();
    }
}

let n = PGroup.empty().add(11);
let m = n.add(33);
let o = m.add(44);
console.log(n);
console.log(m);
console.log(o.delete(11));