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

const UserController = require('../app/Controllers/UserController.js');
const userRouter = require('koa-router')({
    prefix: '/user'
});

userRouter.get('/all-users', UserController.allUsers, err => console.log(`allUsers ran into an error: ${err}`));
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
foodLogRouter.get('/:UserId' , FoodLogController.allFoodByDate, err => console.log(`allFoodbyDate ran into an error: ${err}`));
foodLogRouter.post('/:UserId/:FoodName/:Calories/:Protein/:Fat/:Carbohydrates' , FoodLogController.addFoodByUser, err => console.log(`addFoodByUser ran into an error: ${err}`));


router.use(
    '',
    userRouter.routes(),
    foodLogRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};