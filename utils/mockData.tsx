import { createServer, Factory } from "miragejs"

export function makeServer() {
  const cryptoSymbols = ["btc", "eth", "xrp", "ltc", "ada", "dot", "sol", "link", "doge", "shib"];
  return createServer({
    factories: {
      crypto: Factory.extend({
        id(i) {
          // Unique identifier for each item
          const cryptoIds = ["bitcoin", "ethereum", "ripple", "litecoin", "cardano", "polkadot", "solana", "chainlink", "dogecoin", "shiba-inu"];
          return cryptoIds[i % cryptoIds.length];
        },
        symbol(i) {
          // Symbol for each cryptocurrency
         
          return cryptoSymbols[i % cryptoSymbols.length];
        },
        name(i) {
          // Name of each cryptocurrency
          const cryptoNames = ["Bitcoin", "Ethereum", "Ripple", "Litecoin", "Cardano", "Polkadot", "Solana", "Chainlink", "Dogecoin", "Shiba Inu"];
          return cryptoNames[i % cryptoNames.length];
        },
        image(i) {
          // Sample images; in production, you'd likely use real URLs or local files
          return `https://assets.coingecko.com/coins/images/${i + 1}/large/${cryptoSymbols[i % cryptoSymbols.length]}.png?1696501400`;
        },
        current_price() {
          return Math.floor(Math.random() * 100000); // Random price
        },
        ath_change_percentage() {
          return parseFloat((Math.random() * 10 - 5).toFixed(5)); // Random percent change between -5 and 5
        },
        price_change_percentage_1h_in_currency() {
          return parseFloat((Math.random() * 10).toFixed(1)); // Random percentage for 1h change
        },
        price_change_percentage_24h_in_currency() {
          return parseFloat((Math.random() * 20).toFixed(1)); // Random percentage for 24h change
        },
        price_change_percentage_7d_in_currency() {
          return parseFloat((Math.random() * 30).toFixed(1)); // Random percentage for 7d change
        },
        market_cap() {
          return Math.floor(Math.random() * 1000000000000); // Random market cap
        },
        total_volume() {
          return Math.floor(Math.random() * 10000000000); // Random volume
        },
        circulating_supply() {
          return Math.floor(Math.random() * 21000000); // Random circulating supply
        },
        total_supply() {
          return 21000000; // Fixed total supply
        },
      }),
  
    charts: Factory.extend({
      prices() {
        return Array.from({ length: 3 }, () => [
          parseFloat((Math.random() * 10 + 1).toFixed(2)),
          parseFloat((Math.random() * 50 + 1).toFixed(2)),
        ]);
      },
      total_volumes() {
        return Array.from({ length: 3 }, () => [
          parseFloat((Math.random() * 30 + 10).toFixed(3)),
          parseFloat((Math.random() * 50 + 20).toFixed(3)),
        ]);
      },
    }),
},

    seeds(server) {
      // Generate 10 cryptocurrency objects
      server.createList("crypto", 10);
      server.createList("charts", 5);
    },

    routes() {
      this.namespace = "https://api.coingecko.com/api/v3/coins";

      this.get("/markets?vs_currency=usd&price_change_percentage=1h%2C24h%2C7d&sparkline=true", (schema) => {
        return schema.db.cryptos;
      });
       this.get("/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily", (schema) => {
        return schema.db.charts;
      });
    },
  });
}

///// fall back data If status code 429. 

export async function fetchDataWithFallback(query:string) {
  const fallbackCryptos = [
    {  name:"bitcoin", current_price:45000 , symbol:"btc", market_cap: 456789, total_volume: 12345 },
    {   name:"etherium", current_price:3300 , symbol:"eth", market_cap: 567890, total_volume: 23456 },
  ];
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h%2C24h%2C7d&sparkline=true"
      );
  
      if (response.status === 429) {
        console.warn("Rate limit exceeded. Returning fallback data.");
        return fallbackCryptos;
      }
  
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return fallbackCryptos; // Fallback data in case of error
    }
}