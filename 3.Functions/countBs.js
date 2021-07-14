countChar = (str, char) => {
  return str.split('').filter(el => el === char).length;
}


console.log(countChar("kakkerlak", "k"));