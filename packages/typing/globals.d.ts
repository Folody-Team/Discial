declare global {
	// eslint-disable-next-line no-unused-vars
	namespace NodeJS {
		// eslint-disable-next-line no-unused-vars
		interface Global {
			// eslint-disable-next-line @typescript-eslint/ban-types
			Config: {};
		}
	}
}
export default global;
