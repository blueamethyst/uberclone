//import CryptoES from 'crypto-es';

const crypto = require('crypto');

function makeSignature(method: string, url: string): string {
    const space = " ";				// one space
    const newLine = "\n";				// new line

    const timestamp = Date.now().toString();			// current timestamp (epoch)
    const accessKey = process.env.SNES_AUTH_KEY;			// access key id (from portal or Sub Account)
    const secretKey = process.env.SNES_SECRET_KEY;			// secret key (from portal or Sub Account)



    //const hmac = CryptoES.algo.HMAC.create(CryptoES.algo.SHA256, secretKey);
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);

    //var hash = hmac.finalize();
    //return hash.toString(CryptoES.enc.Base64);

    var hash = hmac.digest('base64');
    return hash;
}


export default makeSignature;