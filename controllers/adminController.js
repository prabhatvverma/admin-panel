const db = require('../models/index')
const { validationResult, Result } = require('express-validator');

class adminController {
    /**
  *  Rendering Admin page
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
    async admin(req, res, next) {
        res.render('admin/adminpanel/index');
    }

    async logoutUser(req, res, next) {
        req.session.destroy();
        res.redirect('/login')
    }


    /**
     * show users details table with user regsterd 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async showAllUsersDetails(req, res, next) {
        const users = await db.User.findAll();
        res.render('admin/userstable/index', {
            users: users
        });
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


    async userPassChange(req, res, next) {
        const result = validationResult(req);
        const value = result.errors;
        console.log(result);
        if (value) {
            res.render('admin/resetpassword/changepass', {
                value
            })
        }
    }

    async deleteUserDetails(req, res, next) {
        let { id } = req.params;
        await db.User.destroy({
            where: {
                id: id
            }
        })
        res.redirect('/users');
    }
}

module.exports = new adminController;