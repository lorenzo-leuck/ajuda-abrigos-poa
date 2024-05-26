const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

function xorEncryptDecrypt(data, password) {
  const dataBytes = new Uint8Array(data);
  const passwordBytes = new TextEncoder().encode(password);
  const output = new Uint8Array(dataBytes.length);

  for (let i = 0; i < dataBytes.length; i++) {
    output[i] = dataBytes[i] ^ passwordBytes[i % passwordBytes.length];
  }

  return output;
}

exports.toHex = (obj, password) => {
  // let jsonString = JSON.stringify(obj);
  let encoder = new TextEncoder();
  let data = encoder.encode(obj);
  
  let encryptedData = xorEncryptDecrypt(data, password);

  return Array.prototype.map.call(encryptedData, x => ('00' + x.toString(16)).slice(-2)).join('');
}



exports.fromHex = (hex, password) => {
  if (typeof hex !== 'string') {
    return null;
  }

  try {
    const bytes = new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    const decryptedData = xorEncryptDecrypt(bytes, password);


    const decoder = new TextDecoder();
    const decodedString = decoder.decode(decryptedData);

    return decodedString
  } catch (error) {
    console.error('Could not decode the string:', error);
    return null;
  }
};