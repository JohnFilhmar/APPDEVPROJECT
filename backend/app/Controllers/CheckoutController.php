<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\CheckOutModel;
use App\Models\UserModel;
use App\Models\ProductModel;

class CheckoutController extends BaseController
{
    use ResponseTrait;
    public function index()
    {
        $main = new CheckOutModel();
        $user = new UserModel();
        
        $data = $main->findAll();
        $users = $user->findAll();

        // Create a mapping of userId to user data for easier lookup
        $userMap = [];
        foreach ($users as $userData) {
            $userMap[$userData['userId']] = $userData;
        }

        // Combine data from both models
        $combinedData = [];
        foreach ($data as $checkout) {
            $userId = $checkout['customer'];
            $user = $userMap[$userId] ?? null;

            if ($user) {
                $combinedData[] = [
                    'receiptnumber' => $checkout['receiptnumber'],
                    'userName' => $user['userName'],
                    'userAddress' => $user['userAddress'], // Adjust this based on your actual user data structure
                    'items' => json_decode($checkout['items'], true),
                    'subtotal' => $checkout['subtotal'],
                    'datetime_added' => $checkout['datetime_added'],
                    'datetime_processed' => $checkout['datetime_processed'],
                    'is_processed' => $checkout['is_processed'],
                ];
            }
        }
        return $this->respond($combinedData);
    }
    
    public function show($userId = null)
    {
        $main = new CheckOutModel();
        $user = new UserModel();

        $data = $main->findAll();
        $users = $user->findAll();

        // Create a mapping of userId to user data for easier lookup
        $userMap = [];
        foreach ($users as $userData) {
            $userMap[$userData['userId']] = $userData;
        }

        // Combine data from both models
        $combinedData = [];
        foreach ($data as $checkout) {
            $customerId = $checkout['customer'];

            // Check if the customer ID matches the requested user ID
            if ($customerId == $userId) {
                $user = $userMap[$customerId] ?? null;

                if ($user) {
                    $combinedData[] = [
                        'receiptnumber' => $checkout['receiptnumber'],
                        'userName' => $user['userName'],
                        'userAddress' => $user['userAddress'], // Adjust this based on your actual user data structure
                        'items' => json_decode($checkout['items'], true),
                        'subtotal' => $checkout['subtotal'],
                        'datetime_added' => $checkout['datetime_added'],
                        'datetime_processed' => $checkout['datetime_processed'],
                        'is_processed' => $checkout['is_processed'],
                    ];
                }
            }
        }
        return $this->respond($combinedData);
    }
    
    public function create()
    {
        helper(['form']);
        $rules = [
            'customer' => 'required',
            'items' => 'required',
            'subtotal' => 'required',
        ];
    
        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }
    
        $data = [
            'customer' => $this->request->getVar('customer'),
            'items' => $this->request->getVar('items'),
            'subtotal' => $this->request->getVar('subtotal'),
            'is_processed' => 'PROCESSING',
        ];
    
        $main = new CheckOutModel();
        $main->save($data);
    
        $response = [
            'status' => 201,
            'error' => null,
            'messsages' => 'success',
        ];
    
        $products = new ProductModel();
        $multipleItems = json_decode($data['items'], true);
    
        foreach ($multipleItems as $item) {
            $itemId = $item['id'];
            $quantity = $item['quantity'];
    
            // Fetch the product record
            $product = $products->find($itemId);
    
            // Update the current quantity based on the checked-out quantity
            if ($product) {
                $currentQuantity = $product['currentquantity'] - $quantity;
                $products->update($itemId, ['currentquantity' => $currentQuantity]);
            }
        }
    
        return $this->respondCreated($response);
    }    
    
    public function delete($id)
    {
        $main = new CheckOutModel();
        $main->delete($id);
        $response = [
            'status' => 204,
            'error' => null,
            'messsages' => 'Record Successfully Deleted',
        ];
        return $this->respond($response);
    }
}
