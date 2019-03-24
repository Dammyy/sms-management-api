'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Welcome to SMS Management API' }
})

Route.post('/login', 'UserController.login')
Route.post('/register', 'UserController.createAccount').validator('RegisterUser')
Route.resource('messages', 'MessageController').middleware('auth').apiOnly()
Route.get('/sent', 'MessageController.sentMessages').middleware('auth')
Route.delete('/user', 'UserController.delete').middleware('auth')
Route.post('/read-message', 'MessageController.markAsRead').middleware('auth')
