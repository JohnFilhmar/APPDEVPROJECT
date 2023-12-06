<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ProductModel;

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
            'image' => 'required',
            'category' => 'required',
            'compatibility' => 'required',
            'marketprice' => 'required',
            'boughtprice' => 'required',
            'sellingprice' => 'required',
            'initialquantity' => 'required',
            'currentquantity' => 'required',
            'branch' => 'required',
            'lastdateupdated' => 'required',
            'supplier' => 'required',
        ];

        $data = [
            'itemname' => $this->request->getVar('itemname'),
            'category' => $this->request->getVar('category'),
            'compatibility' => $this->request->getVar('compatibility'),
            'marketprice' => $this->request->getVar('marketprice'),
            'boughtprice' => $this->request->getVar('boughtprice'),
            'sellingprice' => $this->request->getVar('sellingprice'),
            'initialquantity' => $this->request->getVar('initialquantity'),
            'currentquantity' => $this->request->getVar('currentquantity'),
            'branch' => $this->request->getVar('branch'),
            'lastdateupdated' => $this->request->getVar('lastdateupdated'),
            'supplier' => $this->request->getVar('supplier'),
        ];
        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        $main = new ProductModel();
        $findById = $main->find(['id' => $id]);
        if(!$findById) return $this->failNotFound('No record found');
        $main = new ProductModel();
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
}
