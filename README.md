<div>
	<img src="https://blog.4linux.com.br/wp-content/uploads/2018/01/Heroku.png" width="500" alt="Heroku" />
	<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png" width="200" alt="Angular" />
</div>

# Heroku Angular Deploy
How to do a angular project deploy in Heroku.

# Requirements
First of all, is necessary to have an angular project in the Github. The project can be unfinished, just put your project **in the root of the repository**. Im using my [Tour of Heroes project](https://github.com/LeonardoZanotti/Tour-of-Heroes) in this guide, he is uploaded in the root of this repo.

About the dependences, im using the following, but you can use the versions you use in your project:
* [Git](https://git-scm.com/downloads)
* [Angular 10.0.11](https://angular.io/guide/setup-local)
* [Node 13.14.0 and Npm 6.14.4](https://nodejs.org/en/)
* [A Heroku account](https://signup.heroku.com/)

# Deploy
With the project, lets configure this to do the deploy. First of all, configure the dependences on the `package.json` file, copy `@angular/cli`, `@angular/compiler-cli`, `@angular-devkit/build-angular` and `typescript` from **devDependencies** to **dependencies**. Now, lets set the node and npm versions, copy and paste this on the end of the package.json with the versions of your node/npm (you can use `node -v` and `npm -v` to discover the versions):
```bash
# How i said, im using this versions for node and npm, but you put yours
"engines": {
    "node": "13.14.0",
    "npm": "6.14.4"
  }
```
OK, yet in package.json, lets change the scripts. Change the start to `"start": "node server.js"` and add `"heroku-postbuild": "ng build --prod"`.

As example, my final package.json file looks like this:
```bash
{
  "name": "tour-of-heroes",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "node server.js",    # start script
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "heroku-postbuild": "ng build --prod"   # heroku script
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~10.0.9",
    "@angular/cdk": "^10.1.3",
    "@angular/cli": "~10.0.6",          # copied from devDependences
    "@angular/common": "~10.0.9",
    "@angular/compiler": "~10.0.9",
    "@angular/compiler-cli": "~10.0.9",     # copied from devDependences
    "@angular/core": "~10.0.9",
    "@angular-devkit/build-angular": "~0.1000.6",       # copied from devDependences
    "@angular/forms": "~10.0.9",
    "@angular/platform-browser": "~10.0.9",
    "@angular/platform-browser-dynamic": "~10.0.9",
    "@angular/router": "~10.0.9",
    "express": "^4.17.1",
    "path": "^0.12.7",
    "rxjs": "~6.5.5",
    "tslib": "^2.0.0",
    "typescript": "~3.9.5",         # copied from devDependences
    "zone.js": "~0.10.3"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~0.1000.6",
    "@angular/cli": "~10.0.6",
    "@angular/compiler-cli": "~10.0.9",
    "@types/node": "^12.11.1",
    "@types/jasmine": "~3.5.0",
    "@types/jasminewd2": "~2.0.3",
    "codelyzer": "^6.0.0",
    "jasmine-core": "~3.5.0",
    "jasmine-spec-reporter": "~5.0.0",
    "karma": "~5.0.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage-istanbul-reporter": "~3.0.2",
    "karma-jasmine": "~3.3.0",
    "karma-jasmine-html-reporter": "^1.5.0",
    "protractor": "~7.0.0",
    "ts-node": "~8.3.0",
    "tslint": "~6.1.0",
    "typescript": "~3.9.5"
  },
  "engines": {    # config this with your node and npm versions
    "node": "13.14.0",
    "npm": "6.14.4"
  }
}
```

Fine, now lets put our project in production mode with `ng build --prod`. After this, a `dist` folder should appear in the root and you can check with `ng serve --prod` the project running in production mode.

Now, lets install Express to be our server.
```bash
npm install express path --save
```

Create a `server.js` file in the root of your frontend project and copy the following inside the file (replace "NAME_OF_THE_PROJECT" with the name of your project):
```bash
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/NAME_OF_THE_PROJECT'));

app.get('/*', function(req,res) {


res.sendFile(path.join(__dirname+'/dist/NAME_OF_THE_PROJECT/index.html'));
});

app.listen(process.env.PORT || 8080);
```

Add all this changes to your Github repository and go to Heroku to do the deploy.

**If you have a .gitignore file, reminder to remove `/dist` from it**

# Heroku config
<img src="https://backefront.com.br/posts/heroku_integracao_github.png" alt="Heroku deploy">

In Heroku, click in "New", then type a name for your project and search him on Github. Then add the Automatic deploy and do the deploy.

## References
Thanks [SonaliPatel](https://www.geeksforgeeks.org/how-to-bundle-an-angular-app-for-production/) and [Victor Jordan](https://backefront.com.br/configurando-projeto-angular-heroku/) for this articles, helped a lot.

## LeonardoZanotti