exports.getIndex = (req, res, next) => {
    res.render('index', {
        title: "index page",
    });
}

exports.postLogin = (req, res, next) => {
    const { login } = req.body;
    console.log(login);
}