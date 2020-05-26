
import { Resolvers } from 'src/types/resolvers';
import { FacebookConnectMutationArgs, FacebookConnectResponse } from 'src/types/graph';

import User from "../../../entities/User";
import createJWT from '../../../utils/createJWT';


const resolvers: Resolvers = {
    Mutation: {
        FacebookConnect: async (_, args: FacebookConnectMutationArgs): Promise<FacebookConnectResponse> => {
            const { fbId } = args;
            try {
                const existingUser = await User.findOne({ fbId });
                if (existingUser) {
                    const token = createJWT(existingUser.id);

                    return {
                        ok: true, error: null, token: token
                    }
                }
            } catch (error) {
                return {
                    ok: false, error: error.message, token: null
                }
            }

            try {

                await User.create({
                    ...args,
                    profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square'`
                }).save();

                return { ok: true, error: null, token: "Comming soon, create" }
            } catch (error) {
                return { ok: false, error: error.message, token: null }
            }

        }
    }
}


/*
const resolvers: Resolvers = {
    Mutation: {
        FacebookConnect: async (_, args: FacebookConnectMutationArgs): Promise<FacebookConnectResponse> => {
            const { fbId } = args;
            try {
                const exitingUser = User.findOne({ fbId });
                if (exitingUser) {
                    return { ok: true, error: null, token: 'Comming Soon, existing' }
                }
            }
            catch (error) {
                return { ok: false, error: error.message, token: null }
            }
            try {
                await User.create({ ...args, profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square'` }).save();

             } catch (error) { return { ok: false, error: error.message, token: null } }
        }
    }
}
*/



export default resolvers;