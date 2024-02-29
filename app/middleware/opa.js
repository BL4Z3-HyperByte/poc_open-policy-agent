const { loadPolicySync, loadPolicy } = require('@open-policy-agent/opa-wasm');
const fs = require('fs');
const path = require('path');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
function PolicyGuard_Products(req, res, next) {
  const readPolicyFile = fs.readFileSync(
    path.join(__dirname, '..', 'policies', 'products', 'policy.wasm')
  );
  console.log(readPolicyFile);

  const loadedPolicyFile = loadPolicySync(readPolicyFile);
  console.log(loadedPolicyFile);

  const result = loadedPolicyFile.evaluate({
    user_role: req.headers.user_role,
  });

  const resultData = result[0].result[0];

  console.log(resultData);

  req.filterData = (data) => {
    const obj = {};
    return data;
  };

  next();
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
function PolicyGuard_Details(req, res, next) {
  const readPolicyFile = fs.readFileSync(
    path.join(__dirname, '..', 'policies', 'details', 'policy.wasm')
  );
  console.log(readPolicyFile);

  const loadedPolicyFile = loadPolicySync(readPolicyFile);
  console.log(loadedPolicyFile);

  const result = loadedPolicyFile.evaluate({
    user_role: req.headers.user_role,
  });

  /**
   * @type {String[]}
   */
  const resultData = result[0].result[0];

  console.log('ALLOWED PROPERTIES: ', resultData);

  req.filterData = (data) => {
    const obj = {};

    resultData.forEach((property) => {
      obj[property] = data[property];
    });

    console.log('OUTPUT OBJ >>> ', obj);
    return obj;
  };

  next();
}

module.exports = { PolicyGuard_Details, PolicyGuard_Products };
