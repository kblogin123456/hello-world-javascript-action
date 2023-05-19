// const { https } = require("https");
// const { HttpClient } = require("@actions/http-client");

// async function main() {
//   // Create a new HTTP client
//   const client = new HttpClient();

//   // Set the URL of the endpoint to PUT to
//   const url = "https://10.134.119.177:8443/cli/applicationProcessRequest/request";

//   // Create the request body
//   const body = {
//     "application": "MYAPP",
//     "applicationProcess": "DEPLOY-HFS",
//     "environment": "DEV",
//     "onlyChanged": false,
//     "versions": [
//       {
//         "version": "hfs_only_rabo_uid",
//         "component": "MYCOMP"
//       }
//     ]
//   };

//   // Create the credentials object
//   const credentials = {
//     username: "admin",
//     password: "admin",
//   };

//   // Make the PUT request
//   const response = await client.put(url, body, credentials);

//   // Check the response status code
//   if (response.status === 200) {
//     console.log("PUT request succeeded");
//   } else {
//     console.log(`PUT request failed with status code ${response.status}`);
//   }
// }

// main();
//  
const fetch = require('node-fetch');

const apiUrl = 'https://10.134.119.177:8443/cli/applicationProcessRequest/request'; // Replace with your API URL

const data = {
    "application": "MYAPP",
    "applicationProcess": "DEPLOY-HFS",
    "environment": "DEV",
    "onlyChanged": false,
    "versions": [
      {
        "version": "hfs_only_rabo_uid",
        "component": "MYCOMP"
      }
    ]
  };

const username = 'admin'; // Replace with your username
const password = 'admin'; // Replace with your password

const authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

fetch(apiUrl, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': authHeader // Include the basic authentication header
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    console.log('API response:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
