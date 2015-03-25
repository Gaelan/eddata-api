var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var autoIncrement = require('mongoose-auto-increment');
var passportLocalMongoose = require('passport-local-mongoose');

var StudentSchema = new Schema({
  nameId: Number,
  firstName: String,
  lastName: String,
  middleName: String,
  studentNumber: Number,
  enrollStatus: String,
  gradeLevel: Number,
  gender: String,
  birthdate: Date,
  street: String,
  city: String,
  state: String,
  zip: String,
  guardianEmail: String,
  homePhone: String,
  stateStudentNumber: Number,
  buildingStateCode: Number,
  buildingName: String,
  username: String,
  email: String,
  ethnicity: Number,
  entryDate: Date,
  exitDate: Date,
  expectedGradYear: Number,
  primaryLanguage: Number,
  mother: String,
  motherHome: String,
  father: String,
  fatherHome: String,
  ec1: String,
  ec1Relation: String,
  ec1Phone: String,
  ec2: String,
  ec2Relation: String,
  ec2Phone: String,
  refreshAccount: Boolean
});

StudentSchema.plugin(timestamps);
StudentSchema.plugin(autoIncrement.plugin, { model: 'Students', field: 'id' });
StudentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Student', StudentSchema);