<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class Users extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index()
    {
        $main = new UserModel();
        $data = $main->findAll();
        return $this->respond($data);
    }
    /**
     * Authenticate a user based on provided credentials
     *
     * @return mixed
     */
    public function authenticate()
    {
        $session = \Config\Services::session();
        helper(['form']);

        $rules = [
            'userName' => 'required',
            'userPassword' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $userName = $this->request->getVar('userName');
        $userPassword = $this->request->getVar('userPassword');

        $userModel = new UserModel();
        $user = $userModel->where('userName', $userName)->first();

        if ($user && password_verify($userPassword, $user['userPassword'])) {

            $session->set('isLoggedIn',true);
            $session->set('role',$user['userRole']);
            $session->set('userId',$user['userId']);

            $response = [
                'status' => 200,
                'error' => null,
                'redirect' => '/dashboard',
                'userId' => $session->get('userId'),
                'role' => $session->get('role'),
            ];
            return $this->respondCreated($response);
        } else {
            // Authentication failed
            $response = [
                'status' => 401,
                'error' => 'Invalid credentials',
                'messages' => [
                    'error' => 'Invalid username or password',
                ],
            ];
            return $this->respond($response);
        }
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($userId = null)
    {
        $main = new UserModel();
        $data = $main->where('userId' , $userId)->first();
        return $this->respond($data);
    }
    
    /**
     * Create a new resource object, from "posted" parameters
     * 
     * @return mixed
     */
    public function create()
    {
        helper(['form']);

        $rules = [
            'userName' => 'required',
            'userPassword' => 'required',
            'userRole' => 'required',
        ];

        $userModel = new UserModel();
        $user = $userModel->where('userName', $this->request->getVar('userName'))->first();
        if($user){
            $response = [
                'status' => 409,
                'error' => null,
                'fail' => 'Username already exists!',
            ];
            return $this->respondCreated($response);
        }

        $data = [
            'userName' => $this->request->getVar('userName'),
            'userPassword' => password_hash($this->request->getVar('userPassword'), PASSWORD_DEFAULT),
            'userRole' => $this->request->getVar('userRole'),
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $userModel = new UserModel();
        $userModel->save($data);
        
        $response = [
            'status' => 201,
            'error' => null,
            'redirect' => '/login',
            'messages' => [
                'success' => 'User Registered',
            ],
        ];
        
        return $this->respondCreated($response);
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    use ResponseTrait;
    public function update($id = null)
    {
        $userModel = new UserModel();
        $existingUser = $userModel->find($id);

        if (!$existingUser) {
            $response = [
                'status' => 404,
                'error' => 'User not found',
                'messages' => [
                    'fail' => 'Resource not found',
                ],
            ];
            return $this->respond($response, 404);
        }

        $newUsername = $this->request->getVar('userName');
        $existingUserWithSameUsername = $userModel->where('userName', $newUsername)
                                                ->where('userId !=', $id)
                                                ->first();

        if ($existingUserWithSameUsername) {
            $response = [
                'status' => 409,
                'error' => null,
                'fail' => 'Username already exists!',
            ];
            return $this->respond($response, 409);
        }
        
        $data = [
            'userName' => $this->request->getVar('userName'),
            'userAddress' => $this->request->getVar('userAddress'),
            'userEmail' => $this->request->getVar('userEmail'),
        ];

        $userModel->update($id, $data);

        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'asdfasdf',
            ],
        ];
        return $this->respond($response);
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        $response = [
            'status' => 204,
            'error' => null,
            'messages' => [
                'success' => 'Removed User Successfully!',
            ],
        ];
        return $this->respond($response);        
    }

    public function logout()
    {
        $session = \Config\Services::session();
        $response = [
            'redirect' => '/login',
        ];
        $session->destroy();
        return $this->respond($response);
    }
}