const USER_TYPES = {
    USER: 'USER',
    ADMIN: 'ADMIN'
}

class Hardcoded {
    calculate()
}

class RiskCalculator {
    if(Hardcoded) {
        return new Hardcoded;
    }
}

class People {
    assessment = {};
    covidStatus = false;
    constructor(data) {
        this.name = data.name;
        this.phoneNumber = data.phoneNumber;
        this.pinCode = data.pinCode;
        this.type = data.type;
    }

    selfAssessment(data) {
        this.assessment = data;
        let riskPercentage = new RiskCalculator('HARDCODED').calculatethis.calculateRisk(data);
        return riskPercentage;
    }

    calculateRisk(data) {
        let riskPercentage = 0;
        if(!data.symptoms.length && !data.travelHistory && !data.contactWithCovidPatient) {
            riskPercentage = 5;
        } else if (data.symptoms.length == 1 && (data.travelHistory || data.contactWithCovidPatient)) {
            riskPercentage = 50;
        } else if (data.symptoms.length == 2 && (data.travelHistory || data.contactWithCovidPatient)) {
            riskPercentage = 75;
        } else if (data.symptoms.length > 2 && (data.travelHistory || data.contactWithCovidPatient)) {
            riskPercentage = 95;
        } else {
            riskPercentage = 5;
        }
        return {
            riskPercentage
        }
    }

    updateCovidStatus(data) {
        this.covidStatus = data;
    }
}

class User extends People{
    
    constructor(data) {
        super(data)
    }
    register(data) {
        this.userID = data.id;
    }
}

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

class Validator {
    validators = [];
    constructor(data) {
        for(i in data) {
            switch (i){
                case 'MOBILE_LENGTH': this.validators.push(new Mobile_length_Validator())
            }
        }
    }

    validate() {
        for(i in validators) {
            i.validate(data)
        }
    }
}



class CovidApp {
    userCounter = 1;
    adminCounter = 1;
    constructor() {
        this.users = [];
    }

    registerUser(data) {
        try{

            let validator = new Validator(['MOBILE_LENGTH', 'USER_EXISTING']);
            validator.validate(data)
            let u = new User({...data, type: USER_TYPES.USER});
            u.register({id: this.userCounter})
            this.users.push(u);
            this.userCounter++;
            return u;
        } catch(e) {
            return {
                success: false,
                message: 'Success',
                data: {}
            }
        }
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
        } else if(data < 2) {
            zone = 'ORANGE';
        } else {
            zone = 'RED'
        }
        // console.log(zone);
        return zone;
    }
}

let App = new CovidApp;

let us = App.registerUser({"name":"A","phoneNumber":"9999999999","pinCode":"111111"});
console.log(us)

let us2 = App.registerUser({"name":"B","phoneNumber":"9999999998","pinCode":"111111"});
console.log(us2)
App.selfAssessment({"userId":1,"symptoms":["fever"],"travelHistory":true,"contactWithCovidPatient":true})
console.log(us)
let ad = App.registerAdmin( {"name":"X","phoneNumber":"9999999999","pinCode":"111111"});
console.log(ad)
App.updateCovidResult({"userId":1,"adminId":1,"result":"positive"})
App.updateCovidResult({"userId":2,"adminId":1,"result":"positive"})
console.log(us)

App.getZoneInfo({"pinCode":"111111"})


User
    userID, type, Name, Mobile, email, pinCode, covidStatus, assessment

Zones
    pinCode, Count
// UserMeta
//     userID, 