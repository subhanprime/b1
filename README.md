# Project Title

Pendulum - Admin Microservice

---

## Requirements

For development, you will only need Node.js and a node global package, npm/Yarn, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v18.16.1

    $ npm --version
    v9.5.1

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

## Install

    $ git clone http://git.txend.com:8000/pendulum/admin/admin.git
    $ cd admin
    $ npm install

## Move to correct Branch

    $ git checkout dev

## Running the project

    $ npm run start

## Unit Testing Command

    $ npm run test

## Linting Command

    $ npm run lint:ts
