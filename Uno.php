<?php
// getStream.php?id=175
$id = intval($_GET['id'] ?? 0);
$html = file_get_contents("https://thedaddy.top/Stream/stream-$id.php");
// Extraemos la línea que contiene .m3u8
preg_match('#["\']([^"\']+\.m3u8[^"\']*)["\']#', $html, $m);
echo $m[1] ?? '';
?>
