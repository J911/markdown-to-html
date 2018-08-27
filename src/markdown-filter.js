const regrex = require('./regrex');

class MarkdownFilter {
  constructor (_str) {
    this.raw_string = _str
  }
  
  setString(_str) {
    this.raw_string = _str
  }
  
  headline() {
    const h1 = this.raw_string.match(regrex.h1);
    const h2 = this.raw_string.match(regrex.h2);
    const h3 = this.raw_string.match(regrex.h3);
    const h4 = this.raw_string.match(regrex.h4);
    const h5 = this.raw_string.match(regrex.h5);
    const h6 = this.raw_string.match(regrex.h6);
    
    if (h1 !== null) return {'type': 'h1', result: h1};
    if (h2 !== null) return {'type': 'h2', result: h2};
    if (h3 !== null) return {'type': 'h3', result: h3};
    if (h4 !== null) return {'type': 'h4', result: h4};
    if (h5 !== null) return {'type': 'h5', result: h5};
    if (h6 !== null) return {'type': 'h6', result: h6};
    
    return null;
  }
}

module.exports = MarkdownFilter;