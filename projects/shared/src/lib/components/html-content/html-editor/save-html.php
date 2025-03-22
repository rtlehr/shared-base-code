<?php

// Allow cross-origin requests (CORS) - Adjust this for security in production
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Get the raw JSON input from the Angular request
$data = json_decode(file_get_contents("php://input"), true);

// Validate that required fields are present
if (!$data || !isset($data['title']) || !isset($data['permission']) || !isset($data['content'])) {
    echo json_encode(["message" => "Invalid request - Missing required fields"]);
    http_response_code(400);
    exit();
}

// Sanitize the title to create a safe filename
$title = preg_replace('/[^a-zA-Z0-9_-]/', '', $data['title']); // Removes special characters
$permission = in_array($data['permission'], ['public', 'user', 'admin']) ? $data['permission'] : 'public';
$content = $data['content'];

// Define the directory where HTML files will be stored
$directory = __DIR__ . "/html_files/";
if (!file_exists($directory)) {
    mkdir($directory, 0777, true); // Create the directory if it doesn't exist
}

// Generate the filename based on the sanitized title
$filename = strtolower($title) . ".html";
$filePath = $directory . $filename;

// Generate the complete HTML document structure
$htmlTemplate = "<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>{$title}</title>
    <meta name='permission' content='{$permission}'>
    <link rel='stylesheet' href='styles.css'>
</head>
<body>
    <div class='content'>
        {$content}
    </div>
</body>
</html>";

// Write the content to the new HTML file
if (file_put_contents($filePath, $htmlTemplate) !== false) {
    echo json_encode(["message" => "File successfully created: {$filename}", "filename" => $filename]);
    http_response_code(201);
} else {
    echo json_encode(["message" => "Failed to write file"]);
    http_response_code(500);
}

?>
