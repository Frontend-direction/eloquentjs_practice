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
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false