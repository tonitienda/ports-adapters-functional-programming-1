
module.exports = class UserRepository {
    constructor() {
    }

    save(user) {
        console.log('Saving user: ', JSON.stringify(user));
        return user;
    }
}