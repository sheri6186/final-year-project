'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::newsletter.newsletter', {
   config: {
      create: {
         middlewares: [],  // Add any middleware if needed
         policies: [],     // Add policies if needed
      },
   },
   routes: [
      {
         method: 'POST',
         path: '/subscribe',
         handler: 'newsletter.subscribe', // Custom controller action
         config: {
            auth: false, // Set to false if authentication is not required
         },
      },
   ],
});
