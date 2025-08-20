const fetch = require('node-fetch'); // Si nécessaire, sinon Netlify l'inclut

exports.handler = async function(event, context) {
  try {
    const { fileHash } = JSON.parse(event.body); // ou autre info du fichier

    // Appel à l'API VirusTotal
    const response = await fetch(`https://www.virustotal.com/api/v3/files/${fileHash}`, {
      headers: {
        'x-apikey': process.env.VT_API_KEY, // clé stockée dans Netlify
      },
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};