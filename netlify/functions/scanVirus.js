const fetch = require('node-fetch');

export async function handler(event, context) {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: "API_KEY is not defined"
    };
  }

  // exemple : appel à ton API avec apiKey
  const response = await fetch("https://example.com/api", {
    headers: { "Authorization": `Bearer ${apiKey}` }
  });
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}

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
