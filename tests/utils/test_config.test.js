"use strict";
describe("CONFIG", () => {
    // Clear module cache before each test
    beforeEach(() => {
        jest.resetModules();
        // Reset environment variables
        process.env = {};
    });
    test("should load environment variables correctly", () => {
        // Set environment variables for this test
        process.env.ENCRYPTION_KEY = "6d3377fcdc038fe5b300a0fccaf8d888deee119dd547fc4343b981e0f44ea485";
        process.env.POLYGON_RPC_URL = "https://rpc-amoy.polygon.technology/";
        // Import the config after setting the environment variables
        const { CONFIG } = require('/home/sampriti/Self/iitkgp/KshitijKotaPES/src/utils/config.ts');
        expect(CONFIG.ENCRYPTION_KEY).toBe("6d3377fcdc038fe5b300a0fccaf8d888deee119dd547fc4343b981e0f44ea485");
        expect(CONFIG.POLYGON_RPC_URL).toBe("https://rpc-amoy.polygon.technology/");
    });
    test("should use defaults if environment variables are not set", () => {
        // No need to explicitly delete environment variables since we reset them in beforeEach
        // Import the config with empty environment
        const { CONFIG } = require('/home/sampriti/Self/iitkgp/KshitijKotaPES/src/utils/config.ts');
        expect(CONFIG.ENCRYPTION_KEY).toBe('');
        expect(CONFIG.POLYGON_RPC_URL).toBe('');
    });
});
//# sourceMappingURL=test_config.test.js.map