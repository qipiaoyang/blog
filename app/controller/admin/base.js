function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class extends think.Controller {
    __before() {
        var _this = this;

        return _asyncToGenerator(function* () {
            let userinfo = yield _this.session('userinfo');
            if (!think.isEmpty(userinfo)) {
                _this.assign('userinfo', userinfo);
            } else {

                return _this.redirect('/admin/index');
            }
        })();
    }
};
//# sourceMappingURL=base.js.map