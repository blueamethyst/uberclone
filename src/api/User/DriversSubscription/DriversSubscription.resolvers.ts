import { withFilter } from "graphql-yoga";
import User from '../../../entities/User';


const resolvers = {
    Subscription: {
        DriversSubscription: {
            subscribe: withFilter(
                (_, __, { pubSub }) => { return pubSub.asyncIterator('driverUpdate') },
                (payload, _, { currentUser }) => {
                    const user: User = currentUser;

                    const {
                        DriversSubscription: {
                            lastLat: driverLastLat,
                            lastLng: driverLastLng
                        }
                    } = payload;

                    const { lastLat: userLastLat, lastLng: userLastLng } = user;

                    const preserv: number = 0.05;
                    return (
                        driverLastLat >= userLastLat - preserv &&
                        driverLastLat <= userLastLat + preserv &&
                        driverLastLng >= userLastLng - preserv &&
                        driverLastLng <= userLastLng + preserv
                    );
                }
            )
        }
    }
}


export default resolvers;