# Protocolo de Despliegue Antigravity - Proyecto KODAN

Write-Host "Iniciando protocolo de despliegue..." -ForegroundColor Cyan

# 1. Incrementar Versión
Write-Host "Actualizando versión..." -ForegroundColor Yellow
node version-up.cjs

# 2. Compilar Frontend
Write-Host "Compilando aplicación Vue..." -ForegroundColor Yellow
npm run build

# 3. Preparar Directorio de Despliegue
$deployDir = "ready_for_deploy"
if (Test-Path $deployDir) {
    Remove-Item -Path $deployDir -Recurse -Force
}
New-Item -ItemType Directory -Path $deployDir

# 4. Copiar Archivos Compilados (Frontend + Backend API)
Write-Host "Empaquetando Plataforma..." -ForegroundColor Yellow
Copy-Item -Path "dist/*" -Destination $deployDir -Recurse -Force
if (Test-Path "api") {
    # Copiamos la carpeta API completa incluyendo archivos ocultos (.htaccess)
    Copy-Item -Path "api" -Destination $deployDir -Recurse -Force
}

# 5. Limpieza Final
Write-Host "Limpieza completada." -ForegroundColor Green
Write-Host "El paquete de la plataforma está listo en: ./$deployDir" -ForegroundColor Cyan
