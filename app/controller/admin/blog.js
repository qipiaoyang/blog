function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            return _this.display();
        })();
    }

    listAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {

            const category = yield _this2.model('think_category').select();
            _this2.assign({
                category: category
            });
            //删除功能
            if (_this2.isPost) {
                const category_del = yield _this2.post();
                const del_name = category_del.name;
                let category = _this2.model('think_category');
                let res = yield category.where({ name: del_name }).delete();
                if (res) {
                    return _this2.json({
                        name: del_name,
                        data: '删除成功'
                    });
                } else {
                    return _this2.json({
                        name: del_name,
                        data: '删除失败'
                    });
                }
            }

            return _this2.display();
        })();
    }

    //添加功能
    addAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {

            if (_this3.isPost) {
                const test = yield _this3.post();
                const category_add = test.name;
                let category = _this3.model('think_category');
                let res = yield category.add({ name: category_add });
                if (res) {
                    return _this3.redirect('/admin/blog/list');
                } else {
                    _this3.fail('更新失败');
                }
            } else {
                return _this3.display();
            }
        })();
    }

    //  修改功能
    editAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            console.log(123);
            const category_edit = _this4.post();
            const edit_value = category_edit.name;
            console.log(edit_value);
            if (_this4.isPost) {
                console.log(456);
            }
            return _this4.display();
        })();
    }
};
//# sourceMappingURL=blog.js.map