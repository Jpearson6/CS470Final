const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');
function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const allUsers = async (ctx) => {
    console.log('users all users called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            User
                        ORDER BY name
                        `;
        dbConnection.query({
            sql: query,
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


const addUser = async (ctx) => {
  console.log('Adding new user to database.');

  const { Email, Name, Password } = ctx.request.body;

  const query = `
    INSERT 
      INTO 
          User 
    (Email,Name, Password)
    VALUES (?, ?, ?);
  `;

  const values = [Email, Name, Password];

  try {
    await dbConnection.query(query, values);
    ctx.status = 201;
    ctx.body = { message: 'User created successfully.' };
  } catch (error) {
    console.log("Connection error in UserController::addUser", error);
    ctx.status = 500;
    ctx.body = { message: 'Failed to create user.' };
  }
}

  const getUserById = async (ctx) => {
    console.log('FoodLog food by date called.');
    return new Promise((resolve, reject) => {
        const query = `
        SELECT *
        FROM User
        WHERE Id = ?
      `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.Id]
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

  const getUserMacros = async (ctx) => {
    console.log('FoodLog food by date called.');
    return new Promise((resolve, reject) => {
        const query = `
        SELECT MacroFat, MacroCarbs, MacroProtein
        FROM User
        WHERE Id = ?
      `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.Id]
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

  const setUserMacros = async (ctx) => {
    console.log('FoodLog food by date called.');
    return new Promise((resolve, reject) => {
        const query = `
        Update User
        Set MacroFat = ?, 
        MacroCarbs = ?, 
        MacroProtein = ?
        WHERE Id = ?
      `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.Fat, ctx.params.Carbs, ctx.params.Protein, ctx.params.Id]
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

  const setUserHeigth = async (ctx) => {
    console.log('FoodLog food by date called.');
    return new Promise((resolve, reject) => {
        const query = `
        Update User
        Set Height = ?, 
        WHERE Id = ?
      `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.Height, ctx.params.Id]
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

  const setUserWeigth = async (ctx) => {
    console.log('FoodLog food by date called.');
    return new Promise((resolve, reject) => {
        const query = `
        Update User
        Set Weight = ?, 
        WHERE Id = ?
      `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.Height, ctx.params.Id]
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

  const setUserActivityLevel = async (ctx) => {
    console.log('FoodLog food by date called.');
    return new Promise((resolve, reject) => {
        const query = `
        Update User
        Set ActivityLevel = ?, 
        WHERE Id = ?
      `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.Height, ctx.params.Id]
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

  const setUserWeeklyGoal = async (ctx) => {
    console.log('FoodLog food by date called.');
    return new Promise((resolve, reject) => {
        const query = `
        Update User
        Set LbsPerWeek = ?, 
        WHERE Id = ?
      `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.Height, ctx.params.Id]
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
    allUsers,
    addUser,
    getUserById,
    getUserMacros,
    setUserMacros,
    setUserHeigth,
    setUserWeigth,
    setUserActivityLevel,
    setUserWeeklyGoal

};