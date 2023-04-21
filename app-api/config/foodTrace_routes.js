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

userRouter.get('/all-users', UserController.allUsers, err => console.log(`allUsers ran into an error: ${err}`))

router.use(
    '',
    userRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};