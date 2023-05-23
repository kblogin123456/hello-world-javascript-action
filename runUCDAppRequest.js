import fetch from 'node-fetch';

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
