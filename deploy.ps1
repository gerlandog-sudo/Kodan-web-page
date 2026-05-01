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

# 4. Copiar Archivos Compilados (Frontend)
Write-Host "Empaquetando Frontend..." -ForegroundColor Yellow
Copy-Item -Path "dist/*" -Destination $deployDir -Recurse

# 5. Copiar Backend (PHP)
Write-Host "Empaquetando Backend..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "$deployDir/api"
Copy-Item -Path "api/*" -Destination "$deployDir/api" -Recurse

# 6. Compilar y Empaquetar Sanity Studio
Write-Host "Compilando Sanity Studio..." -ForegroundColor Yellow
Set-Location studio
npm run build
Set-Location ..
New-Item -ItemType Directory -Path "$deployDir/studio"
Copy-Item -Path "studio/dist/*" -Destination "$deployDir/studio" -Recurse

# 7. Copiar Migraciones (Solo si es necesario para el server)
Write-Host "Empaquetando Migraciones..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "$deployDir/migrations"
Copy-Item -Path "migrations/*" -Destination "$deployDir/migrations" -Recurse

# 7. Limpieza Final
Write-Host "Limpieza completada." -ForegroundColor Green
Write-Host "El paquete está listo en: ./$deployDir" -ForegroundColor Cyan
