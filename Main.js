const CovidApp = require('./CovidApp');
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