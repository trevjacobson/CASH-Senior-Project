<?php
	// connect to the database
	$db = new SQLite3( '/home/pi/CASH_DB.db' );
	// query
	$result = $db->query("SELECT * from settings");
	
	// Create array to keep all results
	$data = array();
	
	// Fetch Associated Array (1 for SQLITE3_ASSOC)
	while($res = $result->fetchArray(1))
	{
		// insert row into array
		array_push($data, $res);
	}
	
	// return json array
	echo json_encode($data);
	

	/* Old way of printing
	// output the result
	while($row = $result->fetchArray())
	{
		var_dump($row["id"]);
	}
	* */
?>
