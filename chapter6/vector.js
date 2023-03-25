// Your code here.
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(vec) {
        if (vec instanceof Vector)
            return new Vector(this.x + vec.x, this.y + vec.y);
        return `${vec} must be of type Vector`;
    }

    minus(vec) {
        if (vec instanceof Vector)
            return new Vector(this.x - vec.x, this.y - vec.y);
        return `${vec} must be of type Vector`;
    }

    get length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

}
console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5