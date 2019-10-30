const express = require('express');
const router = express.Router();

router.get('/validateJSON.json', (req, res) => {
  res.json(
    [{
      "name": [
        "david test all urls"
      ],
      "value": {
        "namespace": "wacai.doublerb.cn",
        "package_name": "wacai",
        "certificate": [
          "get by myself"
        ]
      }
    }]
  );
});

module.exports = {
  router
};
