

module.exports = class UserService {
    constructor(repository, eventAdapter) {
        this.repository = repository;
        this.eventAdapter = eventAdapter;
    }

    async registerUser(userData) {
        if(!userData) {
            throw new Error('The user cannot be null.');
        }

        // Perform the rest of validations like username already exists, 
        // password is strong enough, etc.
        userData.state = 'PENDING';

        const newUser = await this.repository.save(userData);
        this.eventAdapter.publish('user.registered', newUser);
        return newUser;
    }

    async confirmUser(userData) {
        if(!userData) {
            throw new Error('The user cannot be null.');
        }

        // Perform the rest of validations
        userData.state = 'CONFIRMED';

        await this.repository.save(userData);
        this.eventAdapter.publish('user.confirmed', userData);
        return userData;
    }
}