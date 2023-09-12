<?php

namespace tests\unit\models;

use app\models\Product;

class ProductTest extends \Codeception\Test\Unit
{

    // Test the validation rules of the Product model
    public function testValidationRules()
    {
        $product = new Product();

        // Test that required attributes are validated correctly
        $this->assertFalse($product->validate()); // No attributes set, validation should fail

        $product->name = 'Test Product';
        $product->description = 'Test Description';
        $product->price = 9.99;
        $this->assertTrue($product->validate()); // All required attributes set, validation should pass

        // Test that 'price' attribute is validated as a number
        $product->price = 'invalid_price';
        $this->assertFalse($product->validate()); // Invalid price, validation should fail

        // Test that 'name' and 'description' attributes have maximum length of 255 characters
        $product->name = str_repeat('a', 256);
        $product->description = str_repeat('b', 256);
        $this->assertFalse($product->validate()); // Name and description too long, validation should fail
    }

    // Test the attribute labels of the Product model
    public function testAttributeLabels()
    {
        $product = new Product();

        $expectedLabels = [
            'id' => 'ID',
            'name' => 'Name',
            'description' => 'Description',
            'price' => 'Price',
            'createdAt' => 'Created At',
        ];

        $this->assertEquals($expectedLabels, $product->attributeLabels());
    }
}