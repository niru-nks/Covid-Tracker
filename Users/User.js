const People = require('./People');
class User extends People{
    
    constructor(data) {
        super(data)
    }
    register(data) {
        this.userID = data.id;
    }
}

module.exports = User;