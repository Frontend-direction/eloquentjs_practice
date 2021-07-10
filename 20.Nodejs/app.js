const { readFileSync, statSync, readdirSync } = require('fs');

const [n, p, pattern, ...files] = process.argv;
const regex = new RegExp(pattern);

for(let i = 0; i < files.length; i++) {
  search(files[i])
}


function search (file) {
  const path = statSync(file);

  if(path.isDirectory()) {
    const dir = file;
    for(filename of readdirSync(dir)) {
      search(`${dir}/${filename}`);
    }
  } else if(regex.test(readFileSync(file))){
      console.log(file);
  }
}

