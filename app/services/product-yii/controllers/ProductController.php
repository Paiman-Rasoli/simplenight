<?php

namespace app\controllers;

use yii\rest\ActiveController;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;

class ProductController extends ActiveController {
      public $modelClass = 'app\models\Product';

      public function behaviors() {
          return ArrayHelper::merge([
             [
                'class' => Cors::class,
                'cors' => [
                  'Origin' => ['http://localhost:3000'],
                  'Access-Control-Request-Method' => ['GET', 'HEAD', 'PUT', "DELETE","POST"],
                ]
             ],
            ], parent::behaviors());
      }
}