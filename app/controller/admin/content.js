function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {

    //  博客分类内容列表
    listAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            let category_id = _this.get('category_id') || "";
            let category = yield _this.model('think_category_content').where({ category_id: category_id }).select();
            const think_category = _this.model('think_category');
            let category_name = yield think_category.where({ id: category_id }).find();
            _this.assign({
                category: category,
                category_name: category_name.name,
                category_id: category_id
            });
            //删除功能
            if (_this.isPost) {
                const content_del = yield _this.post();
                const del_name = content_del.name;
                let category_content = _this.model('think_category_content');
                let res = yield category_content.where({ list: del_name }).delete();
                if (res) {
                    return _this.json({
                        name: del_name,
                        data: '删除成功'
                    });
                } else {
                    return _this.json({
                        name: del_name,
                        data: '删除失败'
                    });
                }
            }

            return _this.display();
        })();
    }

    //添加功能
    addAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const category_id = yield _this2.get('category_id');
            _this2.assign({
                category_id: category_id
            });
            if (_this2.isPost) {
                const test = yield _this2.post();
                test.category_id = category_id;
                let category_content = _this2.model('think_category_content');
                const total = yield _this2.model('think_category').where({ id: category_id }).find();
                let res = yield category_content.where({ category_id: category_id }).add(test);
                let total_res = yield _this2.model('think_category').where({ id: category_id }).update({ total: total.total + 1 });
                if (res) {
                    return _this2.redirect('/admin/content/list?category_id=' + category_id);
                } else {
                    _this2.fail('更新失败');
                }
            } else {
                return _this2.display();
            }
        })();
    }

    //  修改功能
    editAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            const content_edit = _this3.get('edit') || "";
            if (think.isEmpty(content_edit)) {
                return _this3.fail('参数不能为空');
            } else {
                _this3.assign({
                    content_edit: content_edit
                });

                return _this3.display();
            }
        })();
    }

    //   更新模块
    updateAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            const edit = _this4.get('edit');
            const post = _this4.post();
            const post_test = post.test;
            const category = _this4.model('think_category_content');
            const res = yield category.where({ list: edit }).update({
                list: post_test
            });
            if (res) {
                return _this4.redirect('/admin/content/list');
            } else {
                _this4.fail('更新失败');
            }
        })();
    }
};
//# sourceMappingURL=content.js.map