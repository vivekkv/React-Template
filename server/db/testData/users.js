let users = [{
    "id": 1,
    "mobile": "9947252579",
    "password": "admin",
    "name": "admin"
}]
exports.getUsers = function() {
    return users;
}

exports.insert = function(user) {
    users.push(user)
}