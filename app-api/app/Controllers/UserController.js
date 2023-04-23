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


const addUser = async (ctx, email, password, name, age, sex, height, weight, activityLevel, fitnessGoal) => {
    console.log('Adding new user to database.');
  
    const query = `
      INSERT 
        INTO 
            User 
      (email, password, name, age, sex, height, weight, activityLevel, fitnessGoal)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const values = [email, password, name, age, sex, height, weight, activityLevel, fitnessGoal];
  
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




  const getUserById = async (ctx, userId) => {
    console.log(`Retrieving user with ID ${userId} from database.`);
  
    const query = `
      SELECT *
      FROM User
      WHERE id = ?
    `;
  
    try {
      const [result] = await dbConnection.query(query, [userId]);
      if (result) {
        ctx.status = 200;
        ctx.body = result;
      } else {
        ctx.status = 404;
        ctx.body = { message: `User with ID ${userId} not found.` };
      }
    } catch (error) {
      console.log("Connection error in UserController::getUserById", error);
      ctx.status = 500;
      ctx.body = { message: 'Failed to retrieve user.' };
    }
  }
  
  


module.exports = {
    allUsers,
    addUser,
    getUserById

};