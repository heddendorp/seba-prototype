import {User} from '@seba/backend/models';
import * as passwordHash from 'password-hash';
import {Strategy as LocalStrategy} from 'passport-local';
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';
import * as jwt from 'jsonwebtoken';

const jwtSecret = 'server-secret';

export const genToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    jwtSecret
  );
};

export function encryptPassword(password) {
  return passwordHash.generate(password);
}

export function initializePassport(passport) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async function (req, username, password, done) {
        if (await User.exists({username: username}))
          return done(null, {
            statusCode: 409,
          });

        const user = await User.create({
          username: username,
          password: encryptPassword(password),
          display_name: req.body.display_name,
          role: req.body.role,
        });

        return done(null, {
          user,
          statusCode: 201,
        });
      }
    )
  );

  passport.use(
    'login',
    new LocalStrategy(function (username, password, done) {
      User.findOne({username: username}, function (err, user) {
        if (err) return done(err);

        if (!user || !passwordHash.verify(password, user.password))
          return done(null, false, {
            message: 'Login failed. Invalid username or password.',
            statusCode: 401,
          });

        return done(null, user, {
          statusCode: 200,
        });
      });
    })
  );

  passport.use(
    new JwtStrategy(
      {
        secretOrKey: jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async function (token, done) {
        try {
          if (new Date().getTime() > token.exp) {
            new Error('Token is expired');
          }

          const user = await User.findOne({_id: token.id});
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
}
