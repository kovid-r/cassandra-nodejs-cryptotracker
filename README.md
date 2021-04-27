# Crypto Price Tracker with Node.js and Cassandra

This GitHub repository uses Node.js to query the CoinGecko API to fetch cryptocurrency prices and send them to Cassandra. The data from Cassandra can be used by any downstream application for tracking cryptocurrency prices and trading them.

## Installation

Download and install Node.js from the [official website](https://nodejs.org/en/download/). The default package manager for Node.js comes pre-installed with the Node.js installation.

Clone this repository and go to `/path/to/repository` and run the following command to install the dependencies mentioned in `package.json` file.


```
npm install
```

## Initialize the Database

Visit [DataStax Astra's website](https://astra.datastax.com) to create a free account and access to Cassandra-as-a-Service. Once the account is created, create a database called **nodeapp**. You can access the database using the CQLSH in-browser command-line interface. Use the CLI to run the commands in the `initialize.sql` file. The commands will create
* A `KEYSPACE` called **coingecko**, and
* A `TABLE` in that keyspace called **coin_prices**.

## Authentication

When you visit the Astra webpage and go to the database tab and click on the database you just created, you will see the following format of the URL:

```https://astra.datastax.com/org/{USER-ID}/database/{ASTRA-DATABASE-ID}```

Fetch the Astra Database ID and go to the following link using that ID:

```https://astra.datastax.com/org/{ASTRA-DATABASE-ID}/settings/tokens```

Use the official [Astra documentation for Node.js](https://docs.datastax.com/en/astra/docs/connecting-to-your-database-with-the-datastax-nodejs-driver.html) to download the secure bundle and to create an authentication token. The authentication token will give you `clientId` and `clientSecret`.

Replace the following values in the `default.json` file:
1. `path/to/secure-connect-database_name.zip`
2. `clientId`
3. `clientSecret`

Make sure you do not commit the `default.json` file back with real values.

## Usage

You're all set. Now, you're ready to start fetching data from the CoinGecko API and insert it into Cassandra by using the following command:

```
npm start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
