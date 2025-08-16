<?php
// getStream.php
// Recibe: ?id=175
// Devuelve: URL real del .m3u8 para canal 175

$id = intval($_GET['id'] ?? 0);
if ($id < 1) { http_response_code(400); exit('ID inválido'); }

$url = "https://thedaddy.top/Stream/stream-$id.php";
$html = @file_get_contents($url);

if (!$html) { http_response_code(404); exit('Canal no encontrado'); }

// Extraemos la URL de .m3u8 (primer match)
preg_match('#["\'](https?://[^"\']+\.m3u8[^"\']*)["\']#', $html, $m);
echo isset($m[1]) ? $m[1] : '';
?>
