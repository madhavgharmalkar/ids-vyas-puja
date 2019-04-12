const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const userModel = require('../models/user')

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {
        return userModel.findUser(email, password)
            .then(user => {
                if (!user) {
                    return cb(null, false, {message: 'Incorrect email or password'})
                }

                const {password, ...userData} = user
                return cb(null, userData, {message: 'Logged in successfully'})
            })
            .catch(err => cb(err))
    }
))

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your_jwt_secret'
    },
    function(jwtPayload, cb) {
        return userModel.findUserById(jwtPayload.user_id)
            .then(user => {
                if (!user) {
                    return(null, null)
                }
                return cb(null, user)
            })
            .catch(err => {
                return cb(err)
            })
    }
));

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `${process.env.APP_URL}/api/login/facebook/return`,
        profileFields: ['id', 'emails', 'displayName']
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
))

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.APP_URL}/api/login/google/return`,
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile)
    }
))