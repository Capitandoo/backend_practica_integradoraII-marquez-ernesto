export const validateLogin = (req, res, next) => {
    if(req.session?.email) return response.redirect("/products");
    else res.status(401).json({ msg: 'No estas autorizado' })
}
