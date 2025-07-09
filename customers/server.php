<?php
header('Content-Type: application/json');

if (!isset($_GET['ip']) || !filter_var($_GET['ip'], FILTER_VALIDATE_IP)) {
    echo json_encode(["error" => "IP invalide ou manquante."]);
    exit;
}

$ip = $_GET['ip'];
$apiKey = '71fdfb895c93a57f5210e3a60cc10bd29fc0595b3a331501a000c9bd0d20d1e9';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://www.virustotal.com/api/v3/ip_addresses/" . urlencode($ip));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "x-apikey: $apiKey"
]);

$response = curl_exec($ch);
curl_close($ch);
echo $response;
?>