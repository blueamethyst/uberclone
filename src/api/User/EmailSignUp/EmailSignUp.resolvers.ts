import { Resolvers } from 'src/types/resolvers';
import { EmailSignUpMutationArgs, EmailSignUpResponse } from 'src/types/graph';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';

const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
            try {
                const { email } = args;
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    const token = createJWT(existingUser.id);
                    return {
                        ok: false, error: 'existing email. You should log in instead',
                        token: token
                    }
                } else {
                    const newUser = await User.create({ ...args });
                    const token = createJWT(newUser.id);
                    return { ok: true, error: null, token: token }
                }
            } catch (error) {
                return { ok: false, error: error.message, token: null }
            }
        }

    }
}


export default resolvers;
