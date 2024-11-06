// src/api/newsletter/routes/newsletter.js
'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::newsletter.newsletter', {
   routes: [
      {
         method: 'POST',
         path: '/subscribe',
         handler: 'newsletter.subscribe',
         config: {
            auth: false,
         },
      },
   ],
});
