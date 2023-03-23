class usersController {
    /**
     *  Rendering Admin page
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async admin(req, res, next) {
        res.render('admin/adminpanel/index');
    }

    /**
     * render change password page 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async changepass(req, res, next) {
        res.render('admin/resetpassword/changepass');
    }
    
    /**
     * error page
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async error(req, res, next) {
        res.render('admin/error')
    }

    
}

module.exports = new usersController;