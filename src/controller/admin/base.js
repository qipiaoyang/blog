module.exports = class extends think.Controller {
    async __before() {
        const userinfo = await this.session('userinfo');
        if (!think.isEmpty(userinfo)) {
            this.assign('userinfo', userinfo);
        } else {
            this.redirect('/admin/login');
            return false;
        }
    }
}