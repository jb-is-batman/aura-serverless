"use strict";
const uuid        = require('uuid');
const { Client, Pool }  = require('pg');

const client = new Pool({
  user: '',
  host: '',
  database: '',
  password: '',
  port: -1,
});

async function addClient(name) {

  let myuuid = uuid.v4();
 
  const query = `
    INSERT INTO "Clients" (client_id, name)
    VALUES ('${myuuid}', '${name}')
  `;
  
  try {
    const res = await client.query(query, []);
  } catch (err) {
    console.log(err.stack)
  } finally {
    // await client.end();
  }
}

async function getAllClients() {

  const query = `
    SELECT * FROM "Clients"
  `;
  
  try {
    const res = await client.query(query, []);
    return res;
  } catch (err) {
    console.log(err.stack)
  } finally {
    // await client.end();
  }
}

async function addUser(name, mobile, address) {

  let myuuid = uuid.v4();
 
  const query = `
    INSERT INTO "Users" (user_id, name, mobile, address)
    VALUES ('${myuuid}', '${name}', '${mobile}', '${address}')
  `;
  
  try {
    const res = await client.query(query, []);
  } catch (err) {
    console.log(err.stack)
  } finally {
    // await client.end();
  }
}

async function getAllUsers() {
 
  const query = `
    SELECT * FROM "Users"
  `;
  
  try {
    const res = await client.query(query, []);
    return res;
  } catch (err) {
    console.log(err.stack)
  } finally {
    // await client.end();
  }
}

async function addDevice(name) {

  let myuuid = uuid.v4();
 
  const query = `
    INSERT INTO "Devices" (device_id, name)
    VALUES ('${myuuid}', '${name}')
  `;
  
  try {
    const res = await client.query(query, []);
  } catch (err) {
    console.log(err.stack)
  } finally {
    // await client.end();
  }
}

async function addPanicType(name) {

  let myuuid = uuid.v4();
 
  const query = `
    INSERT INTO "PanicTypes" (panictype_id, name)
    VALUES ('${myuuid}', '${name}')
  `;
  
  try {
    const res = await client.query(query, []);
  } catch (err) {
    console.log(err.stack)
  }finally {
    // await client.end();
  }
}

async function addPanic(userId, deviceId, panicTypeId, lat, long) {

  const myuuid    = uuid.v4();
  const unixTime  = Math.floor(Date.now() / 1000);

  const query = `
    INSERT INTO "Panics" (panic_id, fk_user_id, fk_device_id, fk_panictype_id, lat, long, timestamp)
    VALUES ('${myuuid}', '${userId}', '${deviceId}', '${panicTypeId}', ${lat}, ${long}, ${unixTime})
  `;
  
  try {
    const res = await client.query(query, []);
  } catch (err) {
    console.log(err.stack);
  }finally {
    // await client.end();
  }
}

async function getAllPanics() {

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
      usr.name AS username,
      usr.mobile,
      usr.address,
      device.device_id,
      device.name AS devicename,
      panictype.panictype_id,
      panictype.name AS panictypename
    
    FROM 
  
      "Panics" panic
  
    INNER JOIN "Users" 		  usr 		  on panic.fk_user_id 		  = usr.user_id
    INNER JOIN "Devices" 	  device 		on panic.fk_device_id 		= device.device_id
    INNER JOIN "PanicTypes" panictype on panic.fk_panictype_id 	= panictype.panictype_id;
  `;
  

  var resultsArr = [];

  try {
    const res = await client.query(query, []);
    
    for(var i = 0; i < res.rows.length; i++) {
      if(res.rowCount > 0) {
        resultsArr.push(res.rows[i])
      }
    }

  } catch (err) {
    console.log(err.stack)
  } finally {
    // await client.end();
  }
  return resultsArr;
}

module.exports = { addClient, addUser, addDevice, addPanicType, addPanic, getAllPanics, getAllUsers, getAllClients }