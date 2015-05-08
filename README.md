# Modular Mean

*Note: Modular Mean is a work in progress you can expect it to be broken in important ways. It should not be used in production, or maybe at all.*

A boilerplate for MEAN stack projects that uses a modular style to encapsulate related code and tests in the same directories.



## Quickstart

In the terminal, do:

    git clone git@github.com:likesalmon/modular-mean.git
    cd modular-mean/
    npm install
    npm start


## Development Quickstart

    git clone git@github.com:likesalmon/modular-mean.git
    cd modular-mean/
    npm install
    npm start
    npm run dev


## Detailed Startup Instructions for Centos7

Install the latest Git:

    yum groupinstall "Development Tools"
    yum install gettext-devel openssl-devel perl-CPAN perl-devel zlib-devel
    # see https://github.com/git/git/releases for the latest source code
    wget https://github.com/git/git/archive/v2.1.2.tar.gz -O git.tar.gz
    tar -zxf git.tar.gz
    cd git-*
    make configure
    ./configure --prefix=/usr/local
    sudo make install
    git config --global user.name "Your Name"
    git config --global user.email "you@example.com"


Install Curl:

    yum install curl-devel


Install Ruby and Compass:

    yum install ruby
    yum install gcc g++ make automake autoconf curl-devel openssl-devel zlib-devel httpd-devel apr-devel apr-util-devel sqlite-devel
    yum install ruby-rdoc ruby-devel
    yum install rubygems
    gem install json_pure
    gem install compass


Configure firewalld:
    
    systemctl start firewalld
    sudo firewall-cmd --permanent --zone=public --add-service=http 
    sudo firewall-cmd --permanent --zone=public --add-service=https
    sudo firewall-cmd --reload


Install Nginx:

    yum install epel-release
    yum install nginx
    # start Nginx
    systemctl start nginx.service
    # configure Nginx to start boot
    systemctl start nginx.service


Configure Nginx:

    # add this line to /etc/nginx/nginx.conf in the http block just below include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;

    cd /etc/nginx
    mkdir sites-available sites-enabled
    cd sites-available
    vim default

    # paste the following into /etc/nginx/sites-available/default, where example.com and APP_PRIVATE_IP_ADDRESS:port are the IP address or domain name of your server, :port is the port the node app runs on

    server {
        listen 80;

        server_name example.com;

        location / {
            proxy_pass http://APP_PRIVATE_IP_ADDRESS:8080;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }

    # enable the default site:

    ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
    systemctl restart nginx.service




Create a user:

    useradd -mrU myuser


*Note: The following should be run as myuser*

Install NodeJS locally via nvm:
    
    # see https://github.com/creationix/nvm for the latest release
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.1/install.sh | bash
    nvm ls-remote
    nvm install v0.10.38


Install the global dependenices:

    npm install -g express protractor karma-cli browserify gulp


And finally, build and start the app:

    git clone git@github.com:likesalmon/modular-mean.git
    cd modular-mean/
    npm install
    npm start


Bonus: Systemd Setup

    # create a service file in /etc/systemd/system/myapp.service with the following contents:
    [Service]
    ExecStart=[node binary] /home/myuser/[main file]
    Restart=always
    StandardOutput=syslog
    StandardError=syslog
    SyslogIdentifier=node-sample
    User=myuser
    Group=myuser
    Environment=NODE_ENV=production

    [Install]
    WantedBy=multi-user.target


## Goals

* Shallow directory structure.
* 4 space tabs in JS and HTML for legibility.
* Consistent and helpful naming of files and folders. It should be easy to tell at a glance what a file is for and what part of the app it belongs to.
* Browserify all the things: working on server-side code should feel just like working on font-end code and vice-versa.
* Test all the things: tests should be easy to make and easy to run.
* Scalability: the directory structure should be able to grow large-ish without resorting to different structures.

## Directory Structure

The basic idea is to mirror the directory structure in the front-end and the backend.

The api/ directory holds the Node/Express backend. API routes and initialization are handled by the app.js file in the root directory. Each sub-directory of api/ is named in lowecase using hyphens (ex. my-module/).

The client/ directory holds the AngularJS code. It is very similar in structure to api/ but the directories in here are named using SnakeCase.

The public/ directory is where Gulp builds the AngularJS code from client/ after it's been processed. The nested SnakeCase-named folders in public/ only contain view.html files. All .js files are combined into a single file called bundle.js that lives in the root of public/.

```
modular-mean
|- api
    |- my-module
        |- test
    |- my-other-module
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

* Angular modules should be named in SnakeCase.
* Node modules should be hyphenated

### File naming conventions

It should be very easy to tell what a file is for and what module it belongs to. They should have unique and descriptive names, without straying to far from conventions. Try not to be clever. The "ModuleName.nameOfUse.js" convention works well for :

* Node file names should reflect the module they belong to and their place in the MVC structure:

        my-module/
        |- my-module.js
        |- my-module.controller.js
        |- my-module.model.js

* Angular script file names should reveal their use in four-letter abbreviations. Files should be named using SnakeCase, with a suffix that indicates their use:

        MyModule/
        |- MyModuleController.js
        |- MyModuleService.js
        |- MyModuleDirective.js

* Angular views should identify the module they belong to and the name of the route:

        MyModuleMyPage.html

## Thanks to these other great projects:

Gulp config and Browserify usage was inspired by [Frickle](https://github.com/Hyra/Frickle).

These two blog posts by Ben Lewis of QuickLeft were integral in understanding testing with Browserify:
* [Setting Up A JS App With Gulp and Browserify](https://quickleft.com/blog/setting-up-a-clientside-javascript-project-with-gulp-and-browserify/)
* [AngularJS Unit Testing – For Real, Though](https://quickleft.com/blog/angularjs-unit-testing-for-real-though/)

Then there was this talk by [Ben Clinkinbeard at ng-conf](http://benclinkinbeard.com/talks/2014/ng-conf/#/) that used a more straight-forward syntax.

[This article](https://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make) by Mark Meyer introduced me to the concept of modular front-end code. Then [this talk at ng-conf](https://www.youtube.com/watch?v=hG-ARy0oqjI) by John Papa about Angular style sealed the deal. The [angular-seed](https://github.com/angular/angular-seed) project has been an important resource in this regard as well.

Ben Clinkinbeard outlines a dead-simple way of organizing Browserify-ed Angular code in the [slides from his ng-conf talk](http://benclinkinbeard.com/talks/2014/ng-conf/#/). Bastian Krol elaborates on these concepts in [this blog post](https://blog.codecentric.de/en/2014/08/angularjs-browserify/).

This article inspired the [client-side authentication](http://arthur.gonigberg.com/2013/06/29/angularjs-role-based-auth/) I'm using.
