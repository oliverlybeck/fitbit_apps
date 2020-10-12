<html>
 <head>
  <title>PHP Test</title>
 </head>
 <body>
 <?php 
	echo "Hello WOrld";
	echo "appending line to test.txt";
	$fp = fopen('test.txt', 'a');
	$data = $_GET['hello'];
	fwrite($fp, $data);
?> 
 </body>
</html>
