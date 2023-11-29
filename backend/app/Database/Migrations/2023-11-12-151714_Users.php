<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Users extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'userId' => [
                'type' => 'INT',
                'constraint' => 5,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'userName' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
            ],
            'userPassword' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
            ],
            'userImage' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => true,
            ],
            'userAddress' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => true,
            ],
            'userEmail' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => true,
            ],
            'userRole' => [
                'type' => 'VARCHAR',
                'constraint' => 50,
            ],
            'date_added DATETIME DEFAULT CURRENT_TIMESTAMP',
            'date_updated' => [
                'type' => 'DATE',
                'null' => true,
            ],
        ]);

        $this->forge->addKey('userId', true);
        $this->forge->createTable('users');
    }

    public function down()
    {
        $this->forge->dropTable('users');
    }
}
