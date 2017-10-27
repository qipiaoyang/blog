module.exports = class extends think.Controller {
    async __before() {     
        let userinfo = await this.session('userinfo');
        if (!think.isEmpty(userinfo)){ 
            this.assign('userinfo',userinfo);  
        }else{  
            
            return this.redirect('/admin/index');  
        } 
    }
}