const People = require('./People');
class Admin extends People {
    constructor(data) {
        super(data);
    }

    register(data) {
        this.adminID = data.id;
    }

    updateCovidResult(data) {
        let currStatus = data.user.covidStatus;
        if(data.covidStatus == currStatus) {
            return {
                changed: false
            }
        }
        data.user.updateCovidStatus(data.covidStatus);
        return {
            changed: true
        };
    }

}

module.exports = Admin;