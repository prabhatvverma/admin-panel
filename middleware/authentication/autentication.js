const userAuthentication = async(req, res, next) => {
    if (req.session.user || req.session.passport) {
        next();
    }
    else {
        res.redirect('/login');
    }

}

module.exports = userAuthentication;