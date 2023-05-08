/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    console.log('router.get(/)');
    return ctx.body = 'What is up?';
});


// Login router configuration.

const LoginController = require('../app/Controllers/LoginController.js');
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.post('/:Email/:Password', LoginController.authorizeUser, (err) => console.log("login-route error:", err));



const UserController = require('../app/Controllers/UserController.js');
const userRouter = require('koa-router')({
    prefix: '/user'
});

userRouter.get('/all-users', UserController.allUsers, err => console.log(`allUsers ran into an error: ${err}`));
userRouter.get('/:Id', UserController.getUserById, err => console.log(`user by id ran into an error: ${err}`));
userRouter.get('/macros/:Id', UserController.getUserMacros, err => console.log(`user macros by id ran into an error: ${err}`));
userRouter.post('/macros/:Id/:Fat/:Carbs/:Protein', UserController.setUserMacros, err => console.log(`set user macros by id ran into an error: ${err}`));
userRouter.post('/sign-up',UserController.addUser, err => console.log(`sign-up error: ${err}`))
userRouter.post('/update/:dob/:Sex/:Height/:Weight/:ActivityLevel/:Id', UserController.updateUser, err => console.log(`Update error: ${err}`))
userRouter.post('/weight-goal/:Id/:Weight', UserController.setUserWeightGoal, err => console.log(`set user weight goal by id ran into an error: ${err}`));
userRouter.post('/alevel/:Id/:Level', UserController.setUserActivityLevel, err => console.log(`set user activity level by id ran into an error: ${err}`));
userRouter.post('/week-goal/:Id/:WeeklyGoal', UserController.setUserWeeklyGoal, err => console.log(`set user weekly goal by id ran into an error ${err}`));
userRouter.post('/curr-weight/:Id/:Weight', UserController.setUserWeight, err => console.log(`set user weight by id ran into an error ${err}`));
userRouter.post('/wgoal/:Id/:CurrWeight/:GoalWeight/:WeeklyGoal/:ActivityLevel', UserController.updateWeightGoals, err => console.log(`update weight goals ran into an error: ${err}`));

/*
|--------------------------------------------------------------------------
| FoodLog router
|--------------------------------------------------------------------------
|
| FoodLog router is ised for all information in the food log table.
|
*/
const FoodLogController = require('../app/Controllers/FoodLogController.js');
const foodLogRouter = require('koa-router')({
    prefix: '/foodlog'
})
foodLogRouter.get('/:UserId' , FoodLogController.allFoodByUser, err => console.log(`allFoodbyDate ran into an error: ${err}`));
foodLogRouter.get('/range/:NumDays/:UserId' , FoodLogController.allFoodByUserNumDays, err => console.log(`allFoodbyDateNumDays ran into an error: ${err}`));
foodLogRouter.get('/Calories/:UserId' , FoodLogController.todaysCaloriesByUser, err => console.log(`todaysFoodByUser ran into an error: ${err}`));
foodLogRouter.get('/Fat/:UserId' , FoodLogController.todaysFatByUser, err => console.log(`todaysFoodByUser ran into an error: ${err}`));
foodLogRouter.get('/Carbs/:UserId' , FoodLogController.todaysCarbsByUser, err => console.log(`todaysFoodByUser ran into an error: ${err}`));
foodLogRouter.get('/Protein/:UserId' , FoodLogController.todaysProteinByUser, err => console.log(`todaysFoodByUser ran into an error: ${err}`));

foodLogRouter.post('/:UserId/:Date/:FoodName/:Calories/:Protein/:Fat/:Carbohydrates' , FoodLogController.addFoodByUser, err => console.log(`addFoodByUser ran into an error: ${err}`));








router.use(
    '',
    userRouter.routes(),
    foodLogRouter.routes(),
    loginRouter.routes()

);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};