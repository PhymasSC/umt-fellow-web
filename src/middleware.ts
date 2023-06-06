import { NextRequestWithAuth, withAuth } from "next-auth/middleware"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req: NextRequestWithAuth) {
        console.log(`Next auth Token: ,`, req.nextauth.token)
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                console.log(`Authorized: `, token)
                console.log('Secret: ', process.env.NEXTAUTH_SECRET)
                if (token) return true
                return false
            },
        },
    }
)

export const config = {
    matcher: ["/rtchat", "/message", "/message/[id]"]
}