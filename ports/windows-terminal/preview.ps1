# ANSI chart only: no settings changes, downloads, or profile modifications.
$previewEscape = [char]27
$previewNames = @('black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white')

[Console]::WriteLine('Ultra Instinct / ANSI palette review')
[Console]::WriteLine('')
foreach ($previewOffset in @(30, 90)) {
    if ($previewOffset -eq 30) { [Console]::WriteLine('Normal colors') }
    else { [Console]::WriteLine('Bright colors') }
    for ($previewIndex = 0; $previewIndex -lt 8; $previewIndex++) {
        $previewCode = $previewOffset + $previewIndex
        $previewLabel = '{0,2} {1,-8}  src/focus.ts  12:34  One thing at a time' -f $previewCode, $previewNames[$previewIndex]
        [Console]::WriteLine("$previewEscape[$($previewCode)m$previewLabel$previewEscape[0m")
    }
    [Console]::WriteLine('')
}
[Console]::WriteLine("${previewEscape}[31mError${previewEscape}[0m  ${previewEscape}[33mWarning${previewEscape}[0m  ${previewEscape}[32mSuccess${previewEscape}[0m")
[Console]::WriteLine("${previewEscape}[30;47m Black on white ${previewEscape}[0m")
[Console]::WriteLine("${previewEscape}[37;40m White on black ${previewEscape}[0m")
[Console]::WriteLine("${previewEscape}[7m Reverse video ${previewEscape}[0m")
[Console]::WriteLine('Select this line to review selection. Keep the prompt visible to review the cursor.')
