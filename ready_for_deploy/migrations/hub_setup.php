<?php
/**
 * Migración: Configuración de KODAN-HUB
 */

require_once __DIR__ . '/../api/config.php';

try {
    $pdo = getDbConnection();
    
    $sql = "CREATE TABLE IF NOT EXISTS hub_config (
        id INT AUTO_INCREMENT PRIMARY KEY,
        app_id VARCHAR(100) NOT NULL,
        app_token VARCHAR(255),
        status ENUM('pending', 'active', 'maintenance') DEFAULT 'pending',
        last_sync TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $pdo->exec($sql);
    
    // Insertar APP_ID inicial para KODAN-WEB si no existe
    $stmt = $pdo->prepare("INSERT IGNORE INTO hub_config (app_id) VALUES (?)");
    $stmt->execute(['KODAN-WEB-INSTITUTIONAL']);
    
    echo "Migración de HUB completada. Tabla 'hub_config' lista.";
} catch (PDOException $e) {
    die("Error en la migración de HUB: " . $e->getMessage());
}
