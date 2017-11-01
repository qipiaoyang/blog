const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    return this.display();
  }

  async listAction() {

      const category =await this.model('think_category').select();
      this.assign({
          category:category
      })
      return this.display();
  }

  //添加功能
  async addAction() {

      if(this.isPost) {
          const test = await this.post();
          const category_add = test.name;
          let category = this.model('think_category');
          let res = await category.add({name: category_add});
          if(res) {
              return this.redirect('/admin/blog/list');
          } else {
              this.fail('更新失败');
          }
      } else {
          return this.display();
      }
  }

  //删除功能
   async delAction () {

      return this.display();
   }
};
