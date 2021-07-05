class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    const xAxis = this.x + vector.x;
    const yAxis = this.y + vector.y;

    return new Vec(xAxis, yAxis);
  }

  minus(vector) {
    const xAxis = this.x - vector.x;
    const yAxis = this.y - vector.y;

    return new Vec(xAxis, yAxis);
  }

  get length() {
    return Math.sqrt(this.y**2 + this.x**2);
  }
}


console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5