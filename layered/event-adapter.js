
module.exports = class EventAdapter {
    constructor() {
    }

    publish(topic, payload) {
        const event = { topic, payload };
        console.log('Publishing event: ', JSON.stringify(event));
    }
}