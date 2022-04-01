
module.exports = {
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json"
        }
    },
    clearMocks: true,
    moduleNameMapper: {
        "@events/(.*)": "<rootDir>/src/events/$1",
        "@models/(.*)": "<rootDir>/src/models/$1"
    },
    moduleDirectories: [
        "./src",
        "node_modules"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: [
        "./test/init.ts"
    ],
    testPathIgnorePatterns: [
        "./build/",
        "./node_modules/"
    ]
};