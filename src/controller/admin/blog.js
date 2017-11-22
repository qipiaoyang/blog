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
          let content = this.model('think_category_content');
          const category_id = await category.where({name:del_name}).find();
          let category_res = await category.where({name:del_name}).delete();
          let content_res = await content.where({category_id:category_id.id}).delete();
          if(category_res && content_res) {
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
          let category = this.model('think_category');
          let category_content = this.model('think_category_content');
          let res = await category.add(test);

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
       const category_edit = this.get('edit') || "";
       if(think.isEmpty(category_edit)) {
           return this.fail('参数不能为空');
       } else {
           this.assign({
               category_edit: category_edit
           });

           return this.display();
       }
   }


   //   更新模块
   async updateAction() {
       const edit = this.get('edit');
       const post = this.post();
       const post_test = post.test;
       const category =this.model('think_category');
       const res =await category.where({name:edit}).update({
           name:post_test
       });
       if(res) {
           return this.redirect('/admin/blog/list');
       } else {
           this.fail('更新失败');
       }
   }



};
