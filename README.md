<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm ci
```

## Running the app

```bash
# development
$ make run
```

## Available ENV variables
Thees ENV variables you must set into stack.yml
```env
webhook.url: 'your webhook url'
```
Thees ENV variables you can set into stack.yml
```env
webhook.url: 'your webhook url'
binance.tickers: '{
   market: 'spot',
   symbols: [
     'BTCUSDT',
     'BNBUSDT',
     'ETHUSDT'
   ],
   threshold: {
     BTCUSDT: {
       ask: {
         up: '5',
         down: '-5',
         reachedto: '22795',
         wentdownto: '21695'
       },
       bid: {
         up: '5',
         down: '-5',
         reachedto: '22795',
         wentdownto: '21695'
       }
     },
     BNBUSDT: {
       ask: {
         up: '5',
         down: '-5',
         reachedto: '309',
         wentdownto: '304'
       },
       bid: {
         up: '5',
         down: '-5',
         reachedto: '309',
         wentdownto: '304'
       }
     },
     ETHUSDT: {
       ask: {
         up: '5',
         down: '-5',
         reachedto: '1522',
         wentdownto: '1552'
       },
       bid: {
         up: '5',
         down: '-5',
         reachedto: '1522',
         wentdownto: '1552'
       }
     },
   }
 }'
```

## Application is tracking the Binance `spot` market `ack` and `bid` changes

1. You can change market to `usdm` or `coinm` markets in ENV configuration,
after you need to rerun the project 
2. You can add your coin pairs or symbols for tracking,
   after you need to rerun the project
3. There the example for bitcoin to tether 
```json5
{
  BTCUSDT: {
    ask: {
      up: '5',
      down: '-5',
      reachedto: '22795',
      wentdownto: '21695'
    },
    bid: {
      up: '5',
      down: '-5',
      reachedto: '22795',
      wentdownto: '21695'
    }
  },
}
   ```
you can use your coin pairs for tracking 
4. In this way you can set coin changes, understand when a coin has grown, for example, 5 dollars, or it has dropped -5 dollars
```json5
up: '5',
down: '-5',
```
5. This way you can track a coin to the top value, and set from if you need to track the bottom value
```json5
reachedto: '22795',
wentdownto: '21695'
```
6. Property `ask`  is asking price (sell order)
   property`bid`  is bid price (buy order)



## Author's respect :)

Thank you very much for this task, 
it was interesting to work on this task, 
please ask if I misunderstood something in your task, 
I tried to make a simple and working scheme of the project

## License

Nest is [MIT licensed](LICENSE).
