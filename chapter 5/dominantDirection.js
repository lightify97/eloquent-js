const characterScript = require("./characterScript");
const countBy = require("./countBy");
const SCRIPTS = require("./scripts");


const dominantDirection = (text) => {
    let scripts = countBy(text, (char) => characterScript(char.codePointAt(0)) || "none").filter(({ type: name }) => name != "none");
    return scripts.reduce((prev, current) => prev.count > current.count ? prev : current).type.direction;
};

console.log(dominantDirection('英国的狗说"woof", 俄罗斯的狗说"тяв"Hey, مساء الخير'));
console.log(dominantDirection("Hello!"));