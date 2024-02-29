const { loadPolicySync, loadPolicy } = require('@open-policy-agent/opa-wasm');
const fs = require('fs');
const path = require('path');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
function PolicyGuard(req, res, next) {
  const readPolicyFile = fs.readFileSync(
    path.join(__dirname, '..', 'policies', 'products', 'policy.wasm')
  );
  console.log(readPolicyFile);

  const loadedPolicyFile = loadPolicySync(readPolicyFile);
  console.log(loadedPolicyFile);

  const result = loadedPolicyFile.evaluate({
    user: req.headers.user_role,
  });

  const resultData = result[0].result[0];

  console.log(resultData);

  switch (resultData) {
    case 'power':
      console.log('ATTACHING POWER FILTER!...');
      req.filterData = (obj) => {
        const data = JSON.parse(obj);
        return {
          p1: data.id,
          p2: data.name,
          p3: data.price,
          p4: data.description,
        };
      };
      break;
    case 'user':
      console.log('ATTACHING USER FILTER!...');
      req.filterData = (obj) => {
        const data = JSON.parse(obj);
        return {
          p2: data.name,
          p3: data.price,
          p4: data.description,
        };
      };
      break;
    case 'guest':
      console.log('ATTACHING GUEST FILTER!...');
      req.filterData = (obj) => {
        const data = JSON.parse(obj);
        console.log(data);
        return {
          p2: data.name,
          p3: data.price,
        };
      };
      break;
    default:
      console.log('ATTACHING DEFAULT FILTER!...');
      req.filterData = (data) => {
        return data;
      };
      break;
  }
  next();
}

module.exports = PolicyGuard;
