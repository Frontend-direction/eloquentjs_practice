function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

// console.log(characterScript(121));
// → {name: "Latin", …}

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

// console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]

function dominantDirection(text) {
  let directions = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  }).filter(({name}) => name !== "none");

  let maxCount = 0;
  let dominant = 'ltr';

  directions.map(({name, count}) => {
    if(count > maxCount) {
      dominant = name;
    }
  });

  return dominant;
}

// Second option
// function dominantDirection(text) {
//   let scripts = countBy(text, char => {
//     let script = characterScript(char.codePointAt(0));
//     return script ? script.direction : "none";
//   }).filter(({name}) => name != "none");
//   switch (scripts.length) {
//     case 0:
//       return 'no dominant direction found';
//     case 1:
//       return scripts[0].name;
//     default:
//       if (scripts.reduce((acc, cur) => acc.count === cur.count)) {
//         return 'no dominant direction found';
//       } else {
//         return scripts.reduce((acc, cur) => acc.count >= cur.count ? acc.name : cur.name);
//       }
//   }
// }

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl


