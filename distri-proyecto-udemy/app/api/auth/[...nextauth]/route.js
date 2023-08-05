import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET,
      issuer: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
    })
  ]
};

/* export const authOptions = {
  providers: [
    CognitoProvider({
      clientId: "ioip9fr8p7tkgtmpltbrik439",
      clientSecret: "csmucjlv12vrdep3iuhao2e2emfspg73c2oaa565vr31hdjdqro",
      issuer:
        "https://attack-helicopters.auth.sa-east-1.amazoncognito.com/",
    })
  ]
};
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
