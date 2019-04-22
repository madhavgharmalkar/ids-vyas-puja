const NodeCache = require( "node-cache" );
const idsCache = new NodeCache({ stdTTL: 300, checkperiod: 150 });

module.exports = idsCache