import {User} from "@seba/models";
import * as passwordHash from "password-hash";
import {Strategy as LocalStrategy} from "passport-local";

export function encryptPassword(password) {
  return passwordHash.generate(password);
}

export function initializePassport(passport) {
  passport.use(
    "register",
    new LocalStrategy({
      passReqToCallback: true
    },
      async function (req, username, password, done) {
        if (await User.exists({username: username}))
          return done(null, {
            response: {
              message: "Signup failed - username already exists."
            },
            statusCode: 409
          })

        const user = await User.create({
          username: username,
          password: encryptPassword(password),
          display_name: req.query.display_name,
          role: req.query.role
        });

        return done(null, {
          user,
          statusCode: 201,
        });
      }
    )
  )

  passport.use(
    "login",
    new LocalStrategy(
      function(username, password, done) {
        User.findOne({username: username}, function (err, user) {
          if (err)
            return done(err);

          if (!user || !passwordHash.verify(password, user.password))
            return done(null, false, {
              message: "Login failed. Invalid username or password.",
              statusCode: 401
            });

          return done(null, user, {
            statusCode: 200
          });
        })
      }
    )
  );
}
