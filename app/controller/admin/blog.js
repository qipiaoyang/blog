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

    //删除功能
    delAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {

            return _this4.display();
        })();
    }
};
//# sourceMappingURL=blog.js.map