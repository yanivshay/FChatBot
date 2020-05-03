const { Client } = require("@elastic/elasticsearch");
var elasticClient = new Client({
  cloud: {
    id:
      "ForterTask:ZXUtd2VzdC0yLmF3cy5jbG91ZC5lcy5pbyQ3NDQ5YjFlYzM3YzQ0YTQ3YTdkOTlhNTU3MWE3ZmQ1YiQ2ODQ1MmZhMGU2M2Y0NzNhOWZlZWRiNjQ3NzJlODY2MQ==",
  },
  auth: {
    username: "elastic",
    password: "BVL4yznn6ibvVK2YNeWPn0qh",
  },
  log: "error",
});

module.exports = {
  ping: function () {
    elasticClient.ping(function (error) {
      if (error) {
        console.log(error);
        console.log("ERROR : Elasticsearch cluster is down!");
      } else {
        console.log("Elasticsearch cluster is up!");
      }
    });
  },

  // Create index
  initIndex: function (indexName) {
    elasticClient.indices
      .create({
        index: indexName,
      })
      .then(
        function (resp) {
          console.log(resp.body);
        },
        function (err) {
          console.log(err.message);
        }
      );
  },

  // Check if index exists
  indexExists: function (indexName) {
    elasticClient.indices
      .exists({
        index: indexName,
      })
      .then(
        function (resp) {
          console.log("Index Exists: " + resp.body);
        },
        function (err) {
          console.log(err.message);
        }
      );
  },

  // Preparing index and its mapping
  initMapping: function (indexName, docType, payload) {
    elasticClient.indices
      .putMapping({
        index: indexName,
        type: docType,
        body: payload,
      })
      .then(
        function (resp) {
          console.log(resp.body);
        },
        function (err) {
          console.log(err.message);
        }
      );
  },

  // Add/Update a document
  addDocument: function (indexName, docType, payload) {
    elasticClient
      .index({
        index: indexName,
        type: docType,
        body: payload,
      })
      .then(
        function (resp) {
          console.log(resp.body);
        },
        function (err) {
          console.log(err.message);
        }
      );
  },

  // Search
  search: function (indexName, docType, payload) {
    return elasticClient.search({
      index: indexName,
      type: docType,
      body: payload,
    });
  },
};
