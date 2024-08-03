import prisma from '@/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH_CONFIG = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },
          async authorize(credentials:any) {
              console.log(credentials)
                const response = await prisma.users.findFirst({
                  where:{
                    AND : [
                      {
                        OR : [
                          {Email : credentials.email},
                          {UserName : credentials.email}
                        ]
                      },{
                        PasswordHash : credentials.password
                      }
                    ]
                  }
                })
                if(response){
                  return {
                    id : response.UserID,
                    name:response.UserName,
                    email : response.Email
                  } as any
                }
                  return null
          },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: any) => {
        if (user) {
            token.uid = user.id;
        }
        return token;
        },
      session: ({ session, token }: any | null | undefined) => {
          if (session.user) {
              session.user.id = token.uid
          }
          return session
      },
      async redirect() {
        return process.env.HOST_URL;
      }
    },
    pages: {
        signIn: '/signin',
    }
  }