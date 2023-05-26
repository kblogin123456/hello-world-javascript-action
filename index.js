// const application = process.env.INPUT_APPLICATION;
// const applicationProcess = process.env.INPUT_APPLICATIONPROCESS;
// const environment = process.env.INPUT_ENVIRONMENT;
// const onlyChanged = process.env.INPUT_ONLYCHANGED === 'true';
// const versions = process.env.INPUT_VERSIONS.split(',');
// const hostname = process.env.INPUT_HOSTNAME;
// const port = process.env.INPUT_PORT;
// const username = process.env.INPUT_USERNAME;
// const password = process.env.INPUT_PASSWORD;
// const component = process.env.INPUT_COMPONENT;

const hostname = "10.134.119.177"
const port = "8443"
const username = 'admin';
const password = 'admin';
const application = 'MYAPP';
const applicationProcess = 'DEPLOY-HFS ';
const environment = 'DEV';
const onlyChanged = false;
const versions = 'hfs_only_rabo_uid'.split(',');
const component = 'MYCOMP';
let requestId='';
let intervalId; 
const https = require('https'); 
import('node-fetch')
.then((module) => {
  const fetch = module.default;   
  const apiUrl = 'https://'+hostname+':'+port+'/cli/applicationProcessRequest/request'; 

  const data = {
    "application": application,
    "applicationProcess": applicationProcess,
    "environment": environment,
    "onlyChanged": onlyChanged,
    "versions": versions.map(version => ({
      "version": version,
      "component": component
    }))
  };


  const authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false // Ignore SSL verification
  });

  fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader // Include the basic authentication header
    },
    body: JSON.stringify(data),
    agent: httpsAgent
  })
    .then(response => response.json())
    .then(result => {
      console.log('API response:', result);
      requestId = result.requestId;
      console.log('Request-ID:', requestId);
      intervalId = setInterval(triggerAPI, 5000);
    })
    .catch(error => {
      console.error('Error:', error);
    });
})
.catch((error) => {
  console.error('Error:', error);
});


function triggerAPI() {

  import('node-fetch')
  .then((module) => {
    console.log(" Will poll till completion of the UCD process with Request ID :- "+requestId);
    
    const fetch = module.default;     
    const authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    const apiUrl = 'https://'+hostname+':'+port+'/cli/applicationProcessRequest/requestStatus?request='+requestId
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
      },
      agent: httpsAgent
    })
      .then(response => response.json())
      .then(result => {
        console.log('API response:', result);
  
        if (result.status === 'CLOSED') {
          console.log('Status is CLOSED. Breaking the loop.');
          clearInterval(intervalId); // Clear the interval to stop the loop
        }
      })
      .catch(error => {
        console.error('Error:', error);
        process.exit(1); 
      });
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1); 
  });
}
  

