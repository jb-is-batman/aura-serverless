"use strict";

const db = require('./db');

module.exports.addDevice = async (event) => {

  const body  = JSON.parse(event.body);
  const name  = body.name;

  await db.addDevice(name);

  return {
    statusCode: 200,
    body: JSON.stringify(
      'Added device: ' + name,
      null, 
      2
    ),
  };
};