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
        const rawHeadline = headline.result[0];
        switch (headline.type) {
          case 'h1':
            target = '<h1>'+ rawHeadline.substring(2, rawHeadline.length) + '</h1>';
            break;
          case 'h2':
            target = '<h2>'+ rawHeadline.substring(3, rawHeadline.length) + '</h2>';
            break;
          case 'h3':
            target = '<h3>'+ rawHeadline.substring(4, rawHeadline.length) + '</h3>';
            break;
          case 'h4':
            target = '<h5>'+ rawHeadline.substring(5, rawHeadline.length) + '</h5>';
            break;
          case 'h5':
            target = '<h6>'+ rawHeadline.substring(6, rawHeadline.length) + '</h6>';
            break;
          case 'h6':
            target = '<h7>'+ rawHeadline.substring(7, rawHeadline.length) + '</h7>';
            break;
        }
        filter.setString(target);
      }
      
      const quote = filter.quote();
      if (quote !== null) {
        const rawQuote = quote.result[0];
        const completeQuote = '<q>'+ rawQuote.substring(2, rawQuote.length) + '</q>';
        target = target.replace(rawQuote, completeQuote);
      }
      //...
      result += target;
    });
    
    return result;
  }
  
}

module.exports = Converter;