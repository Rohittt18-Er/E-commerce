const englishMsg = require("../utils/en.json");

exports.sendResponse = (data, is_error, message) => {
    let json = { data: data, is_error: is_error, message: message };
    if (is_error === undefined) {
      json.is_error = false;
    }
    if (message === undefined) {
      json.message = "";
    } else {
        json.message = englishMsg[message] ?? message;
    }
    return json;
  };
