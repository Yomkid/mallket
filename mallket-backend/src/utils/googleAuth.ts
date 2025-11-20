// utils/googleAuth.ts
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  providerId: string;
}

export const verifyGoogleToken = async (token: string): Promise<GoogleUser> => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (
    !payload ||
    !payload.email ||
    !payload.given_name ||
    !payload.family_name ||
    !payload.sub
  ) {
    throw new Error('Incomplete Google account information.');
  }

  return {
    email: payload.email,
    firstName: payload.given_name,
    lastName: payload.family_name,
    providerId: payload.sub,
  };
};
