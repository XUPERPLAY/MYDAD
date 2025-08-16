<?php
// cors.php – proxy CORS de 12 líneas
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
$url = $_GET['url'] ?? '';
if (!filter_var($url, FILTER_VALIDATE_URL)) { http_response_code(400); exit('Bad URL'); }

$ch = curl_init($url);
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_USERAGENT      => $_SERVER['HTTP_USER_AGENT'] ?? 'Mozilla/5.0'
]);
echo curl_exec($ch);
curl_close($ch);
?>
