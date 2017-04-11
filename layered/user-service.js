

module.exports = class UserService {
    constructor(repository, eventAdapter) {
        this.repository = repository;
        this.eventAdapter = eventAdapter;
    }

    async registerUser(userData) {
        if(!userData) {
            throw new Error('The user cannot be null.');
        }

        validateUserName(userData.userName);
        validatePassword(userData.password);

        const user = {
            userName: userData.userName,
            password: userData.password,
            state: 'PENDING'
        };

        const newUser = await this.repository.save(user);
        this.eventAdapter.publish('user.registered', newUser);
        return newUser;
    }

    async confirmUser(userData) {
        if(!userData) {
            throw new Error('The user cannot be null.');
        }

        let user = this.repository.getByNameAndPassword(userData.userName, userData.password);
        user.state = 'CONFIRMED';

        await this.repository.save(user);
        this.eventAdapter.publish('user.confirmed', user);
        return user;
    }
}

function validatePassword(password) {
    // Validate length, strength, etc
}

function validateUserName(userName) {
    // validate length, format, etc.
}