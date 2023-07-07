import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserManager from '../daos/mongodb/UserDao.js';
import "dotenv/config";


const userManager = new UserManager ();

const strategyOptions = {
    clientID: 'Iv1.f4b2980665fe3c6f',
    clientSecret: 'fc4299af2bdd8403726b4ec609ca435a82756839',
    callbackURL: 'http://localhost:8080/users/profile-github'
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) =>{
    console.log('profile:::', profile);
    const email = profile._json.email !== null ? profile._json.email : profile._json.blog;
    const user = await userManager.getByEmail(email);
    if(user) return done(null, user);
    const newUser = await userManager.registro ({
        first_name: profile._json.name.split(' ')[0],
        last_name: profile._json.name.split(' ')[1] + ' ' + profile._json.name.split(' ')[2],
        email,
        password: ' ',
        isGithub: true
    });
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));