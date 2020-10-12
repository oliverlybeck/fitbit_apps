<?php
	$log = fopen("php_log", "a");
	
	$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

	if ($contentType === "application/json") {
		$content = trim(file_get_contents("php://input"));
		$decoded = json_decode($content, true);

	if(! is_array($decoded)) {
		$output = "data appended" . PHP_EOL;
		fwrite($log, $output);
		fwrite($log, $decoded);
	} else {
		$error = "ERROR, bad json or smthing" . PHP_EOL;
		fwrite($log, $error);
	}
	}
?>
