exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        backgroundColor: "bg-darkblue-color",
    });
}

exports.postLogin = (req, res, next) => {
    const { login } = req.body;
    console.log(login);
}