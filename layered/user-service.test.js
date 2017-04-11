const chai = require('chai');
const UserService = require('./user-service');
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised);
const expect = chai.expect;


describe('user-service', () => {
    describe('registerUser', () => {
        it('If user data is null, registerUser should throw an exception', () => {
            const userService = new UserService();
            expect(userService.registerUser(null)).to.be.rejectedWith(Error);
        });
    })
})