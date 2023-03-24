const db = require('../models/index')
class usertableController {
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
module.exports = new usertableController;