import { db } from "@/library/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

function getGoogleCredentials() {
	const clientId = process.env.GOOGLE_CLIENT_ID;
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

	if (!clientId || clientId.length === 0) {
		throw new Error("No clientId for Google Provider Set");
	}

	if (!clientSecret || clientSecret.length === 0) {
		throw new Error("No clientSecret for Google Provider Set");
	}

	return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",

		error: "/login",
	},
	providers: [
		GoogleProvider({
			clientId: getGoogleCredentials().clientId,
			clientSecret: getGoogleCredentials().clientSecret,
		}),
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials.password) {
					return null;
				}
				// Add logic here to look up the user from the credentials supplied
				const user = await db.user.findUnique({
					where: {
						username: credentials.username,
					},
				});

				if (!user) {
					return null;
				}

				const isPasswordValid = await compare(credentials.password, user.password!);

				// const hashPass = bcrypt.hashSync("12345678", 10);
				// console.log(hashPass);
				if (!isPasswordValid) {
					console.log(`Credentials not valid`);
					return null;
				}

				return {
					id: user.id + "",
					email: user.email,
					name: user.name,
					role: user.role,
				};
			},
		}),
	],
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.role = token.role;
				session.user.image = token.picture;
			}
			return session;
		},
		async jwt({ token, user }) {
			const dbUser = await db.user.findFirst({
				where: {
					email: token.email,
				},
			});

			if (!dbUser) {
				token.id = user!.id;
				return token;
			}

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				role: dbUser.role,
			};
		},
		redirect() {
			return "/dashboard";
		},
	},
};

// export const verifyAuth	= async (token: string) => {
// 	try {
// 		const verified = await jwtVerify
// 	} catch (error) {

// 	}
// }
