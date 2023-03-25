const SCRIPTS = require("./scripts");

const characterCount = (script) => {
    return script.ranges.reduce((count, [from, to]) => count + (to - from), 0);
};

let totalChars = SCRIPTS.reduce((chars, script) => chars + characterCount(script), 0);


console.log(totalChars);