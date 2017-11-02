const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    return this.display();
  }

  async listAction() {

      const category =await this.model('think_category').select();
      this.assign({
          category:category
      });
      //删除功能
      if(this.isPost) {
          const category_del = await this.post();
          const del_name = category_del.name;
          let category = this.model('think_category');
          let res = await category.where({name:del_name}).delete();
          if(res) {
              return this.json({
                  name:del_name,
                  data:'删除成功'
              });
          } else {
              return this.json({
                  name:del_name,
                  data:'删除失败'
              })
          }
      }


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

  //  修改功能
   async editAction () {
      console.log(123);
       const category_edit = this.post();
       const edit_value = category_edit.name;
       console.log(edit_value);
      if(this.isPost) {
          console.log(456);

      }
      return this.display();
   }
};
