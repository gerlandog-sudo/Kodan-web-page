<?php
require_once 'config.php';

header('Content-Type: application/json');

$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Enrutador básico para la API corporativa
switch ($request) {
    case '/api/status':
        echo json_encode(["status" => "online", "version" => "1.0.0", "service" => "KODAN API"]);
        break;
    default:
        http_response_code(404);
        echo json_encode(["error" => "Endpoint no encontrado"]);
        break;
}
