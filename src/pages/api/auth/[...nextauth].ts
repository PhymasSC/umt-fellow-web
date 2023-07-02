import NextAuth, { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import RedditProvider from "next-auth/providers/reddit"
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
		RedditProvider({
			clientId: process.env.REDDIT_CLIENT_ID,
			clientSecret: process.env.REDDIT_CLIENT_SECRET,
			authorization: {
				params: {
					duration: 'permanent',
				},
			},
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
		jwt({ token, account, user, trigger, session }) {
			if (account) {
				token.accessToken = account.access_token
				token.id = user?.id
			}
			if (trigger === "update") {
				token = { ...token, ...session }
			}
			return token
		},
		session({ session, token, trigger }) {
			session.user.id = token.sub || "";
			if (trigger === "update") console.log(trigger)
			return session;
		},
	},
	session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60, updateAge: 24 * 60 * 60 },
	// pages: {
	// 	signIn: "/login",
	// },
};
export default NextAuth(authOptions);
