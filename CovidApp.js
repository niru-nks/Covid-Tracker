const User = require('./Users/User');
const Admin = require('./Users/Admin');
const {USER_TYPES} = require('./constants');
class CovidApp {
    userCounter = 1;
    adminCounter = 1;
    constructor() {
        this.users = [];
    }

    registerUser(data) {
        let u = new User({...data, type: USER_TYPES.USER});
        u.register({id: this.userCounter})
        this.users.push(u);
        this.userCounter++;
        return u;
    }

    registerAdmin(data) {
        let u = new Admin({...data, type: USER_TYPES.ADMIN});
        u.register({id: this.adminCounter})
        this.users.push(u);
        this.adminCounter++;
        return u;
    }

    selfAssessment(data) {
        // check if user is valid
        let u;
        for(let i= 0;i<this.users.length;i++) {
            if(this.users[i].userID == data.userId) {
                u = this.users[i];
                break;
            }
        }
        if(!u) {
            throw new Error('User not found')
        }
        let resp = u.selfAssessment(data);
        console.log(resp);
        return resp;
    }

    updateCovidResult(data) {
        let u, a;
        console.log(this.users)
        for(let i= 0;i<this.users.length;i++) {
            if(this.users[i].userID == data.userId) {
                u = this.users[i];
            }
            if(this.users[i].adminID == data.adminId) {
                a = this.users[i];
            }
            if(u && a) {
                break;
            }
        }
        if(!u || !a) {
            throw new Error('User or admin not found')
        }
        let covidStatus = data.result == 'positive'? true: false;
        let resp =  a.updateCovidResult({
            user: u,
            covidStatus: covidStatus
        })
        console.log(resp);
        return resp;
    }

    getZoneInfo(data) {
        let count = 0;
        console.log(this.users)
        for(let i = 0;i<this.users.length;i++) {
            if(this.users[i].pinCode == data.pinCode && this.users[i].covidStatus) {
                count++;
            } 
        }
        let resp = {
            numCases: count,
            zoneType: this.getZoneType(count)
        }
        console.log(resp);
        return resp;
    }

    getZoneType(data) {
        let zone = ''
        if(!data) {
            zone = 'GREEN';
        } else if(data < 5) {
            zone = 'ORANGE';
        } else {
            zone = 'RED'
        }
        // console.log(zone);
        return zone;
    }
}

module.exports = CovidApp;