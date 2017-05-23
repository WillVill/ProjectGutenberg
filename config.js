module.exports = {
	db: {
		mongodb: "mongodb://localhost:27017/mongoTest",
		neo4jdb: {
            url: process.env['NEO4J_URL'] || process.env['GRAPHENEDB_URL'] ||
                'http://neo4j:neo4j@localhost:7474',
            auth: process.env['NEO4J_AUTH'] || 'neo4j:123456'
        }
	}
}
