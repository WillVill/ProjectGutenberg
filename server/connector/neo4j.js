const neo4j = require('neo4j-driver').v1;

//create a driver instance for the user neo4j
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic('neo4j', '123456'));

//Register a callback to know if driver creation was successful
driver.onCompleted = () => {
  console.log("Successfully connected to Neo4j database");
};

// Register a callback to know if driver creation failed.
driver.onError = (error) => {
  console.log('Neo4j driver instantiation failed', error);
};

//export the driver
exports.getDriver = function () {
  return driver.session();
};