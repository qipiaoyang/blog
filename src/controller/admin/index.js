const Base = require('./base.js');


module.exports = class extends Base {
  async indexAction() {
    console.log(123);
    return this.display();
  }


};
