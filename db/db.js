"use strict";
const uuid        = require('uuid');
const { Client }  = require('pg');

const client = new Client({
  user: '',
  host: '',
  database: '',
  password: '',
  port: -1,
});

async function addClient(name) {
  await client.connect();

  let myuuid = uuid.v4();
 
  const query = `
    INSERT INTO "Clients" (client_id, name)
    VALUES ('${myuuid}', '${name}')
  `;
  
  try {
    const res = await client.query(query, []);
  } catch (err) {
    console.log(err.stack)
  }

  await client.end();
}

async function addUser(name, mobile, address) {
  await client.connect();

  let myuuid = uuid.v4();
 
  const query = `
    INSERT INTO "Users" (user_id, name, mobile, address)
    VALUES ('${myuuid}', '${name}', '${mobile}', '${address}')
  `;
  
  try {
    const res = await client.query(query, []);
  } catch (err) {
    console.log(err.stack)
  }

  await client.end();
}

async function addDevice(name) {
  await client.connect();

  let myuuid = uuid.v4();
 
  const query = `
    INSERT INTO "Devices" (device_id, name)
    VALUES ('${myuuid}', '${name}')
  `;
  
  try {
    const res = await client.query(query, []);
  } catch (err) {
    console.log(err.stack)
  }

  await client.end();
}

async function addPanicType(name) {
  await client.connect();

  let myuuid = uuid.v4();
 
  const query = `
    INSERT INTO "PanicTypes" (panictype_id, name)
    VALUES ('${myuuid}', '${name}')
  `;
  
  try {
    const res = await client.query(query, []);
  } catch (err) {
    console.log(err.stack)
  }

  await client.end();
}

async function addPanic(userId, deviceId, panicTypeId, lat, long) {
  await client.connect();

  const myuuid    = uuid.v4();
  const unixTime  = Math.floor(Date.now() / 1000);

  const query = `
    INSERT INTO "Panics" (panic_id, fk_user_id, fk_device_id, fk_panictype_id, lat, long, timestamp)
    VALUES ('${myuuid}', '${userId}', '${deviceId}', '${panicTypeId}', ${lat}, ${long}, ${unixTime})
  `;
  
  try {
    const res = await client.query(query, []);
  } catch (err) {
    console.log(err.stack)
  }

  await client.end();
}

async function getAllPanics() {
  await client.connect();

  // const myuuid    = uuid.v4();
  // const unixTime  = Math.floor(Date.now() / 1000);

  const query = `
    SELECT * FROM "Panics"
  `;
  


  try {
    const res = await client.query(query, []);
    console.log("RESULTS!");
    for(var i = 0; i < res.length; i++) {
      var obj = json[i];
      console.log(obj.panic_id);
  }

    return res;
  } catch (err) {
    console.log(err.stack)
  }

  await client.end();
}

module.exports = { addClient, addUser, addDevice, addPanicType, addPanic, getAllPanics }