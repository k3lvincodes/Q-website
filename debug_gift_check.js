const https = require('https');

const API_KEY = "6ece41f867d1956740303cb69af21b36abd355d563903207ed1d2bfedaa20715";
const HOSTNAME = "api.joinq.ng";
const PATH = "/api/gifts/claim";
const GIFT_CODE = "3B1ZESI8";

// We need a valid token to even check the gift (as per the API flow).
// Since we don't have a way to generate a valid token programmatically without credentials, 
// we will rely on the fact that the API returns 404 WITHOUT a token if the path is wrong, 
// OR it might return 401. 
// BUT, the previous log showed:
// Proxy: Auth header present: true
// Proxy: External API response status: 404
// Proxy: External API response body: { error: 'Gift not found' }
// This implies the Token WAS accepted, and the API Key WAS accepted, but the Gift Code was looked up and not found.

// To verify this independent of the frontend, I'll attempt a request. 
// I'll grab the token from the user's previous log if possible, but that's expired.
// I'll try to reach the endpoint with a dummy token. If it says "Invalid Token" (401), I know I hit the server.
// If it says "Gift not found" (404), then the gift is missing.

function checkGift() {
    const body = JSON.stringify({ gift_code: GIFT_CODE });
    const options = {
        hostname: HOSTNAME,
        path: PATH,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'Authorization': 'Bearer fake_token_for_debug'
        }
    };

    console.log(`Checking Gift: ${GIFT_CODE} at https://${HOSTNAME}${PATH}`);

    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log(`Status: ${res.statusCode}`);
            console.log("Response:", data);
        });
    });

    req.on('error', (e) => {
        console.error(`Error: ${e.message}`);
    });

    req.write(body);
    req.end();
}

checkGift();
