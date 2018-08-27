const markdownFilter = require('./markdown-filter');

class Converter {
  
  constructor (_str) {
    this.raw_string = _str;
    this.array_string = this.lineSplitter();
  }
  
  lineSplitter() {
    const array = this.raw_string.toString().split('\n');
    return array;
  }
  
  detectMarkdownToLine(line) {
    if (typeof line === 'undefined') {
      throw Error('require parameter \'line\'');
    }
    let result = [];
    const filter = new markdownFilter(this.array_string[line]);
    const headline = filter.headline();
    if (headline !== null) result.push(headline);
    
    return result !== null ? result : null;
  }
  
  convert() {
    let result = '';
    this.array_string.forEach(target => {
      const filter = new markdownFilter(target);
      const headline = filter.headline();
      if (headline !== null) {
        switch (headline.type) {
          case 'h1':
            target = '<h1>'+ headline.result.input.substring(2, headline.result.input.length) + '</h1>';
            break;
          case 'h2':
            target = '<h2>'+ headline.result.input.substring(3, headline.result.input.length) + '</h2>';
            break;
          case 'h3':
            target = '<h3>'+ headline.result.input.substring(4, headline.result.input.length) + '</h3>';
            break;
          case 'h4':
            target = '<h5>'+ headline.result.input.substring(5, headline.result.input.length) + '</h5>';
            break;
          case 'h5':
            target = '<h6>'+ headline.result.input.substring(6, headline.result.input.length) + '</h6>';
            break;
          case 'h6':
            target = '<h7>'+ headline.result.input.substring(7, headline.result.input.length) + '</h7>';
            break;
        }
        result += target;
        filter.setString(target);
      }
      
      //...
      
    });
    
    return result;
  }
  
}

module.exports = Converter;