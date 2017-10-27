function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    console.log(123);
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
        } else {
          return _this.fail(403, '账号密码错误，请重新填写');
        }
      }
      return _this.json({
        name: '后台首页',
        url: '/admin/index/index',
        errno: 0
      });
    })();
  }
  geetestAction() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const geetest = _this2.model('geetest'); // 加载 commoon 模块下的 geetset service
      if (_this2.isPost) {
        const post = _this2.post();
        console.log(post);
        const res = yield geetest.validate(_this2.ctx, post);
        return _this2.json(res);
      } else {
        const res = yield geetest.register(_this2.ctx);
        // console.log(res);
        return _this2.json(res);
      }
    })();
  }

  logoutAction() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      yield _this3.session(null);
      return _this3.redirect('/admin/login'); //登录成功将用户信息写入session，返回到user首页
    })();
  }
};
//# sourceMappingURL=login.js.map