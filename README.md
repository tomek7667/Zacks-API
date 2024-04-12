# zacks-api-2

Unofficial library for programmatic access to zacks ranking page. Any feature requests in `Issues` tab are more than welcome! :)

## ▶️ Use

Install the package

```bash
yarn add zacks-api-2
```

or

```bash
npm install zacks-api-2
```

## 📖 Getting Started

### Importing

Once it has been installed, it can easily be imported in your project, depending on the import method you need.

```js
// Common js module
const { getQuote } = require("zacks-api-2");
// ESM module
import { getQuote } from "zacks-api-2";
```

## Usage

### `getQuote`

Used to retrieve zacks rank on a symbol. Can be extended to include information about each rank. Throws an error when the symbol is not found.

```ts
const quote = await getQuote("AAPL");
console.log(quote.rank)
// 3

const quoteExtended = await getQuote("AAPL", { extended: true });
console.log(quote.zrankRows)
// [
//     { rank: 1, definition: 'Strong Buy', annualizedReturn: 0.2415 },
//     { rank: 2, definition: 'Buy', annualizedReturn: 0.18 },
//     { rank: 3, definition: 'Hold', annualizedReturn: 0.0944 },
//     { rank: 4, definition: 'Sell', annualizedReturn: 0.051 },
//     { rank: 5, definition: 'Strong Sell', annualizedReturn: 0.0253 }
// ]
```

## 💻 Development

If you want to improve the package or you are just curious on how it works, follow this section.

### 🧾 Requirements

-   [node.js 18.x](https://nodejs.org/) *(but earlier will prob work too.)*
-   [npm](https://www.npmjs.com/) (or similar package manager)

#### Notable dev-dependencies

-   [typescript](https://www.typescriptlang.org/) to make programming decent
-   [jest.js](https://jestjs.io/) for unit tests

### 🔧 Development setup

Install the dependencies with

```bash
yarn
```

### 🧱 Build

Make sure everything is clean by running

```bash
yarn clean
```

then all the versions of the package can be built with the command

```bash
yarn build
```

### 🧪 Tests

#### Unit

After having installed the dependencies, run

```bash
yarn test
```
