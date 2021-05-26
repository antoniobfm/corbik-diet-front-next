import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        if (cookies['corbik.token']) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }

        try {
            return await fn(ctx);
        } catch (err) {
            if (err instanceof AuthTokenError) {
                // destroyCookie(ctx, 'corbik.token');
                // destroyCookie(ctx, 'nextauth.refreshToken');

                return {
                    props: {}
                }
            }
        }
    }
}

