import NextAuth from "next-auth";
import { authOptions } from "@/lib/authconfig";

// Create the auth handler with the correct API for Next.js App Router
const handler = NextAuth(authOptions);

// Export the auth handlers for the API route
export {
    handler as GET,
    handler as POST,
}