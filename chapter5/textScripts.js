const characterScript = require("./characterScript");
const countBy = require("./countBy");

const textScripts = (text) => {
    let scripts = countBy(text, (char) => {
        return characterScript(char.codePointAt(0)) || "none";
    }).filter(({ name }) => name != 'none');

    let total = scripts.reduce((n, { count }) => n + count, 0);
    if (!total)
        return "No Scripts Found";

    return scripts.map(({ name, count }) => {
        return `${Math.round(count / total * 100)}% ${name}`;
    }).join(", ");
};

console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв'));