const chai = require('chai');
const UserService = require('./user-service');
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised);
const expect = chai.expect;

const doNothing = () => {};
const returnArgument = (arg) => arg;

describe('user-service', () => {
    describe('registerUser', () => {
        it('If user data is null, registerUser should throw an exception', () => {
            const userService = new UserService();
            expect(userService.registerUser(null)).to.be.rejectedWith(Error);
        });

        it('If user data is null, registerUser should throw an exception', () => {
            const userService = new UserService();
            expect(userService.registerUser(null)).to.be.rejectedWith(Error);
        });

        it('If user data is correct and the user can be saved and the event published the service will return the new user', async () => {
            const userData = {
                userName: 'user-name',
                password: 'some-password'
            }
            
            const userService = new UserService({ save: returnArgument }, { publish: doNothing });
            const newUser = await userService.registerUser(userData);

            expect(newUser.userName).to.equal(userData.userName);
            expect(newUser.password).to.equal(userData.password);
            expect(newUser.state).to.equal('PENDING');
        });
    })
})