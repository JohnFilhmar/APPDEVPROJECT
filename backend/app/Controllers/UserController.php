<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
// use \Firebase\JWT\JWT;

class UserController extends BaseController
{
    use ResponseTrait;
    public function index()
    {
        $main = new UserModel();
        $data = $main->findAll();
        return $this->respond($data);
    }
    
    public function show($userId = null)
    {
        $main = new UserModel();
        $data = $main->where('userId' , $userId)->first();
        return $this->respond($data);
    }

    public function authenticate()
    {
        helper(['form']);
        $session = \Config\Services::session();

        $rules = [
            'userName' => 'required',
            'userPassword' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $userName = $this->request->getVar('userName');
        $userPassword = $this->request->getVar('userPassword');

        $session->set('userName',$userName);

        $userModel = new UserModel();
        $user = $userModel->where('userName', $userName)->first();

        if ($user && password_verify($userPassword, $user['userPassword'])) {
            if($user['state']){
                $session->set('userId',$user['userId']);
                $timezone = new \DateTimeZone('Asia/Manila');
                $date = new \DateTime('now', $timezone);
                $userModel->set('last_activity', $date->format('Y-m-d H:i:s'))->where('userId', $session->get('userId'))->update();                
                $response = [
                    'status' => 200,
                    'error' => null,
                    'redirect' => $user['userRole'] == 'ADMIN' ? '/dashboard' : ($user['userRole'] == 'CASHIER' ? '/ecomm' : '/ecomm'),
                    'userId' => $user['userId'],
                    'userRole' => $user['userRole'],
                    'userName' => $user['userName'],
                    'userEmail' => $user['userEmail'],
                ];
                return $this->respondCreated($response);
            } else {
                $response = [
                    'status' => 401,
                    'error' => 'Invalid credentials',
                    'messages' => [
                        'error' => 'Your account is down',
                    ],
                ];
                return $this->respondCreated($response);
            }
        } else {
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
        $role = $this->request->getVar('userRole') == 'ADMINISTRATOR' ? "ADMIN" : ($this->request->getVar('userRole') == "CASHIER" ? "CASHIER" : "USER");
        $data = [
            'userName' => $this->request->getVar('userName'),
            'userPassword' => password_hash($this->request->getVar('userPassword'), PASSWORD_DEFAULT),
            'userRole' => $role,
            'state' => $role == 'ADMIN' ? 1 : 0,
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
        $existingUserWithSameUsername = $userModel->where('userName', $newUsername)->where('userId !=', $id)->first();

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
        
        $user = $userModel->where('userName', $this->request->getVar('userName'))->first();
        if(password_verify($this->request->getVar('userPassword'), $user['userPassword']))
        {
            $userModel->update($id, $data);
    
            $response = [
                'status' => 200,
                'error' => null,
                'messages' => [
                    'success' => 'User Updated',
                ],
            ];
            return $this->respond($response);
        } else {
            $response = [
                'status' => 401,
                'error' => 'Invalid credentials',
                'messages' => [
                    'error' => 'Invalid password',
                ],
            ];
            return $this->respond($response);
        }
    }
    
    public function delete($id)
    {
        $main = new UserModel();
        $main->delete($id);
        $response = [
            'status' => 204,
            'error' => null,
            'message' => 'Removed User Successfully!',
        ];
        return $this->respond($response);        
    }
    public function uploadimage($id)
    {
        $response = [];    
        $main = new UserModel();
        $fileName = $main->select('userImage')->find($id);
        if ($fileName == null) {
            $response = [
                'status' => 404,
                'error' => 'User not found.',
            ];
        } else {
            $filePath = FCPATH . 'uploads\\users\\' . $fileName['userImage'];
            $exists = file_exists($filePath);
    
            if ($exists && $fileName['userImage'] != null) {
                if (unlink($filePath)) {
                    $response = $this->updateUserImage($id);
                } else {
                    $response = $this->updateUserImage($id);
                }
            } else {
                $response = $this->updateUserImage($id);
            }
        }
        return $this->respond($response);
    }
    
    private function updateUserImage($id)
    {
        $file = $this->request->getFile('userImage');
        
        if ($file->isValid() && !$file->hasMoved()) {
            $file->move(ROOTPATH . 'public/uploads/users/', $file->getName());
            $data = [
                'userImage' => $file->getName(),
            ];
    
            $main = new UserModel();
            $main->update($id, $data);
    
            $response = [
                'status' => 201,
                'error' => null,
                'redirect' => '/dashboard',
                'messages' => 'User Image Updated!',
                'userImage' => $file->getName(),
            ];
            return $response; 
        }
        return [
            'status' => 400,
            'error' => 'File upload failed.',
        ];
    }

    public function changeState($id)
    {
        $main = new UserModel();
        $user = $main->where('userId',$id)->first();
        $main->update($id,['state' => $user['state'] == '1'? '0' : '1']);
        $response = [
            'status' => 201,
            'error' => null,
            'message' => $user['state'] == '1'? 'User Account State Changed from UP to DOWN' : 'User Account State Changed from DOWN to UP',
        ];
        return $this->respond($response);
    }

    public function logout()
    {
        $session = \Config\Services::session();
        $response = [
            'redirect' => '/login',
            'userId' => $session->get('userId')
        ];
        $userModel = new UserModel();
        $timezone = new \DateTimeZone('Asia/Manila');
        $date = new \DateTime('now', $timezone);
        $userModel->set('last_activity', $date->format('Y-m-d H:i:s'))->where('userId', $session->get('userId'))->update();
        $session->destroy();
        return $this->respond($response);
    }

    public function financialTransactionsSummary()
    {
        $db      = \Config\Database::connect();
        // $query = "
        // -- Daily Loss and Income
        // SELECT
        //     SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) AS daily_loss,
        //     SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS daily_income
        // FROM
        //     financial_transactions
        // WHERE
        //     DATE(datetime_added) = CURDATE()
        // GROUP BY
        //     DATE(datetime_added);

        // -- Monthly Loss and Income
        // SELECT
        //     SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) AS monthly_loss,
        //     SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS monthly_income
        // FROM
        //     financial_transactions
        // WHERE
        //     YEAR(datetime_added) = YEAR(CURDATE()) AND MONTH(datetime_added) = MONTH(CURDATE())
        // GROUP BY
        //     DATE_FORMAT(datetime_added, '%Y-%m');

        // -- Yearly Loss and Income
        // SELECT
        //     SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) AS yearly_loss,
        //     SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS yearly_income
        // FROM
        //     financial_transactions
        // WHERE
        //     YEAR(datetime_added) = YEAR(CURDATE())
        // GROUP BY
        //     YEAR(datetime_added);
        // ";
        // $results = $db->query($query);
        $dailyQuery = "
            SELECT
                SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) AS daily_loss,
                SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS daily_income
            FROM
                financial_transactions
            WHERE
                DATE(datetime_added) = CURDATE()
            GROUP BY
                DATE(datetime_added);
        ";
        $dailyResults = $db->query($dailyQuery);
        $monthlyQuery = "
            SELECT
                SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) AS monthly_loss,
                SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS monthly_income
            FROM
                financial_transactions
            WHERE
                YEAR(datetime_added) = YEAR(CURDATE()) AND MONTH(datetime_added) = MONTH(CURDATE())
            GROUP BY
                DATE_FORMAT(datetime_added, '%Y-%m');
        ";
        $monthlyResults = $db->query($monthlyQuery);
        $yearlyQuery = "
            SELECT
                SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) AS yearly_loss,
                SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS yearly_income
            FROM
                financial_transactions
            WHERE
                YEAR(datetime_added) = YEAR(CURDATE())
            GROUP BY
                YEAR(datetime_added);
        ";
        $yearlyResults = $db->query($yearlyQuery);
        $response = [
            'results' => $yearlyResults
        ];
        return $this->respond($response);
    }    
}
