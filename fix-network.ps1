# fix-network.ps1 - Run as Administrator
# Resets common Windows network settings and collects diagnostics for saifstudio.vercel.app

$OutFile = "$PSScriptRoot\network_diagnostics.txt"
function Write-Out {
  param($s)
  $s | Out-File -FilePath $OutFile -Append -Encoding utf8
  Write-Host $s
}

If (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
  Write-Host "Please run this script as Administrator: Right-click PowerShell -> Run as Administrator"
  exit 1
}

Write-Out "=== Starting network fixes at $(Get-Date) ==="

Write-Out "`n-- ipconfig /flushdns --"
ipconfig /flushdns 2>&1 | Out-File -FilePath $OutFile -Append -Encoding utf8

Write-Out "`n-- netsh winsock reset --"
netsh winsock reset 2>&1 | Out-File -FilePath $OutFile -Append -Encoding utf8

Write-Out "`n-- netsh int ip reset --"
netsh int ip reset 2>&1 | Out-File -FilePath $OutFile -Append -Encoding utf8

Write-Out "`n-- netsh winhttp reset proxy --"
netsh winhttp reset proxy 2>&1 | Out-File -FilePath $OutFile -Append -Encoding utf8

Write-Out "`n-- ipconfig /all --"
ipconfig /all 2>&1 | Out-File -FilePath $OutFile -Append -Encoding utf8

Write-Out "`n-- nslookup saifstudio.vercel.app --"
nslookup saifstudio.vercel.app 2>&1 | Out-File -FilePath $OutFile -Append -Encoding utf8

Write-Out "`n-- tracert saifstudio.vercel.app (may take time) --"
tracert saifstudio.vercel.app 2>&1 | Out-File -FilePath $OutFile -Append -Encoding utf8

Write-Out "`n-- Test HTTP connectivity --"
try {
  curl -v https://saifstudio.vercel.app 2>&1 | Out-File -FilePath $OutFile -Append -Encoding utf8
} catch {
  Write-Out "curl not available; running Test-NetConnection"
  Test-NetConnection -TraceRoute -InformationLevel "Detailed" -ComputerName saifstudio.vercel.app | Out-File -FilePath $OutFile -Append -Encoding utf8
}

Write-Out "`n-- Done at $(Get-Date). Output saved to $OutFile --"
Write-Host "Diagnostics saved to: $OutFile"
