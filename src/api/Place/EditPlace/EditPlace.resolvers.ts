import { Resolvers } from "src/types/resolvers";
import { EditPlaceMutationArgs, EditPlaceResponse } from "src/types/graph";
import privateResolver from "../../../utils/privateResolver";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import Place from "../../../entities/Place";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Mutation: {
        EditPlace: privateResolver(async (_, args: EditPlaceMutationArgs, { req }): Promise<EditPlaceResponse> => {
            const user: User = req.user;
            try {
                const place = await Place.findOne({ id: args.placeId });

                if (place) {
                    if (place.user.id === user.id) {
                        const notNull: any = cleanNullArgs(args);
                        delete notNull.placeId;
                        await Place.update({ id: args.placeId }, { ...notNull });
                        return { ok: true, error: null }
                    } else {
                        return { ok: false, error: 'Not Authorized' }
                    }
                } else {
                    return { ok: false, error: 'Place not found' }
                }
            } catch (error) {
                return { ok: true, error: error.message }
            }
        })
    }
}

export default resolvers;
