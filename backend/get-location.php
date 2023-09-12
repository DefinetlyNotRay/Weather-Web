<?php
require '../connection.php'; // Include your database connection file

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $location = $_POST['location'];
    echo "Received location: " . $location;

    // Use prepared statements to prevent SQL injection
    $stmt = $connect->prepare("INSERT INTO locations (location_name) VALUES (?)");
    $stmt->bind_param("s", $location);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }

    $stmt->close();
    $connect->close();
} else {
    echo json_encode(['success' => false]);
}
?>
