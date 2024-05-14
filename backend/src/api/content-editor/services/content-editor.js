'use strict';

/**
 * content-editor service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::content-editor.content-editor');
