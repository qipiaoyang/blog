module.exports = class extends think.Controller {
    async __before() {
        const userinfo = await this.session('userinfo');
        console.log(this);
        if (!think.isEmpty(userinfo)) {
            this.assign('userinfo', userinfo);
        } else {
            this.redirect('/admin/login');
            return false;
        }
    }
}