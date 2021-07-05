const protoRabbit = {
  speak(line) {
    console.log(`Hello, ${this.name}, let everything will be ${line}`)
  }
}

const killerObject = Object.create(protoRabbit);

killerObject.name = "Leon";

killerObject.speak('Marseliase')