<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ChatsModel;
use App\Models\UserModel;

class ChatController extends BaseController
{
    use ResponseTrait;
    public function index()
    {
        $main = new ChatsModel();
        $data = $main->findAll();

        $userModel = new UserModel();
        $newResponse = [];

        foreach ($data as $chat) {
            $sender = $userModel->where('userId', $chat['sender_id'])->first();
            $receiver = $userModel->where('userId', $chat['receiver_id'])->first();

            $newResponse[] = [
                'message_id' => $chat['message_id'],
                'sender' => $sender['userName'],
                'receiver' => $receiver['userName'],
                'message' => $chat['message'],
                'datetime_sent' => $chat['datetime_sent']
            ];
        }
        return $this->respond($newResponse);
    }
    public function create()
    {
        helper(['form']);
        $rules = [
            'sender' => 'required',
            'receiver' => 'required',
            'message' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $main = new ChatsModel();
        $userModel = new UserModel();

        $senderName = $this->request->getVar('sender');
        $receiverName = $this->request->getVar('receiver');
        $message = $this->request->getVar('message');

        $sender = $userModel->where('userName', $senderName)->first();
        $sender_id = $sender['userId'];
        $receiver = $userModel->where('userName', $receiverName)->first();
        $receiver_id = $receiver['userId'];

        $data = [
            'sender_id' => $sender_id,
            'receiver_id' => $receiver_id,
            'message' => $message,
        ];

        $main->save($data);

        $response = [
            'status' => 200,
            'error' => null,
            'messages' => 'Message Sent',
        ];

        return $this->respond($response);
    }
}
