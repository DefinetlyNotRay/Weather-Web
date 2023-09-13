<?php
echo "Script is running.";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['location_name'])) {
    $location_name = $_POST['location_name'];
    $connect = mysqli_connect('localhost', 'root', '', 'weather');

    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        exit();
    }

    $location_name = mysqli_real_escape_string($connect, $location_name);

    $query = "INSERT INTO locations (location_name) V ALUES ('$location_name')";
    mysqli_query($connect, $query);
    mysqli_close($connect);
}
?>
