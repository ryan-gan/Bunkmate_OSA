var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { User } = require("../models/User");
module.exports = {
    Query: {
        hello: () => 'world',
        getUsers: (_, {}) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User.findUsers();
                return users;
            }
            catch (error) {
                console.log(error);
            }
        })
    },
    Mutation: {
        authGoogle: (_, { email }) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (email) {
                    const res = yield User.upsertGoogleUser(email); //upsert: update or insert
                    return {
                        email: res.email,
                        token: "",
                        new_user: res.new_user
                    };
                }
                return (Error('server error'));
            }
            catch (error) {
                return error;
            }
        }),
        updateUser: (_, { user }) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (user) {
                    console.log("User and their email:");
                    console.log(user);
                    console.log(user.email);
                    const updated_user = User.updateUser({ email: user.email }, user);
                    console.log("UPDATED USER");
                    console.log(updated_user);
                    return updated_user;
                }
            }
            catch (error) {
                console.error(error);
            }
        })
    }
};
//# sourceMappingURL=resolvers.js.map