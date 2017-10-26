module.exports = class extends think.Controller {
  async __before() {
    if(this.ctx.Controller === 'admin' && this.ctx.Controller === 'index' ||this.ctx.Controller === 'login' ){ //如果是admin_index那么久不验证了，直接返回给予登录。 
        return;   
    } 
    console.log(this.ctx);
    let userinfo = await this.session('userinfo');
    if (!think.isEmpty(userinfo)){  
      this.assign('userinfo',userinfo);  
    }else{  
      return this.redirect('/admin/index');  
    }  
  }
};
