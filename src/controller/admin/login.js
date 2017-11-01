module.exports = class extends think.Controller {
    indexAction() {
        return this.display();
    }
    async loginAction() {
        this.is_login = await this.islogin();
        if(this.isAjax()){
            //获取登陆的账号密码
            let username = this.post('username');
            let password = this.post('password');
            let userform = this.model('think_user');
            let data = await userform.where({user:username,password:password}).find();
            if(!think.isEmpty(data)){
                this.session('userinfo',data);
                return this.json({
                    name:'后台首页',
                    url:'/admin/index/index',
                    errno:0
                });
            } else {
                return this.fail(403,'账号密码错误，请重新填写');
            }
        } else {
            if(is_login) {
                return this.redirect('/admin/index');
            } else {
                // await
                this.render('/admin/login/login');
                return this.display();
            }
        }


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


    //注销登陆界面
    async logoutAction() {
        await this.session(null);
        return this.redirect('/admin/login');//登录成功将用户信息写入session，返回到user首页
    }

    //判断是否登陆
    async islogin() {
        // 前台判断是否登录
        const user = await this.session('userinfo');
        const res = think.isEmpty(user) ? false : true;
        return res;
    }
};