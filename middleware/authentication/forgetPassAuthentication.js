const forgetPassAuth = async(req,res,next)=>{
    if (req.session.forOtp) {
        next();
    }
    else {
        res.redirect('/forget');
    }
}

module.exports = forgetPassAuth;