<?php

namespace app\controllers;

use yii\rest\ActiveController;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;

class ProductController extends ActiveController {
      public $modelClass = 'app\models\Product';

      public function behaviors() {
          return ArrayHelper::merge(parent::behaviors(),[
             [
                'class' => Cors::class,
                'cors' => [
                  'Origin' => ['*'],
                  'Access-Control-Request-Method' => ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
                  'Access-Control-Allow-Headers' => ['Content-Type', 'Authorization'],
                ]
             ],
            ]);
      }
}