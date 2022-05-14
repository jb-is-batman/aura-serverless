"use strict";

const db = require('./db');

module.exports.addUser = async (event) => {

  const body      = JSON.parse(event.body);
  const username  = body.username;
  const mobile    = body.mobile;
  const address   = body.address;

  await db.addUser(username, mobile, address);

  return {
    statusCode: 200,
    body: JSON.stringify(
      'Added user',
      null, 
      2
    ),
  };
};

module.exports.getAllUsers = async (event) => {

  var res = await db.getAllUsers();

  return {
    statusCode: 200,
    body: JSON.stringify(
      res.rows,
      null, 
      2
    ),
  };
};
