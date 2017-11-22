const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const content = await this.model('think_article').where({articleId:22}).find();

    this.assign({
        name:'bgg',
        setting:0.8,
        value:content.content
    })

    if(this.isPost) {
        const article = await this.post();
        const article_model = this.model('think_article');
        const res = await article_model.where({articleId: 22}).update({content:article.bgg});
    }

    return this.display();
  }

  async listAction() {

      return this.display();
  }

  //添加功能
  async addAction() {

  }

  //  修改功能
   async editAction () {

   }


   //   更新模块
   async updateAction() {

   }



};
