# Modular Mean

*Note: Modular Mean is a work in progress you can expect it to be broken in important ways. It should not be used in production, or maybe at all.*

A boilerplate for MEAN stack projects that uses a modular style to encapsulate related code and tests in the same directories.

## Goals

* Shallow directory structure
* 4 space tabs in JS and HTML for legibility
* Consistent and helpful naming of files and folders -- I don't ever want to wonder if I'm editing the right file, and I don't want to be looking for things
* Browserify all the things: working on server-side code should feel just like working on font-end code and vice-versa
* Test all the things: tests should be easy to make and easy to run
* Scalability: the directory structure should be able to grow large-ish without resorting to different structures

## Directory Structure

The basic idea is to mirror the directory structure in the front-end and the backend.

The api/ directory holds the Node/Express backend. API routes and initialization are handled by the app.js file in the root directory. Each subdirectory of api/ is named using SnakeCase.

The client/ directory holds the AngularJS code. Notice how similar it is to api/? There is also a test/build/ directory nested in client/: this is where Gulp places test files after processing with Browserify so they can be read by Karma.

The public/ directory is where Gulp places the AngularJS code from client/ after it's been processed. The nested SnakeCase-named folders in public/ only contain view.html files. All .js files are combined into a single file called bundle.js that lives in the root of public/.

```
modular-mean
|- api
    |- MyModule
        |- test
    |- MyOtherModule
        |- test
|- client
    |- MyModule
        |- test
    |- MyOtherModule
        |- test
    |- sass
    |- images
    |- helpers
|- public
    |- css
    |- js
    |- images
    |- MyModule
    |- MyOtherModule
```


## Naming things

Consistency and legibility is the goal here.

### Directory naming conventions

* Modules should be named in SnakeCase.

### File naming conventions

It should be very easy to tell files apart. The best way to do this to give them unique and descriptive names, but don't stray to far from conventions that it's confusing. I can already tell I'm going to have a hard time not getting too clever. Right now I'm liking the moduleName.nameOfUse.js convention but I'm more used to Angular files like myModuleCtrl.js. This is subject to change, but here's a first go:

* Node file names should reflect the module they belong to and their place in the MVC structure:

        MyModule/
        |- myModule.js
        |- myModule.controller.js
        |- myModule.model.js

* Angular script file names should reveal their use in four-letter abbreviations:

        MyModule/
        |- myModule.ctrl.js
        |- myModule.srvc.js
        |- myModule.drct.js

* Angular views should identify the module they belong to and the name of the route:

        myModule.myPage.html

## Thanks to these other great projects:

Gulp config and Browserify usage was inspired by [Frickle](https://github.com/Hyra/Frickle).

These two blog posts by Ben Lewis of QuickLeft were integral in understanding testing with Browserify:
* [Setting Up A JS App With Gulp and Browserify](https://quickleft.com/blog/setting-up-a-clientside-javascript-project-with-gulp-and-browserify/)
* [AngularJS Unit Testing – For Real, Though](https://quickleft.com/blog/angularjs-unit-testing-for-real-though/)

[This article](https://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make) by Mark Meyer introduced me to the concept of modular front-end code. Then [this talk at ng-conf](https://www.youtube.com/watch?v=hG-ARy0oqjI) by John Papa about Angular style sealed the deal. The [angular-seed](https://github.com/angular/angular-seed) project has been an important resource in this regard as well.

This article inspired the [client-side authentication](http://arthur.gonigberg.com/2013/06/29/angularjs-role-based-auth/) I'm using.
