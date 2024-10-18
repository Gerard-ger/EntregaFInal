const authorization = role => {

    return async (req, res, next) => {
        if(!req.user) return res.status(401).send({error: 'unauthorized'})
        if(req.user.role !== role) return res.status(401).send({error: ''})
        next()
    }
}

module.exports = { authorization }