<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%products}}`.
 */
class m230912_051548_create_products_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%products}}', [
            'id' => $this->primaryKey()->append("AUTO_INCREMENT"),
            'name' => $this->string(100),
            'description' => $this->string(),
            'price' => $this->float()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%products}}');
    }
}
