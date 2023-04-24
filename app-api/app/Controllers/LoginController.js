const dbConnection = require('../../database/mySQLconnect');

const authorizeUser = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM User WHERE Email = ? AND Password = ?";
        const values = [ctx.params.Email, ctx.params.Password];
        dbConnection.query({ sql: query, values }, (error, tuples) => {
            if (error) {
                console.log("Query error.", error);
                return reject(`Query error. Error msg: ${error}`);
            }
            if (tuples.length === 1) {
                console.log('User authenticated.');
                ctx.body = {
                    status: "OK",
                    user: tuples[0],
                };
                return resolve(true);
            } else {
                console.log('User not authenticated.');
                return resolve(false);
            }
        });
    }).catch(err => {
        console.log('authorize in LoginController threw an exception. Reason...', err);
        ctx.status = 200;
        ctx.body = {
            status: "Failed",
            error: err,
            user: null
        };
        return false;
    });
}

module.exports = {
    authorizeUser,
};
