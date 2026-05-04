$brainPath = "C:\Users\gerla\.gemini\antigravity\brain"
$outputPath = "c:\Proyectos Antigravity\KODAN\HISTORIAL_RECUPERADO.html"

$header = @"
<!DOCTYPE html>
<html>
<head>
<meta charset='UTF-8'>
<title>Recuperacion Historial KODAN</title>
<style>
body { font-family: sans-serif; background: #111; color: #eee; padding: 20px; }
.session { border: 1px solid #444; margin-bottom: 20px; padding: 15px; border-radius: 8px; }
.role { color: #00FFC2; font-weight: bold; }
pre { background: #000; padding: 10px; overflow: auto; border: 1px solid #333; white-space: pre-wrap; }
</style>
</head>
<body>
<h1>Historial Recuperado</h1>
"@

$footer = "</body></html>"
$content = ""

$dirs = Get-ChildItem $brainPath -Directory | Sort-Object LastWriteTime -Descending

foreach ($d in $dirs) {
    $lp = Join-Path $d.FullName ".system_generated\logs\overview.txt"
    if (Test-Path $lp) {
        $content += "<div class='session'><h2>Session: $($d.Name)</h2><p>Date: $($d.LastWriteTime)</p>"
        $lines = Get-Content $lp
        foreach ($l in $lines) {
            if ($l.Trim() -ne "") {
                try {
                    $j = $l | ConvertFrom-Json
                    if ($j.content) {
                        $currentRole = if ($j.type -eq "USER_INPUT") { "Usuario" } else { "AI" }
                        $cleanContent = $j.content.Replace("<", "&lt;").Replace(">", "&gt;")
                        $content += "<div><p class='role'>${currentRole}:</p><pre>$cleanContent</pre></div><hr>"
                    }
                } catch {}
            }
        }
        $content += "</div>"
    }
}

$final = $header + $content + $footer
$final | Out-File -FilePath $outputPath -Encoding UTF8
