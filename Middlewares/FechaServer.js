const moment = require('moment-timezone');
require('dotenv').config();

const timeZoneMiddleware = (req, res, next) => {
  const timeZone = process.env.ZonaHoraria;
  moment.tz.setDefault(timeZone);
  next();
}

module.exports = timeZoneMiddleware;
