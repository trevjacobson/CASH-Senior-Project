<?php
	$msg = 'yes';
	
	if(isset($_POST['writeRequest'])) {
		$msg = $msg . ' ' . $_POST['writeRequest'];
		if(isset($_POST['requestValue'])) {
			$msg = $msg . ' Valueis: ' . $_POST['requestValue'];
		}
	}
	
	echo $msg;
	
?>
