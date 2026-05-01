<?php
/**
 * Servicio de Integración KODAN-HUB v3.5
 */

require_once 'config.php';

class HubService {
    private $hubUrl = "https://hub.pmaasglobal.com/api/handshake";
    private $appId = "KODAN-WEB-INSTITUTIONAL";

    public function performHandshake() {
        $pdo = getDbConnection();
        
        // Obtener configuración local
        $stmt = $pdo->prepare("SELECT * FROM hub_config WHERE app_id = ?");
        $stmt->execute([$this->appId]);
        $config = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$config || $config['status'] == 'pending' || empty($config['app_token'])) {
            return $this->registerWithHub($pdo);
        }

        return $config['app_token'];
    }

    private function registerWithHub($pdo) {
        $payload = json_encode([
            'app_id' => $this->appId,
            'timestamp' => time()
        ]);

        $ch = curl_init($this->hubUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        
        $response = curl_exec($ch);
        $data = json_decode($response, true);
        curl_close($ch);

        if (isset($data['token'])) {
            $stmt = $pdo->prepare("UPDATE hub_config SET app_token = ?, status = 'active' WHERE app_id = ?");
            $stmt->execute([$data['token'], $this->appId]);
            return $data['token'];
        }

        throw new Exception("Fallo en el Handshake con KODAN-HUB");
    }
}
