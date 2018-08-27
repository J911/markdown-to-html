const converter = require('./index');

const str = "# hello\n## world\n### this is sub title";
const markdownToHtml = new converter(str);
const result = markdownToHtml.convert();

console.log(result);
