exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        backgroundColor: "bg-darkblue-color"
    });
}