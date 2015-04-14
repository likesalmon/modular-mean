# Modular Mean

*Note: Modular Mean is a work in progress you can expect it to be broken in important ways. It should not be used in production, or maybe at all.*

A boilerplate for MEAN stack projects that uses a modular style to encapsulate related code and tests in the same directories.

## Goals

* Shallow directory structure.
* 4 space tabs in JS and HTML for legibility.
* Consistent and helpful naming of files and folders. It should be easy to tell at a glance what a file is for and what part of the app it belongs to.
* Browserify all the things: working on server-side code should feel just like working on font-end code and vice-versa.
* Test all the things: tests should be easy to make and easy to run.
* Scalability: the directory structure should be able to grow large-ish without resorting to different structures.

## Directory Structure

The basic idea is to mirror the directory structure in the front-end and the backend.

The api/ directory holds the Node/Express backend. API routes and initialization are handled by the app.js file in the root directory. Each sub-directory of api/ is named using SnakeCase.

The client/ directory holds the AngularJS code. Notice how similar it is to api/?

The public/ directory is where Gulp builds the AngularJS code from client/ after it's been processed. The nested SnakeCase-named folders in public/ only contain view.html files. All .js files are combined into a single file called bundle.js that lives in the root of public/.

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
    |- images
    |- MyModule
    |- MyOtherModule
```


## Naming things

Consistency and legibility is the goal.

### Directory naming conventions

* Modules should be named in SnakeCase.

### File naming conventions

It should be very easy to tell what a file is for and what module it belongs to. They should have unique and descriptive names, without straying to far from conventions. Try not to be clever. The "moduleName.nameOfUse.js" convention works well:

* Node file names should reflect the module they belong to and their place in the MVC structure:

        MyModule/
        |- myModule.js
        |- myModule.controller.js
        |- myModule.model.js

* Angular script file names should reveal their use in four-letter abbreviations. Convention leans toward camelCase (such as "myModuleCtrl.js") but the dot syntax is working well for now:

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

Ben Clinkinbeard outlines a dead-simple way of organizing Browserify-ed Angular code in the [slides from his ng-conf talk](http://benclinkinbeard.com/talks/2014/ng-conf/#/). Bastian Krol elaborates on these concepts in [this blog post](https://blog.codecentric.de/en/2014/08/angularjs-browserify/).

This article inspired the [client-side authentication](http://arthur.gonigberg.com/2013/06/29/angularjs-role-based-auth/) I'm using.
