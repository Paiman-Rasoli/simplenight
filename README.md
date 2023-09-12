## Welcome to the simplenight technical test.
This repo has 2 backend services (1- Yii framework 2- NestJs framework) for products and one React for frontend application.
### Project structure
```
├── app/
│   ├── services/
│   │   ├── product-nest
│   │   ├── product-yii
│   │   
│   └── web/  
|── README.md
```
### How to Run YII app?

navigate to `app/services/product-yii` and run with `php -S localhost:8080`.but before running first update the database config in `config/db.php` and run the migration using `./yii migrate`;

### Run Frontend?
Navigate to `app/web` and run `yarn install --frozen-lockfile` after installing the packages the you can run the app by `yarn start`

### Do you want use NestJs?
so, now stop the `YII` framework and navigate to `app/services/product-nest`.
run the `yarn install --frozen-lockfile` to install the packages.
then navigate to `libs/module-base/config/envs` and update `dev.env` and put your own db config.
then run the migration using `yarn run typeorm:run-migrations:dev` it will create the table for you.
now run `yarn start:dev` you should see the log in your cmd.

Note: in order to frontend use `NestJs` go to `.env` in web or `constants` folder and update the `SERVICE_TYPE=NEST` and now frontend send request to NestJs backend app.

### A short video 😊.

[d53f9a40-c75f-41f4-82d0-f33301a5c050.webm](https://github.com/Paiman-Rasoli/simplenight/assets/83835010/0443972c-a89c-45d2-838c-d5c7fbdba24d)
