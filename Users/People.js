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
        let riskPercentage = this.calculateRisk(data);
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

module.exports = People;