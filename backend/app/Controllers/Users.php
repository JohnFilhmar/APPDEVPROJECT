<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
use Config\Encryption;

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
            $session->set('accessibility',$user['userAccess']);
            $session->set('role',$user['userRole']);

            $response = [
                'status' => 200,
                'error' => null,
                'redirect' => '/dashboard',
                'access' => $session->get('accessibility'),
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
            return $this->respondCreated($response);
        }
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        //
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
            'userAccess' => 'required',
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
            'userAccess' => $this->request->getVar('userAccess'),
            'datecreated' => $this->request->getVar('dateCreated'),
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
    public function update($id = null)
    {
        //
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        //
    }

    public function logout()
    {
        $session = \Config\Services::session();
        $response = [
            'redirect' => '/login',
        ];
        $session->destroy();
        return $this->respondCreated($response);
        // $encrypter = \Config\Services::encrypter();
        // $encData = $encrypter->encrypt('HELLO');
        // return $this->respond($encData);
    }

    public function accessibility()
    {
        $session = \Config\Services::session();
        $encrypter = \Config\Services::encrypter();
        $access = $session->get('accessibility');
        $response = [
            'access' => $access
        ];
        $encData = $encrypter->encrypt('HELLO');
        return $this->respond($encData);
    }
}
