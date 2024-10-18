const passport = require('passport')
const jwt = require('passport-jwt')
const { PRIVATE_KEY } = require('../utils/jwt')

const JWTStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

const initializePassport = () => {

    //extrae token de la cookes
    const cookeExtractors = (req) => {
        let token = null
        if (req && req.cookies) {
            token = req.cookies['token']
        }
        return token
    }

    //desencripta el token
    passport.use( 'jwt', new JWTStrategy(
            {
                secretOrKey: PRIVATE_KEY,
                jwtFromRequest: ExtractJwt.fromExtractors([cookeExtractors])
            },
            async (jwt_payload, done) => {
                try {
                    return done(null,jwt_payload)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

}

module.exports = { initializePassport }