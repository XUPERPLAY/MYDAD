<?php
// getStream.php
$id = intval($_GET['id'] ?? 0);
if ($id < 1) { http_response_code(400); exit('ID inválido'); }

// Descargamos la página del canal
$html = @file_get_contents("https://thedaddy.top/Stream/stream-$id.php");

// Capturamos cualquier .m3u8 sin importar el dominio
preg_match('#https://[^"\']+\.m3u8[^"\']*#', $html, $matches);

echo isset($matches[0]) ? $matches[0] : '';
?>
