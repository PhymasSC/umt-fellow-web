import NextAuth, { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID || "",
			clientSecret: process.env.GOOGLE_SECRET || "",
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID || "",
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
		}),
		CredentialProvider({
			type: "credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
				},
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials, req) => {
				// database look up
				const { email, password } = credentials as {
					email: string;
					password: string;
				};

				const user = await prisma.user.findUnique({
					where: {
						email: email,
					},
				});
				if (!user) return null;
				if (await bcrypt.compare(password, user.password || "")) {
					return user;
				}
				// login failed
				return null;
			},
		}),
	],
	callbacks: {
		session({ session, token }) {
			if (session?.user) {
				session.user.id = token?.sub || "";
			}
			return session;
		},

		jwt: async ({ user, token }) => {
			if (user) {
				token.uid = user.id;
			}
			return token;
		},
	},
	session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60, updateAge: 24 * 60 * 60 },
	pages: {
		signIn: "/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
