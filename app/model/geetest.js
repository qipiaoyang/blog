function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Geetest = require('gt3-sdk');
module.exports = class extends think.Service {
  constructor(ctx) {
    super(ctx);
  }
  // 初始化
  register(ctx, type) {
    return _asyncToGenerator(function* () {
      const id = '994baba0633eb98db0eb52c392d01f3e'; // key
      const key = 'd802737a6d49f4f87fb331f69b57079e'; // id
      const geetest = new Geetest({
        geetest_id: id,
        geetest_key: key
      });
      // 初始
      const register = function () {
        const deferred = think.defer();
        geetest.register(null, function (err, data) {
          if (err) {
            deferred.reject(err);
          }
          console.log(data);
          if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            // req.session.fallback = true;
            // res.send(data);
            ctx.session('fallback', 1);
            deferred.resolve(data);
            // 2. 使用自己提供的备用方案
            // todo
          } else {
            // 正常模式
            ctx.session('fallback', 0);
            deferred.resolve(data);
          }
        });
        return deferred.promise;
      };

      return yield register();
    })();
  }
  // 二次服务器验证
  validate(ctx, data) {
    return _asyncToGenerator(function* () {
      const id = '994baba0633eb98db0eb52c392d01f3e'; // key
      const key = 'd802737a6d49f4f87fb331f69b57079e'; // id

      const geetest = new Geetest({
        geetest_key: key,
        geetest_id: id
      });
      let fallback = yield ctx.session('fallback');
      fallback = !!fallback;
      console.log(fallback);
      // 验证
      const validate = function () {
        const deferred = think.defer();
        // geetest.validate({
        //
        //   challenge: data.geetest_challenge,
        //   validate: data.geetest_validate,
        //   seccode: data.geetest_seccode
        //
        // }, function (err, result) {
        //   console.log(result);
        //   var data = {status: "success"};
        //
        //   if (err || !result) {
        //     console.log(err);
        //     data.status = "fail";
        //   }
        //
        //   deferred.resolve(data);
        // });
        // 对ajax提供的验证凭证进行二次验证
        geetest.validate(fallback, {
          geetest_challenge: data.geetest_challenge,
          geetest_validate: data.geetest_validate,
          geetest_seccode: data.geetest_seccode
        }, function (err, success) {
          console.log(err);
          let res = {};
          if (err) {
            // 网络错误
            res = {
              status: 'error',
              info: err
            };
          } else if (!success) {
            // 二次验证失败
            res = {
              status: 'fail',
              info: '登录失败'
            };
          } else {
            res = {
              status: 'success',
              info: '登录成功'
            };
          }
          deferred.resolve(res);
        });
        return deferred.promise;
      };
      return yield validate(data);
    })();
  }
};
//# sourceMappingURL=geetest.js.map