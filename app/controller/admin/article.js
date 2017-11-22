function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            const content = yield _this.model('think_article').where({ articleId: 22 }).find();

            _this.assign({
                name: 'bgg',
                setting: 0.8,
                value: content.content
            });

            if (_this.isPost) {
                const article = yield _this.post();
                const article_model = _this.model('think_article');
                const res = yield article_model.where({ articleId: 22 }).update({ content: article.bgg });
            }

            return _this.display();
        })();
    }

    listAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {

            return _this2.display();
        })();
    }

    //添加功能
    addAction() {
        return _asyncToGenerator(function* () {})();
    }

    //  修改功能
    editAction() {
        return _asyncToGenerator(function* () {})();
    }

    //   更新模块
    updateAction() {
        return _asyncToGenerator(function* () {})();
    }

};
//# sourceMappingURL=article.js.map