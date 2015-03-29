# Modular Mean

*Note: Modular Mean is a work in progress you can expect it to be broken in important ways. It should not be used in production, or maybe at all.*

A boilerplate for MEAN stack projects that uses a modular style to encapsulate related code and tests in the same directories.

## Goals

* Shallow directory structure
* 4 space tabs in JS and HTML for legibility
* Consistent naming of files and folders
* Intelligent naming of files and folders -- I don't ever want to wonder if I'm editing the right file, and I don't want to be looking for things
* Browserify all the things: working on server code should feel just like working on font-end code and vice-versa
* Test all the things: tests should be easy to make and easy to run
* Scalability: the directory structure should be able to grow large-ish without resorting to different structures

## Directory Structure

*Note: this is more of a roadmap than a current reality.*

The basic idea is to mirror the directory structure in the front-end and the backend.

The api/ directory holds the Node/Express backend. API routes and initialization are handled by the server.js file in the root directory. Each subdirectory of api/ is named using SnakeCase. The leading capital letter is important for two reasons: it helps me find things with a quick visual scan, and it helps Gulp find test files and views for processing.

The client/ directory holds the AngularJS code. Notice how similar it is to api/. There is also a test/build/ directory nested in client/: this is where Gulp places test files after processing with Browserify so they can be read by Karma.

The public/ directory is where Gulp places the AngularJS code from client/ after it's been processed. The nested SnakeCase-named folders in public/ only contain view .html files. All .js files are combined into a single file that lives in the root of public/.

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
    |- test
        |- build
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

* Modules should be named in SnakeCase

### File naming conventions

It should be very easy to tell files apart. The best way to do this to give them unique and descriptive names, but don't stray to far from conventions that it's confusing. I can already tell I'm going to have a hard time not getting too clever. Right now I'm liking the moduleName.nameOfUse.js convention but I'm more used to Angular files like myModuleCtrl.js. This is subject to change, but here's a first go:

* Node file names should reflect the module they belong to and their place in the MVC structure:
    myModule.js myModule.controller.js myModule.model.js
* Angular file names should reveal their use:
    myModule.ctrl.js myModule.service.js myModule.directive.js myModule.myPage.html

## Thanks to these other great projects:

Modular Mean borrows heavily from [Frickle](https://github.com/Hyra/Frickle).

It also integrates a many ideas about Browserify usage from Ben Lewis as found on the [QuickLeft](https://quickleft.com/blog/setting-up-a-clientside-javascript-project-with-gulp-and-browserify/) blog.
