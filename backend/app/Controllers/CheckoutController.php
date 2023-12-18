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

    public function receipt($userId = null)
    {
        $user = new UserModel();
        $user = $user->where('userId', $userId)->select('userName')->find();
        $userName = $user[0]['userName'];
    
        $receipt = new CheckOutModel();
        $receipts = $receipt->where('customer', $userId)->findAll();
    
        $filteredReceipts = array_filter($receipts, function ($receipt) use ($userId) {
            return $receipt['customer'] == $userId;
        });

        $decodedItems = [];
        foreach ($filteredReceipts as $receipt) {
            $items = json_decode($receipt['items'], true);
            $decodedItems[] = [
                'receiptnumber' => $receipt['receiptnumber'],
                'customer' => $userName,
                'items' => $items,
                'subtotal' => $receipt['subtotal'],
                'datetime_added' => $receipt['datetime_added'],
                'datetime_processed' => $receipt['datetime_processed'],
                'is_processed' => $receipt['is_processed'],
                'return_reason' => $receipt['return_reason']
            ];
        }
    
        $response = [
            'status' => 200,
            'receipts' => $decodedItems,
        ];
        return $this->respond($response);
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

    public function process($id)
    {
        $main = new CheckOutModel();
    
        // Check if the record exists
        $existingData = $main->where('receiptnumber', $id)->first();
        if (!$existingData) {
            $response = [
                'status' => 404,
                'error' => 'Record not found',
                'messages' => 'Record not found for processing',
                'data' => null
            ];
            return $this->respond($response);
        }
        try {
            $toUpdate = [
                'is_processed' => $existingData['is_processed'] == 'PROCESSING' ? 'TO PICK UP' : ($existingData['is_processed'] == 'TO PICK UP' ? 'COMPLETE' : $existingData['is_processed']),
                'datetime_processed' => date('Y-m-d H:i:s')
            ];
            $main->update(['receiptnumber' => $id],$toUpdate);
            $updated = $main->where('receiptnumber', $id)->first();
            $response = [
                'status' => 204,
                'error' => null,
                'messages' => 'Record Successfully Processed',
                'data' => $updated['is_processed']
            ];
        } catch (\Exception $e) {
            $response = [
                'status' => 500,
                'error' => 'Internal Server Error',
                'messages' => 'Error processing the record',
                'data' => null
            ];
        }
    
        return $this->respond($response);
    }    

    public function return ($id = null)
    {
        $main = new CheckOutModel();
        // $data = $main->where('receiptnumber', $id)->first();
        $main->update(['receiptnumber',$id],['return_reason' => $this->request->getVar('reason'), 'is_processed' => 'TO RETURN']);
        $response = [
            'status' => 200,
            'message' => 'Successfully Submitted'
        ];
        return $this->respond($response);
    }

    public function cancel ($id = null)
    {
        $main = new CheckOutModel();
        $main->update(['receiptnumber',$id],['return_reason' => null, 'is_processed' => 'COMPLETE']);
        $response = [
            'status' => 200,
            'message' => 'Return Request Cancelled'
        ];
        return $this->respond($response);
    }

    public function accept ($id = null)
    {
        $main = new CheckOutModel();
        $main->update(['receiptnumber',$id],['is_processed' => 'REPLACED']);
        $response = [
            'status' => 200,
            'message' => 'Return Accepted'
        ];
        return $this->respond($response);
    }
    public function deny ($id = null)
    {
        $main = new CheckOutModel();
        $main->update(['receiptnumber',$id],['is_processed' => 'RETURN DENIED']);
        $response = [
            'status' => 200,
            'message' => 'Return Denied'
        ];
        return $this->respond($response);
    }
}
