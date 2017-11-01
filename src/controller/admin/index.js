const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {

    this.assign({
        nan: false,
        nv: false
    })


    return this.display();
  }


};
