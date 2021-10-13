$images = Get-ChildItem ..\public\images\untradables\png
foreach ($img in $images) {
  $outputName = $img.DirectoryName + "\" + $img.BaseName + ".webp"
  cwebp -q 80 $img.FullName -o $outputName
}