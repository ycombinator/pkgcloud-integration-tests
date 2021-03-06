var pkgcloud = require('pkgcloud'),
  logging = require('../common/logging'),
  config = require('../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.orchestration.createClient(config.getConfig(provider, 1));

client.on('log::*', logging.logFunction);

client.getResourceSchema(process.argv[3], function (err, schema) {
  if (err) {
    log.error(err);
    return;
  }
  log.info(schema);
});
