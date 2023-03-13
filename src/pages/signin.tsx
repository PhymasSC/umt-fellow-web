import { getProviders, useSession, signIn, signOut } from "next-auth/react";

interface Provider {
	id: string;
	name: string;
	type: string;
	signinUrl: string;
	callbackUrl: string;
}

export default function SignIn({ providers }: { providers: Provider[] }) {
	const { data: session } = useSession();
	console.log(providers);

	console.log(session);
	if (session)
		return (
			<>
				welcome {session.user?.email}
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	else
		return (
			<>
				You are not sign in
				{Object.values(providers).map((provider) => (
					<div key={provider.name}>
						<button onClick={() => signIn(provider.id)}>
							Sign in with {provider.name}
						</button>
					</div>
				))}
			</>
		);
}

export async function getServerSideProps() {
	const providers = await getProviders();
	return {
		props: { providers },
	};
}
