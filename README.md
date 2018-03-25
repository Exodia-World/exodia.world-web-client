# Exodia.World

A decentralized digital gaming marketplace and platform that enables game studios to sell their games directly to players all around the world without a middleman in a secure and transparent way.

---

# Exodia.World Web Client

A web client for Exodia.World's marketplace, digital wallet, crowdfunding, etc. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.

## Post-Install

After you have run `npm install` to install all necessary packages, copy `sample.eth.json` into `eth.json`. Change the environment values as appropriate. We have three types of environment:

- **dev**: default development environment (http://localhost:8545)
- **staging**: testnet environment (https://rinkeby.infura.io/API_KEY)
- **prod**: mainnet environment (https://mainnet.infura.io/API_KEY)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Note on Desktop Client

exodia.world-web-client is wrapped by [exodia.world-desktop-client](https://bitbucket.org/exodia-world/exodia.world-desktop-client) so that we may build the same code for both web and desktop users.
