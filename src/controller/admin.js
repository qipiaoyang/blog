const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  async loginAction() {
    if(this.isPost){
      //获取登陆的账号密码
      let username = this.post('username');
      let password = this.post('password');
      let userform = this.model('think_user');
      let data = await userform.where({user:username,password:password}).find();
      if(!think.isEmpty(data)){
        this.session('userinfo',data);
        return this.redirect('/index/index');
      } else {
        return this.fail(403,'账号密码错误，请重新填写');
      }
    }
    return this.display();
  }
};
