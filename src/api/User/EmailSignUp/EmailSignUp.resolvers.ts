import { Resolvers } from 'src/types/resolvers';
import { EmailSignUpMutationArgs, EmailSignUpResponse } from 'src/types/graph';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';
import Verification from '../../../entities/Verification';
import Mailer from '../../../utils/mailer';

const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
            try {
                console.log("EmailSignUp start");
                const { email } = args;
                const existingUser = await User.findOne({ email });

                if (existingUser) {
                    console.log("already exist email");
                    const token = createJWT(existingUser.id);
                    return {
                        ok: false,
                        error: 'existing email. You should log in instead',
                        token: token
                    }
                } else {
                    const newUser = await User.create({ ...args }).save();
                    console.log("create new user");
                    if (newUser.email) {
                        const emailVerification = await Verification.create({
                            payload: newUser.email,
                            target: "EMAIL"
                        }).save();

                        console.log("send email");
                        await new Mailer().sendVirificationEmail(newUser.email, newUser.fullName, emailVerification.key);

                    }
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
