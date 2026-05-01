<?php
/**
 * Migración Inicial - Estructura de Base de Datos KODAN
 * Ejecutar este archivo directamente en el servidor para inicializar las tablas.
 */

require_once __DIR__ . '/../api/config.php';

try {
    $pdo = getDbConnection();
    
    // Ejemplo de creación de tabla para leads o contacto
    $sql = "CREATE TABLE IF NOT EXISTS contact_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $pdo->exec($sql);
    
    echo "Migración ejecutada con éxito. Tabla 'contact_requests' creada o ya existente.";
} catch (PDOException $e) {
    die("Error en la migración: " . $e->getMessage());
}
