<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Checkout extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'receiptnumber' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'customer' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
            ],
            'items' => [
                'type' => 'JSON',
            ],
            'subtotal' => [
                'type' => 'DECIMAL',
                'constraint' => '10,2',
            ],
            'datetime_added DATETIME DEFAULT CURRENT_TIMESTAMP',
            'datetime_processed' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'is_processed' => [
                'type' => 'VARCHAR',
                'constraint' => 20,
            ],
        ]);

        $this->forge->addKey('receiptnumber', true);
        $this->forge->addForeignKey('customer', 'users', 'userId');
        $this->forge->createTable('checkout');
    }

    public function down()
    {
        $this->forge->dropTable('checkout');
    }
}
