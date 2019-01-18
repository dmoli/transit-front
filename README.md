# TRANSIT 🚌

## Requirements

For development, you will only need Node.js installed on your environement.

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v10.14.2

    $ npm --version
    6.4.1

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

---

## Install

    $ git clone https://github.com/dmoli/transit-front.git
    $ cd transit-front
    $ npm install

### Configure app

Open `env-config.js` then edit it with the value where you have setup:

- GOOGLE_MAPS_ID

## Run

    $ npm run dev

## API

The data is getting from a test API that was developed with PHP & MySql

---

## Languages & tools

### Next.js

- [Next.js](https://github.com/zeit/next.js/) is used to build server side render React project

### React

- [React](http://facebook.github.io/react) is used to build UI's components

### Redux

- [Redux](http://redux.js.org/) state container for JavaScript apps

### Styled-components

- [Styled components](https://www.styled-components.com/) is used to add css style

### React-Intl

- [React-Intl](https://github.com/yahoo/react-intl) internationalize React apps

### Snapshot testing

- [Snapshot testing](https://jestjs.io/docs/en/snapshot-testing) React Tree Snapshot Testing

```
npm run test
```

### Storybook

- [Storybook](https://github.com/storybooks/storybook) Interactive UI component dev

```
npm run storybook
```

### Linter Airbnb

- [Linter](http://eslint.org/) the pluggable linting utility for JavaScript and JSX. Airbnb rules

```
npm run eslint
```

### GIT

- [GIT](https://git-scm.com/) version control

---

### Autor

- [Diego Molina](https://www.linkedin.com/in/diego-jose-molina/) Frontend Developer & Scrum Master
