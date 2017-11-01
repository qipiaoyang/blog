
module.exports = class extends think.Controller {
  async indexAction() {
    this.assign({
        name:'test'
    })
    const name = this.name;
    return this.display();
  }
};
