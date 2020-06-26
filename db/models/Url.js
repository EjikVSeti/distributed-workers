const { Schema, model } = require('mongoose');

const schema = new Schema({
    url: { type: String, required: true },
    status: { type: String, enum: ['NEW', 'PROCESSING', 'PROCESSING', 'DONE', 'ERROR'], default: 'NEW' },
    http_code: { type: Number, default: null }
});

module.exports = model('Url', schema);
