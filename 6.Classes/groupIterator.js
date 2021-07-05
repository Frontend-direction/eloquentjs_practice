class Group {
  constructor() {
    this.group = [];
  }

  add(item) {
    if (item in this.group) return;
    this.group.push(item);
  }

  delete(item) {
    this.group = this.group.filter(group => group !== item);
  }

  has(item) {
    return this.group.indexOf(item) > -1;
  }

  static from(items) {
    const newGroup = new Group();
    
    for(let item of items) {
      if (item in items) {
        continue;
      }

      newGroup.add(item);
    }

    return newGroup;
  }

  [Symbol.iterator]() {
    this.currPos = 0;
    return this;
  };

  next() {
    if (this.group.length <= this.currPos) return {done: true};

    const value = {
      value: this.group[this.currPos],
      done: false
    }
    this.currPos++;
    return value;
  }
}


for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c