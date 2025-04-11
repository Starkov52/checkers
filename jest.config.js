export default {
 testEnvironment: "jsdom",
 setupFilesAfterEnv: ["<rootDir>/src/test/jest.setup.ts"],
 transform: {
  "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
 },
 moduleNameMapper: {
  "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  "\\.(png|jpg|jpeg|gif|svg|mp3|wav|ogg)$": "<rootDir>/src/test/mocks/fileMock.js",
 },
 testPathIgnorePatterns: ["/node_modules/", "/build/"],
 moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
