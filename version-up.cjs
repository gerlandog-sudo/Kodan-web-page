const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, 'package.json');
const versionJsonPath = path.resolve(__dirname, 'src/assets/version.json');

// Leer package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Incrementar versión (patch)
const versionParts = packageJson.version.split('.');
versionParts[2] = parseInt(versionParts[2]) + 1;
const newVersion = versionParts.join('.');

packageJson.version = newVersion;

// Guardar package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Crear/Actualizar version.json para el frontend
const versionInfo = {
  version: newVersion,
  buildDate: new Date().toISOString(),
  environment: 'production'
};

if (!fs.existsSync(path.dirname(versionJsonPath))) {
  fs.mkdirSync(path.dirname(versionJsonPath), { recursive: true });
}

fs.writeFileSync(versionJsonPath, JSON.stringify(versionInfo, null, 2));

console.log(`Versión actualizada a: ${newVersion}`);
