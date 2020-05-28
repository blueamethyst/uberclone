

const resolvers = {
    Subscription: {
        DriversSubscription: {
            subscribe: (_, __, { pubSub }) => {
                console.log("DriversSubscription start");
                return pubSub.asyncIterator('driverUpdate');
            }
        }
    }
}


export default resolvers;