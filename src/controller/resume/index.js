
module.exports = class extends think.Controller {
    async indexAction() {
      return this.display();
    }
  };
  