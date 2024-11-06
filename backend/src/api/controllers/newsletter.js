// src/api/newsletter/controllers/newsletter.js
'use strict';

const fetch = require('node-fetch');

module.exports = {
   async subscribe(ctx) {
      const { email } = ctx.request.body;

      if (!email) {
         return ctx.badRequest('Email is required');
      }

      // Additional logic to save the email to Strapi and send to Brevo
      await strapi.service('api::newsletter.newsletter').create({ data: { email } });

      return ctx.send({ message: 'Subscription successful!' });
   },
};
