<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pishgam Negar</title>
    <link rel="stylesheet" href="./style.css">
    <link href="assets/Styles/gridjs-mermaid.min.css" rel="stylesheet" />

</head>

<body class="show-page">

    <header class="header-container">
        <img src="assets/Img/pn-logo.png" alt="" class="logo">
        <a href="index.html" class="backBtn">
            بازگشت
            <span class="icon-Arrow---Left-2-1"></span>
        </a>

    </header>

    <div id="showReportModal"></div>
    <?php
    require 'report.php';
    echo "
    <script src='js/gridjs.umd.js'></script>
    <script>
        // =-=-=-=-=-=-=  Grid JS  =-=-=-=-=-=-=//
        new gridjs.Grid({
            columns: $columnsList,
            data: $data,
            sort: true,
            search: true,
            autoWidth: true,
            pagination: {
                'enabled': 'true',
                'limit': '15',
                'summary': 'true'
            },
            language: {
                'search': {
                    'placeholder': 'جستجو...'
                },
            },
            style: {
                table: {
                    'margin': 'auto',
                    'font-size': '1rem',
                    'white-space': 'nowrap'
                },
                th: {
                    'color': '#000',
                    'border-bottom': '3px solid #ccc',
                    'text-align': 'center',
                    'width': '100%'
                },
                td: {
                    'text-align': 'center',
                    'padding': '5px'
                },
            },

        }).render(document.getElementById('showReportModal'));
        </script>"
    ?>
</body>

</html>