module.exports = {
  "extends": [
    "airbnb",
    "plugin:jest/recommended",
  ],
  "plugins": [
    "jest"
  ],
  "env": {
    "jest": true,
    "browser": true,
  },
  "rules": {
    "react/prop-types": "off", // Temporary
  }
};
