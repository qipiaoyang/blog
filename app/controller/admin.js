function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  loginAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this.isPost) {
        //获取登陆的账号密码
        let username = _this.post('username');
        let password = _this.post('password');
        let userform = _this.model('think_user');
        let data = yield userform.where({ user: username, password: password }).find();
        if (!think.isEmpty(data)) {
          _this.session('userinfo', data);
          return _this.redirect('/index/index');
        } else {
          return _this.fail(403, '账号密码错误，请重新填写');
        }
      }
      return _this.display();
    })();
  }
};
//# sourceMappingURL=admin.js.map