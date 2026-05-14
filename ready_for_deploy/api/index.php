<?php
require_once 'config.php';

header('Content-Type: application/json');

$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Enrutador básico para la API corporativa
switch (strtok($request, '?')) {
    case '/api/status':
        echo json_encode(["status" => "online", "version" => "1.0.0", "service" => "KODAN API"]);
        break;
    case '/api/animations':
        $dir = '../assets/animations';
        $files = [];
        if (is_dir($dir)) {
            $scan = scandir($dir);
            foreach ($scan as $file) {
                if (preg_match('/\.(gif|webp)$/i', $file)) {
                    $files[] = '/assets/animations/' . $file;
                }
            }
        }
        echo json_encode($files);
        break;
    default:
        http_response_code(404);
        echo json_encode(["error" => "Endpoint no encontrado"]);
        break;
}
