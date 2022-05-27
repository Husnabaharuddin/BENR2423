const bcryptjs = require("bcryptjs");
const { faker:fakerjs } = require('@faker-js/faker') ;

let users;

class User {
	static async injectDB(conn) {
		users = await conn.db("lab-user").collection("users")
	}

	/**
	 * @remarks
	 * This method is not implemented yet. To register a new user, you need to call this method.
	 * 
	 * @param {*} username 
	 * @param {*} password 
	 * @param {*} phone 
	 */
	static async register(username, password, phone=fakerjs.phone) {
		// TODO: Check if username exists
		const result = await users.findOne({
			username
		})

		if (result) return { status: "username_duplicate"}

		// TODO: Hash password
		const saltRounds = 5
		var hashedPass = bcryptjs.hashSync(password, saltRounds)

		// TODO: Save user to database
				// faker.js
		const insertResult = await users.insertOne({
			username,
			password: hashedPass,
			phone,
			bookingStatus: {
				verified: true,
				id: 'ADMIN_DUTY'
			},
			bookings_ids: '1'
		})

		if (insertResult) return { status: "user_created"}
		else return { status: "error_registering" }
	}

	static async login(username, password) {
		// TODO: Check if username exists
		const result = await users.findOne({
			username
		})

		if (!result) return { status: "username_not_found"}

		// TODO: Validate password
		var validatePass = await bcryptjs.compare(password, result.password)

		if (!validatePass) return { status: "invalid_password"}

		// TODO: Return user object
		return { status: "authorized", user: result};
	}
}

module.exports = User;