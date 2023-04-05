const moment = require('moment-timezone');
require('dotenv').config();

const timeZoneMiddleware = (req, res, next) => {
  const timeZone = process.env.ZonaHoraria;
  moment.tz.setDefault(timeZone);
  moment.updateLocale('en', {
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm',
      L: 'YYYY/MM/DD',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY HH:mm:ss',
      LLLL: 'dddd, MMMM D, YYYY HH:mm:ss'
    }
  });
  req.moment = moment;
  next();
}

module.exports = timeZoneMiddleware;
