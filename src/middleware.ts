export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/rtchat", "/message", "/message/:id", "/setting"]
}