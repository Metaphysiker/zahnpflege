const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const UserModel = require("./models/user");

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("jwt"), //ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      const filter = { email_uppercase: token.email.toUpperCase() };
      const user = await UserModel.findOne(filter);
      try {
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
