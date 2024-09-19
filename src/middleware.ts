import { withAuth } from 'next-auth/middleware';
export default withAuth({
    callbacks: {
        authorized: ({ token, req }) => {
            if(req.nextUrl.pathname == '/' || token) return true;
            return false;
        },
    },
});

// exclude certain routes from middleware
export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|public|.*))',
    ],
};