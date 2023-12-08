<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->post('login' , 'UserController::authenticate');
$routes->post('createUser', 'UserController::create');
$routes->get('logoutUser', 'UserController::logout');
$routes->get('getUsers' , 'UserController::index');
$routes->get('showUser/(:num)' , 'UserController::show/$1');
$routes->post('updateUser', 'UserController::update');
$routes->post('deleteUser/(:num)', 'UserController::delete/$1');

$routes->get('getProducts', 'ProductController::index');
$routes->get('showProduct/(:num)', 'ProductController::show/$1');
$routes->post('createProduct', 'ProductController::create');
$routes->post('updateProduct/(:num)', 'ProductController::update/$1');
$routes->post('deleteProduct/(:num)', 'ProductController::delete/$1');

$routes->get('getChats', 'ChatController::index');
$routes->post('createChat', 'ChatController::create');

$routes->get('getCheckout', 'CheckoutController::index');
$routes->get('showCheckout/(:num)', 'CheckoutController::show/$1');
$routes->post('createCheckout', 'CheckoutController::create');
$routes->post('deleteCheckout', 'CheckoutController::create');
// USERS
// $routes->group("/api", function ($routes) {
//     $routes->post('login' , 'UserController::authenticate');
//     $routes->post('createUser', 'UserController::create');
//     $routes->get('logoutUser', 'UserController::logout');
//     $routes->get('getUsers' , 'UserController::index');
//     $routes->get('searchUser/(:num)' , 'UserController::show/$1');
//     $routes->post('updateUser', 'UserController::update');
//     $routes->post('deleteUser/(:num)', 'UserController::delete/$1');

//     $routes->get('getProducts', 'ProductController::index');
//     $routes->get('showProduct/(:num)', 'ProductController::show/$1');
//     $routes->post('createProduct', 'ProductController::create');
//     $routes->post('updateProduct/(:num)', 'ProductController::update/$1');
//     $routes->post('deleteProduct/(:num)', 'ProductController::delete/$1');

//     $routes->get('getChats', 'ChatController::index');
//     $routes->post('createChat', 'ChatController::create');
// });
// $routes->resource('Checkout');
