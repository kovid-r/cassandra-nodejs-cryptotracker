-- Manually Create Keyspace by logging into your Astra account by accessing the CQLSH console
CREATE KEYSPACE IF NOT EXISTS coingecko WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};

-- Create a table to capture cryptocurrency prices
CREATE TABLE coingecko.coin_prices (id UUID PRIMARY KEY, coin text, price double, created_at timestamp);
