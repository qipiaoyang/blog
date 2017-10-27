const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    console.log(123);
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
      } else {
        return this.fail(403,'账号密码错误，请重新填写');
      }
    }
    return this.json({
      name:'后台首页',
      url:'/admin/index/index',
      errno:0
    });
  }
  async geetestAction() {
    const geetest = this.model('geetest'); // 加载 commoon 模块下的 geetset service
    if (this.isPost) {
      const post = this.post();
      console.log(post);
      const res = await geetest.validate(this.ctx, post);
      return this.json(res);
    } else {
      const res = await geetest.register(this.ctx);
      // console.log(res);
      return this.json(res);
    }
  }

  async logoutAction() {
    await this.session(null); 
    return this.redirect('/admin/login');//登录成功将用户信息写入session，返回到user首页
  }
};
