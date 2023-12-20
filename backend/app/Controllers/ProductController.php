<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ProductModel;
use App\Models\ProductHistoryModel;

class ProductController extends BaseController
{
    use ResponseTrait;
    public function index()
    {
        $main = new ProductModel();
        $data = $main->findAll();
        return $this->respond($data);
    }
    public function show($id = null)
    {
        $main = new ProductModel();
        $data = $main->find(['id' => $id]);
        if(!$data) return $this->failNotFound('No record found');
        return $this->respond($data[0]);
    }
    public function create()
    {
        helper(['form']);
        $rules = [
            'itemname' => 'required',
            'image' => 'uploaded[image]',
            'category' => 'required',
            'compatibility' => 'required',
            'marketprice' => 'required',
            'boughtprice' => 'required',
            'sellingprice' => 'required',
            'initialquantity' => 'required',
            'branch' => 'required',
            'lastdateupdated' => 'required',
            'supplier' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $file = $this->request->getFile('image');
        $fileName = $file->getClientName();
        if ($file->isValid() && !$file->hasMoved()) {
            $file->move(ROOTPATH . 'public/uploads', $file->getName());
            $data = [
                'itemname' => $this->request->getVar('itemname'),
                'image' => $fileName,
                'category' => $this->request->getVar('category'),
                'compatibility' => $this->request->getVar('compatibility'),
                'marketprice' => $this->request->getVar('marketprice'),
                'boughtprice' => $this->request->getVar('boughtprice'),
                'sellingprice' => $this->request->getVar('sellingprice'),
                'initialquantity' => $this->request->getVar('initialquantity'),
                'currentquantity' => $this->request->getVar('initialquantity'),
                'branch' => $this->request->getVar('branch'),
                'lastdateupdated' => $this->request->getVar('lastdateupdated'),
                'supplier' => $this->request->getVar('supplier'),
            ];

            $main = new ProductModel();
            $main->save($data);
            $response = [
                'status' => 201,
                'error' => null,
                'redirect' => '/dashboard',
                'messsages' => 'success',
            ];
            return $this->respondCreated($response);
        }

        return $this->fail('File upload failed.');
    }
    public function update($id = null)
    {
        helper(['form']);
        $rules = [
            'itemname' => 'required',
            'category' => 'required',
            'compatibility' => 'required',
            'marketprice' => 'required',
            'boughtprice' => 'required',
            'sellingprice' => 'required',
            'currentquantity' => 'required',
        ];

        $data = [
            'itemname' => $this->request->getVar('itemname'),
            'category' => $this->request->getVar('category'),
            'compatibility' => $this->request->getVar('compatibility'),
            'marketprice' => $this->request->getVar('marketprice'),
            'boughtprice' => $this->request->getVar('boughtprice'),
            'sellingprice' => $this->request->getVar('sellingprice'),
            'currentquantity' => $this->request->getVar('currentquantity'),
            'lastdateupdated' => date('Y-m-d H:i:s'),
        ];
        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        $main = new ProductModel();
        $findById = $main->find(['id' => $id]);
        if(!$findById) return $this->failNotFound('No record found');
        $history = new ProductHistoryModel();
        $stat = $findById[0]['currentquantity'] > $this->request->getVar('currentquantity') ? "OUTBOUND" : "INBOUND";
        $bind = [
            'item_id' => $id,
            'prev_quantity' => $findById[0]['currentquantity'],
            'new_quantity' => $this->request->getVar('currentquantity'),
            'status' => $stat,
        ];
        $history->save($bind);
        $main->update($id, $data);
        $response = [
            'status' => 201,
            'error' => null,
            'messsages' => [
                'success' => 'Data Updated'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function delete($id = null)
    {
        $main = new ProductModel();
        $findById = $main->find(['id' => $id]);
        if(!$findById) return $this->failNotFound('No record found');
        $main = new ProductModel();
        $main->delete($id);
        $response = [
            'status' => 201,
            'error' => null,
            'messsages' => [
                'success' => 'Data Deleted'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function add($id)
    {
        $main = new ProductModel();
        $data = $main->where('id',$id)->first();
        $main->update(['id' => $id], ['currentquantity' => ((int)$data['currentquantity']) + 1]);
        $new = $main->where('id',$id)->first();
        $history = new ProductHistoryModel();
        $bind = [
            'item_id' => $id,
            'prev_quantity' => $data['currentquantity'],
            'new_quantity' => $new['currentquantity'],
            'status' => "INBOUND",
        ];
        $history->save($bind);
        $response = [
            'status' => 201,
            'error' => null,
            'messsages' => [
                'success' => 'Data Updated'
            ],
            'newQuantity' => $new['currentquantity']
        ];
        return $this->respondCreated($response);
    }
    public function decrease($id)
    {
        $main = new ProductModel();
        $data = $main->where('id',$id)->first();
        $main->update(['id' => $id], ['currentquantity' => ((int)$data['currentquantity']) - 1]);
        $new = $main->where('id',$id)->first();
        $history = new ProductHistoryModel();
        $bind = [
            'item_id' => $id,
            'prev_quantity' => $data['currentquantity'],
            'new_quantity' =>$new['currentquantity'],
            'status' => "OUTBOUND",
        ];
        $history->save($bind);
        $response = [
            'status' => 201,
            'error' => null,
            'messsages' => [
                'success' => 'Data Updated'
            ],
            'newQuantity' => $new['currentquantity']
        ];
        return $this->respondCreated($response);
    }

    public function history($id)
    {
        $history = new ProductHistoryModel();
        $data = $history->where(['item_id' => $id])->findAll();
        return $this->respond($data);
    }
}