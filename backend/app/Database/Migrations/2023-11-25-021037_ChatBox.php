<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ChatBox extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'message_id' => [
                'type' => 'INT',
                'constraint' => 5,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'sender_id' => [
                'type' => 'INT',
                'constraint' => 5,
                'unsigned' => true,
            ],
            'receiver_id' => [
                'type' => 'INT',
                'constraint' => 5,
                'unsigned' => true,
            ],
            'message' => [
                'type' => 'TEXT',
            ],
            'datetime_sent DATETIME DEFAULT CURRENT_TIMESTAMP',
        ]);

        $this->forge->addKey('message_id', true);
        $this->forge->addForeignKey('sender_id', 'users', 'userId', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('receiver_id', 'users', 'userId', 'CASCADE', 'CASCADE');
        $this->forge->createTable('chat_messages');
    }

    public function down()
    {
        $this->forge->dropTable('chat_messages');
    }
}
