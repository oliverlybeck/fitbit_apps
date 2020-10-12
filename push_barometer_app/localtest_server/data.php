<?php
$log = fopen('php_log', 'a');
if (isset($_GET["hello"])) {
        $fp = fopen('test.txt', 'w');
        $data = $_GET["hello"];
        fwrite($fp, $data);
	$output = "data appended!" . PHP_EOL;
	fwrite($log, $output);
} else {
	$output = "fallback as _hello_ variable does not exist!" . PHP_EOL;
}	fwrite($log, $output);
?>
