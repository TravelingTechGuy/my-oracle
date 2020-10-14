# My First Oracle

This is a WIP project, to learn how Oracles work on blockchains. It was inspired by [this article](https://kndrck.co/posts/ethereum_oracles_a_simple_guide/), and has been updated to current versions and language features/properties.

## What does it do

It gets the current BTC market cap from CoinGecko into a smart contract, using an oracle script.

## Prerequisits

1. Truffle. I have it installed globally: `npm i -g truffle`
1. You'll need a developer blockchain, like `ethereumjs-testrpc` or `Ganache` - which is what I'm using. If yours runs on a different port/address, update the `networks:development` section in `truffle-config.js` accordingly.

## How to run

1. Clone this repo
1. Install dependencies: `npm i`
1. Run your blockchain first, and wait for it to load
1. Deploy the smart contract: `truffle migrate`
1. Run the Oracle: `npm run oracle` or `node src/oracle`
1. Open another terminal and run the client: `npm run client` or `node src/client`.  
You'll need to run it twice to see the value change from 0.

## Tests

Run `truffle test` or `node run test`.

## WIP !!!

Currently the Oracle script runs and exits - not waiting around for the client. This stems from the fact there's no longer a `watch` function in Truffle, and instead, events return EventEmitters. That's what I'm trying to solve right now.
