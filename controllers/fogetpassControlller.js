class forgetpass {
    async showEmailPage(req, res, next) {
        res.render('admin/resetpassword/index')
    }

    async showVerifyOtpPage(req, res, next) {
        res.render('admin/resetpassword/verifyOtp')
    }

    async showCreateNewPass(req, res, next) {
        res.render('admin/resetpassword/createNewPass')
    }
}

module.exports = new forgetpass;