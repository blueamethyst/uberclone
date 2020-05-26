import { Resolvers } from 'src/types/resolvers';
import { StartPhoneVerificationMutationArgs, StartPhoneVerificationResponse } from 'src/types/graph';
import Verification from '../../../entities/Verification';
import SensManager from "../../../utils/sens.v1";

const resolvers: Resolvers = {
    Mutation: {
        StartPhoneVerification: async (_, args: StartPhoneVerificationMutationArgs): Promise<StartPhoneVerificationResponse> => {
            const { phoneNumber } = args;
            try {
                const exisingVerification = await Verification.findOne({
                    payload: phoneNumber
                });

                if (exisingVerification) {
                    exisingVerification.remove();
                }

                const newVerification = await Verification.create({
                    payload: phoneNumber,
                    target: "PHONE"
                }).save();

                const snes = new SensManager();

                const from = process.env.PHONE_VERIFICATION_SRC || "01047827164"
                const result = await snes.SendSms(from, [newVerification.payload], "NUBER Notification SMS \n 인증번호 : " + newVerification.key);

                console.log(result);
                console.log(newVerification);

                return { ok: true, error: null };

            } catch (err) {
                return { ok: false, error: err.message }
            }
        }
    }
}

export default resolvers;