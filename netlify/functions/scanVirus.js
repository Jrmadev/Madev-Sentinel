const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const VT_API_KEY = process.env.VT_API_KEY; // récupère la clé depuis Netlify
  const data = JSON.parse(event.body);
  
  // Exemple : appel API VirusTotal
  const response = await fetch('https://www.virustotal.com/api/v3/files', {
    method: 'POST',
    headers: {
      'x-apikey': VT_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
