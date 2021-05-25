// import { decode } from "jwt-decode";
import { signOut } from "@/contexts/AuthContext";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

type WithSSRAuthOptions = {
    permissions?: string[];
    roles?: string[];
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);
        const token = cookies['corbik.token'];
				console.log('yes');
				console.log(token);

        if (!token) {
            return {
                redirect: {
                    destination: '/account/login',
                    permanent: false,
                }
            }
        }

        // if (options) {
        //     const user = decode<{ permissions: string[], roles: string[] }>(token);
        //     const { permissions, roles } = options;

        //     const userHasValidPermissions = validateUserPermissions({
        //         user,
        //         permissions,
        //         roles
        //     });

        //     if (!userHasValidPermissions) {
        //         return {
        //             redirect: {
        //                 destination: '/',
        //                 permanent: false
        //             }
        //         }
        //     }
        // };

        try {
            return await fn(ctx);
        } catch (err) {
            if (err instanceof AuthTokenError) {
                destroyCookie(ctx, 'corbik.token');
                // destroyCookie(ctx, 'nextauth.refreshToken');

                return {
                    redirect: {
                        destination: '/account/login',
                        permanent: false,
                    }
                }
            }
        }
    }
}
