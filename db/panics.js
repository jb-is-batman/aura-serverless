"use strict";

const db = require('./db');

module.exports.addPanicType = async (event) => {

  const body  = JSON.parse(event.body);
  const name  = body.name;

  await db.addPanicType(name);

  return {
    statusCode: 200,
    body: JSON.stringify(
      'Added panic type: ' + name,
      null, 
      2
    ),
  };
};

module.exports.addPanic = async (event) => {

  const body        = JSON.parse(event.body);
  const userId      = body.userid;
  const deviceId    = body.deviceid;
  const panicTypeId = body.panictypeid;
  const lat         = body.lat;
  const long        = body.long;
  

  await db.addPanic(userId, deviceId, panicTypeId, lat, long);

  return {
    statusCode: 200,
    body: JSON.stringify(
      'Panic!',
      null, 
      2
    ),
  };
};

module.exports.getAllPanics = async (event) => {

  // const body        = JSON.parse(event.body);
  // const userId      = body.userid;
  // const deviceid    = body.deviceid;
  // const panictypeid = body.panictypeid;
  // const lat         = body.lat;
  // const long        = body.userid;
 
  var result = await db.getAllPanics();

  let parsed = result.rows;

  return {
    statusCode: 200,
    body: JSON.stringify(
      parsed,
      null, 
      2
    ),
  };
};