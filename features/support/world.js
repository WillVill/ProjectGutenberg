var Zombie = require('zombie');
 
function World() {
  // var server = process.env.testServer || 'http://localhost';
  // var port = process.env.testPort || '8080';
  // this.browser = new Zombie({site: server + ':' + port});
  this.browser = new Zombie();
};
 
module.exports = World;