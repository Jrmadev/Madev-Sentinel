async function scanIP() {
  const ip = document.getElementById("ipInput").value.trim();
  const result = document.getElementById("result");

  if (!ip) {
    result.innerHTML = "<p class='error'>Veuillez entrer une adresse IP.</p>";
    result.style.display = "block";
    return;
  }

  result.innerHTML = "Analyse en cours...";
  result.style.display = "block";

  try {
    const res = await fetch(`server.php?ip=${ip}`);
    const data = await res.json();

    if (data.error) throw new Error(data.error);

    // Exemple d'affichage résumé
    const stats = data.data.attributes.last_analysis_stats;
    result.innerHTML = `
      <h3>Résultat pour ${ip}</h3>
      <ul>
        <li><strong>Malveillants :</strong> ${stats.malicious}</li>
        <li><strong>Suspicious :</strong> ${stats.suspicious}</li>
        <li><strong>Propres :</strong> ${stats.harmless}</li>
        <li><strong>Non détectés :</strong> ${stats.undetected}</li>
      </ul>
      <a href="https://www.virustotal.com/gui/ip-address/${ip}" target="_blank">Voir le rapport complet</a>
    `;
  } catch (err) {
    result.innerHTML = `<p class='error'>Erreur : ${err.message}</p>`;
  }
}