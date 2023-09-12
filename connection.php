<?php
echo "Script is running.";
$connect = mysqli_connect('localhost','root','','weather');

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}
?>