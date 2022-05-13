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
    SELECT 
      panic.panic_id,
      panic.fk_user_id,
      panic.fk_device_id,
      panic.fk_client_id,
      panic.fk_panictype_id,
      panic.lat,
      panic.long,
      panic.timestamp,
      usr.user_id,
      usr.name,
      usr.mobile,
      usr.address,
      device.device_id,
      device.name,
      panictype.panictype_id,
      panictype.name
    
    FROM 
  
      "Panics" panic
  
    INNER JOIN "Users" 		  usr 		  on panic.fk_user_id 		  = usr.user_id
    INNER JOIN "Devices" 	  device 		on panic.fk_device_id 		= device.device_id
    INNER JOIN "PanicTypes" panictype on panic.fk_panictype_id 	= panictype.panictype_id;
  `;
  

  try {
    const res = await client.query(query, []);
    for(var i = 0; i < res.rows.length; i++) {
      var obj             = res.rows[0];
      console.log(obj);
    }

    return res;
  } catch (err) {
    console.log(err.stack)
  }

  await client.end();
}

async function getUserDetais(userId) {
  const query = `
  SELECT * FROM "Users" WHERE user_id = '${userId}'
  `;

  try {
    const res = await client.query(query, []);
    if(res.rowCount > 0) {
      return res.rows[0];
    }
  } catch (error) {
    console.log(err.stack)
  }
}

async function getDeviceDetails(deviceId) {
  const query = `
  SELECT * FROM "Devices" WHERE device_id = '${deviceId}'
  `;

  try {
    const res = await client.query(query, []);
    if(res.rowCount > 0) {
      return res.rows;
    }
  } catch (error) {
    console.log(err.stack)
  }
}

module.exports = { addClient, addUser, addDevice, addPanicType, addPanic, getAllPanics }