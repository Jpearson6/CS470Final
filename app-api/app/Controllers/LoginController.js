const { reject } = require('lodash');
const dbConnection = require('../../database/mySQLconnect');

const authorizeUser = async (ctx) => {
    return new Promise((resolve, reject) => {
        //User user email to loging

        let query = "SELECT * FROM User WHERE Email = ? AND Password = ?"
        dbConnection.query(
            {
                sql: query,
                values:[ctx.params.Email, ctx.params.Password]
            },(error, tuples) => {
                if(error) {
                    console.log("Query error.", error);
                    return reject(`Query error. Error msg: error`);
                }
                if (tuples.length === 1) {  // Did we have a matching user record?
                    setAccessToken(ctx, tuples[0]);
                    console.log('from User. About to return ', tuples[0]);
                    ctx.body = {
                        status: "OK",
                        user: tuples[0],
                    };
                } else {
                    console.log('Not able to identify the user.');
                    return reject('Wrong user or password');
                }
                return resolve();
            }
        )
    }).catch(err => {
        console.log('authorize in LoginController threw an exception. Reason...', err);
	        ctx.status = 200;
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };

    })
}


module.exports = {
    authorizeUser,
};