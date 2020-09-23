<div>
	<img src="https://blog.4linux.com.br/wp-content/uploads/2018/01/Heroku.png" width="250" alt="Heroku" />
	<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png" width="250" alt="Angular" />
</div>

# Heroku Angular Deploy
How to do a angular project deploy in Heroku.

**If you have a project just go to Deploy section.**

# Requirements
Im using the following, but you can use the versions you use in your project:
* [Composer 1.10.13](https://getcomposer.org/download/)
* [Git](https://git-scm.com/downloads)
* [Laravel 5.7.29](https://laravel.com/docs/5.8/installation)
* [MariaDB 10.4.13](https://mariadb.org/download/)
* [Node 13.14.0 and Npm 6.14.4](https://nodejs.org/en/)
* [PHP 7.4.10](https://www.php.net/downloads.php)
* [Vue 4.5.6](https://cli.vuejs.org/guide/installation.html)
* [Yarn 1.22.4](https://classic.yarnpkg.com/en/docs/install/#debian-stable)
* [A Heroku account](https://signup.heroku.com/)
* [And Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## Backend installation
If you dont have a project and just wants to know how to deploy a heroku application, you can clone this repository and use the sample project or create a new project with `composer create-project laravel/laravel your-backend-project-name`.

```bash
# CLone this project 
$ git clone https://github.com/LeonardoZanotti/heroku-deploy.git

# Enter the backend folder
$ cd backend/

# Install the dependences
$ composer install

# Enter mysql
$ sudo mysql -u root

# Create the database
$ create database capacitacao;

# Create an user (replace 'newuser' and 'user_password' with your credentials)
$ CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'user_password';

# Give permission to the user
$ GRANT ALL PRIVILEGES ON *.* TO 'newuser'@'localhost';

# Exit mysql
$ exit

# Clone the .env.example file to configure the database
$ cp .env.example .env

# .env configuration
$ nano .env

# Replace this infos with your credentials
"DB_DATABASE =  capacitacao"
"DB_USERNAME = your_user"
"DB_PASSWORD = your_password"

# Final configurations
$ php artisan key:generate
$ php artisan migrate:fresh --seed
$ php artisan storage:link
$ composer require laravel/passport
$ php artisan passport:install

# Run the project -> The Laravel page will be available on localhost:8000
$ php artisan serve
```

## Frontend installation
If you want to create your own frontend project do:
```bash
# Add the cli-init
$ yarn global add @vue/cli-init

# Create the nuxt project
$ vue init nuxt-community/starter-template your-frontend-project-name
```
Otherwise, just do the following:
```bash
# Enter the frontend folder
$ cd frontend/

# Install dependences
$ npm install

# Run the frontend -> The Vue page will be available on localhost:8080
$ npm run dev
```

## Deploy
Now, with a project, we can do the deploy. First, do the login in the heroku-cli with:
```bash
$ heroku login
```
Logged in, lets do the backend deploy.

**If your project has many branchs, remember to checkout to the branch that you wants to deploy.**

### Backend deploy
```bash
# Enter the backend folder
$ cd backend/

# If your project is already installed you can skip the configuration
# Install all dependences
$ composer install

# Clone and config the .env
$ cp .env.example .env
$ nano .env

"DB_DATABASE =  capacitacao"
"DB_USERNAME = your_user"
"DB_PASSWORD = your_password"

# Recreate database and install passport
$ php artisan migrate:fresh --seed
$ php artisan passport:install

# We need to initiate a repo in the backend folder, then
$ git init

# Configure .gitignore
$ nano .gitignore

# If you have a /storage/*.key in the .gitignore you should remove it. My gitignore:
/node_modules
/public/hot
/public/storage
/vendor
.env
.env.backup
.phpunit.result.cache
Homestead.json
Homestead.yaml
npm-debug.log
yarn-error.log

# Then commit this
$ git add .
$ git commit -m "Backend heroku"

# Now, we can create the heroku project. Attention! The name of the heroku project should be unique
$ heroku create unique-name

# Add a Procfile file. It will tells to heroku how to start the project
$ echo "web: vendor/bin/heroku-php-apache2 public/" > Procfile

# Commit the Procfile file
$ git add Procfile
$ git commit -m "Procfile added"

# Show the key
$ php artisan --no-ansi key:generate --show
# Showed the key base64:iOdzZzO7CN4BTNc2QEfSdEQqaq0XlI9xPFYgAIjp29o=

# Set Heroku key (Replace with your key)
$ heroku config:set APP_KEY=base64:iOdzZzO7CN4BTNc2QEfSdEQqaq0XlI9xPFYgAIjp29o=

# Push to heroku
$ git push heroku master

# Then, lets create the heroku database
$ heroku addons:create heroku-postgresql:hobby-dev

# You will need to get this infos in herokus site. When you log in and stay on the heroku dashboard, click on the project on heroku, then click on Resources and then on Heroku Postgres. A page will open. Then go to Settings and View Credentials. With the heroku credentials, replace this fields and do the command on terminal
$ heroku config:set DB_CONNECTION=pgsql DB_DATABASE=dd0km0st511bfe DB_HOST=ec2-23-23-228-132.compute-1.amazonaws.com DB_PASSWORD=5a85a810116a5a550af303a614560040373e79a3159db057d20b7fa8fc1682ec DB_PORT=5432 DB_USERNAME=ymqegxrfhhkxap

# Now, we just need to configure the heroku server, then lets enter the heroku bash
$ heroku run bash
$ php artisan migrate:fresh --seed
$ php artisan passport:install
$ exit

# Open the deploy link
$ heroku open
```

The backend site should open (if not, you can get the link in the heroku project). The site should show the laravel homepage (if is the sample project in this repo).

### Frontend
No worries, the hard part already gonne, this is easy peasy.
```bash
# Enter the frontend folder
$ cd ../frontend/

# Start a new repository and add the files
$ git init
$ git add .

# Create the heroku repository
$ heroku create new-unique-name

# Now, we will need open the package.json file in the frontend and add this
"engines" : {
    "node": "10.x.x",
    "npm": "6.4.1"
  }

# Then open the nuxt.config.js (or the file that refers the backend) and add this with target pointing to your backend link
proxy: {
    '/api/': { target: 'https://backend-herokudeploy.herokuapp.com/' }
  }

# Do some more configurations
$ heroku config:set NPM_CONFIG_PRODUCTION=false
$ heroku config:set HOST=0.0.0.0
$ heroku config:set NODE_ENV=production

# Commit and push to heroku
$ git add .
$ git commit -m "Frontend heroku"
$ git push heroku master

# And open the frontend link
$ heroku open
```
The frontend site should open (if not, you can get the link in the heroku project). The site should show the vuejs/nuxt homepage (if is the sample project in this repo).

Now, your application is on heroku with the back and frontend.

## Heroku Cheatsheet
`heroku create` : Create a heroku project <br />
`heroku config` : List the ambience variables <br />
`heroku logs` : Show the logs (--tail can be useful) <br />
`heroku open` : Open the deploy on the navigator <br />
`heroku run bash` : Open the herokus terminal <br />
`heroku restart` : Restart the application <br />
`heroku ps` : Show the dynos list and if the application is running <br />
`heroku apps:destroy <application>` : Delete the herokus application (need confirmation) <br />

## LeonardoZanotti