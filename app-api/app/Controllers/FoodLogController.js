const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');
function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const allFoodByDate = async (ctx) => {
    console.log('FoodLog food by date called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT LogDate, FoodName, Calories, Protein, Fat, Carbohydrates
                        FROM 
                            FoodLog
                        WHERE UserId = ?
                        ORDER BY LogID
                        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.UserId]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in Food Controller::allFoodByDate", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allUsers.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const addFoodByUser = async (ctx) => {
    console.log('FoodLog food by date called.');
    return new Promise((resolve, reject) => {
        const query = `
                            INSERT INTO 
                            FoodLog (UserId, LogDate, FoodName, Calories, Protein, Carbohydrates, Fat)
                            Values
                            (?, ?, ?, ?, ?, ?, ?);
                        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.UserId , now(), ctx.params.FoodName, ctx.params.Calories, ctx.params.Protein, ctx.params.Carbohydrates, ctx.params.Fat]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UserController::allUsers", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allUsers.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}


module.exports = {
    allFoodByDate,
    addFoodByUser
};