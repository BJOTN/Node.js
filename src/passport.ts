
import passportJWT from 'passport-jwt';
import passport from 'passport';
import {db} from './db'
import * as dotenv from 'dotenv';
dotenv.config();

const { SECRET } = process.env;


passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      // Implementa la logica di verifica del token JWT qui
      const user = db.one('SELECT * FROM users WHERE id=$1', payload.id)

      try {
        return user ? done(null, user) : done(new Error('user not found'))
      } catch (error) {
        done(error)
      }
    }
  )
);
