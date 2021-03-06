const assert = require('assert');
const { ObjectId } = require('mongodb');
const { hasher, salt } = require("../lib/util.js")

exports.signIn = async ({db, data:rawData, sessions}) => {
	let incomingData = null,
			userData = null;
	try {
		assert(rawData.hasOwnProperty('username'), 'No username in body');
		assert(rawData.username, 'username is falsy');
		assert(rawData.hasOwnProperty('password'), 'No password in body');
		assert(rawData.password, 'password is falsy');
		incomingData = {...rawData, ...{password: hasher(rawData.password, salt)}}
		userData = await db.collection('users').findOne({username:incomingData.username})
		assert(userData, `username: ${incomingData.username} You must sign up first`)
		assert.equal(userData.password, incomingData.password, 'Password not match')
		
		return userData.username
	} catch (e) {
		console.log(e.stack, userData, incomingData)
		throw e;
	}
}

exports.signOut = async ({db, data}) => {
	// console.log(db)
	try {
		assert(data.hasOwnProperty('username'), 'No username in body');
		assert(data.hasOwnProperty('password'), 'No password in body');
		let isExist = await db.collection('users').findOne({username:data.username})
		assert(!isExist, `username: ${data.username} already exists`)
		let r = await db.collection('users').insertOne(data);
		assert.equal(1, r.insertedCount);
	} catch (e) {
		console.log(e.stack, data)
	}
}

exports.sessionBag;