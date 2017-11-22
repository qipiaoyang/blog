const Base = require('./base.js');

module.exports = class extends Base {

   //  博客分类内容列表
    async listAction () {
        let category_id = this.get('category_id') || "";
        let category = await this.model('think_category_content').where({category_id:category_id}).select();
        const think_category =this.model('think_category');
        let category_name = await think_category.where({id:category_id}).find();
        this.assign({
            category:category,
            category_name:category_name.name,
            category_id:category_id
        });
        //删除功能
        if(this.isPost) {
            const content_del = await this.post();
            const del_name = content_del.name;
            let category_content = this.model('think_category_content');
            let res = await category_content.where({list:del_name}).delete();
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
        const category_id = await this.get('category_id');
        this.assign({
            category_id:category_id
        })
        if(this.isPost) {
            const test = await this.post();
            test.category_id = category_id;
            let category_content = this.model('think_category_content');
            const total = await this.model('think_category').where({id:category_id}).find();
            let res = await category_content.where({category_id:category_id}).add(test);
            let total_res = await this.model('think_category')
                                      .where({id:category_id})
                                      .update({total:total.total+1});
            if(res) {
                return this.redirect('/admin/content/list?category_id='+category_id);
            } else {
                this.fail('更新失败');
            }
        } else {
            return this.display();
        }
    }

    //  修改功能
    async editAction () {
        const content_edit = this.get('edit') || "";
        if(think.isEmpty(content_edit)) {
            return this.fail('参数不能为空');
        } else {
            this.assign({
                content_edit: content_edit
            });

            return this.display();
        }
    }

    //   更新模块
    async updateAction() {
        const edit = this.get('edit');
        const post = this.post();
        const post_test = post.test;
        const category =this.model('think_category_content');
        const res =await category.where({list:edit}).update({
            list:post_test
        });
        if(res) {
            return this.redirect('/admin/content/list');
        } else {
            this.fail('更新失败');
        }
    }
};
