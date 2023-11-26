<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->resource('Users');
$routes->post('/login', 'Users::authenticate');
$routes->get('/logout', 'Users::logout');
$routes->get('/access', 'Users::accessibility');
$routes->get('/access', 'Users::accessibility');

$routes->resource('Products');

$routes->resource('Chats');