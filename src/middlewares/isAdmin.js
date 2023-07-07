export const isAdmin = (req, res, next) => {
    if(req.session?.admin) return response.redirect("/login");
    else res.status(401).json({ msg: 'No estas autorizado' })
}
