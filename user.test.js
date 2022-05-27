const MongoClient = require("mongodb").MongoClient;
const User = require("./user")
require('dotenv').config()

const mongoPath = process.env.MONGOPATH

describe("User Account Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			mongoPath,
			{ 
				useNewUrlParser: true,
			},
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.register("username", "password", "123456")
		expect(res['status']).toBe("user_created")
	})

	test("Duplicate username", async () => {
		const res = await User.register("username", "1234")
		expect(res['status']).toBe("username_duplicate")
	})

	test("User login invalid username", async () => {
		const res = await User.login("test", "test")
		expect(res['status']).toBe("username_not_found")
	})

	test("User login invalid password", async () => {
		const res = await User.login("username", "test")
		expect(res['status']).toBe("invalid_password") 
	})

	test("User login successfully", async () => {
		const res = await User.login("username", "password")
		expect(res['status']).toBe("authorized")
	})

	test('should run', () => {
	});
});