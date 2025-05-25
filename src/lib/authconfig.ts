import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password required");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.hashedPassword) {
                    // If user not found or user signed up with OAuth previously (no password)
                    throw new Error("Invalid credentials or user not found");
                }

                const isValidPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isValidPassword) {
                    throw new Error("Invalid credentials");
                }

                // Return user object if everything is fine
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt", // Using JWT for session strategy
    },
    callbacks: {
        async jwt({ token, user }) {
            // Persist the user ID and role to the JWT
            if (user) {
                token.id = user.id;
            }
            // if (account?.provider === "google" && user) { // Example: Handle Google-specific logic
            //    // Add custom fields from Google profile if needed
            // }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token and user id from a provider.
            if (session.user && token.id) {
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login", // Custom sign-in page
        signOut: '/logout', // Custom sign-out page
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out to disable)
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development", // Enable debug messages in development
};