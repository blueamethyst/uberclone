import { EmailSignInMutationArgs, EmailSignInResponse } from 'src/types/graph';

import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import createJWT from '../../../utils/createJWT';


const resolvers: Resolvers = {
    Mutation: {
        EmailSignIn: async (_, args: EmailSignInMutationArgs): Promise<EmailSignInResponse> => {
            try {
                const { email } = args;
                const user = await User.findOne({ email });
                if (!user) {
                    return { ok: false, error: "No User found with that email", token: null }
                }


                const validPassword: boolean = true;

                if (!validPassword) {
                    return {
                        ok: false,
                        error: "That password is wrong",
                        token: null
                    };
                }

                const token: string = createJWT(user.id);

                return {
                    ok: true,
                    token,
                    error: null
                };

            } catch (error) {
                return { ok: false, error: error.message, token: null }
            }
        }
    }
}


export default resolvers;