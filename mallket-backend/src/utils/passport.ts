import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../config/prisma"; // Adjust based on where you initialize Prisma
import { AuthProvider } from "@prisma/client";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.emails?.[0].value },
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await prisma.user.create({
          data: {
            email: profile.emails?.[0].value!,
            firstName: profile.name?.givenName || "Google",
            lastName: profile.name?.familyName || "User",
            provider: AuthProvider.GOOGLE,
            providerId: profile.id,
            emailVerified: true,
            password: "", // optional, or handle this separately
          },
        });

        done(null, newUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

// For session support (optional)
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id: string, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  done(null, user);
});

export default passport;
