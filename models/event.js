var mongoose = require('mongoose');

// The factSchema is used to embedded docs in as tudent doc.
// There is no model and no 'facts' collection

var venueSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  zipcode: String,
  venueUrl: String
});

var artistSchema = new mongoose.Schema({
  name: String
});

var eventSchema = new mongoose.Schema({
  artists: [artistSchema],
  date: String,
  venue: venueSchema,
  ticketUrl: String,
  jamBaseId: String
});

module.exports =  mongoose.model('Event', eventSchema);
