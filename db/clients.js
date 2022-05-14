"use strict";

const db = require('./db');

module.exports.addClient = async (event) => {

  const body        = JSON.parse(event.body);
  const clientName  = body.clientname;

  await db.addClient(clientName);

  return {
    statusCode: 200,
    body: JSON.stringify(
      'Added client: ' + clientName,
      null, 
      2
    ),
  };
};

module.exports.getAllClients = async (event) => {

  var res = await db.getAllClients();

  return {
    statusCode: 200,
    body: JSON.stringify(
      res.rows,
      null, 
      2
    ),
  };
};