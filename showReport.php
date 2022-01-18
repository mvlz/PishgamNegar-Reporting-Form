<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pishgamnegar</title>
    <link rel="stylesheet" href="assets/styles/style.css">
    <link href="assets/styles/gridjs-mermaid.min.css" rel="stylesheet" />
</head>

<body class="show-page">
    <header class="header-container">
    <a href="https://pishgamnegar.com">
            <img src="assets/Img/pn-logo.png" alt="پیشگام نگار" class="logo">
        </a>
        <a href="index.html" class="backBtn">
            بازگشت
            <span class="icon-Arrow---Left-2-1"></span>
        </a>
    </header>
    <?php require 'report.php' ?>
    <div class="container">
        <!-- Report detail top of the grid js -->
        <section class="top-details">
            <h2 class="detail-title">گزارش <?php echo $gridJsHeaderType ?> از <?php echo $gridJsHeaderRange ?> <?php echo $gridJsHeaderFrom ?> تا <?php echo $gridJsHeaderTo ?></h2>
        </section>
        <!-- Grid js  -->
        <div id="showReportModal"></div>
        <!-- Report detail bottom of the grid js -->
        <section class="bottom-details">
            <div class="detail-container">
                <h3 class="detail-title">مجموع پرداختی ها به تفکیک روش پرداخت</h3>
                <ul class="payment-list"></ul>
            </div>
            <div class="detail-container">
                <h3 class="detail-title">خلاصه گزارش</h3>
                <ul class="summary-list"></ul>
            </div>
        </section>
    </div>
    <!-- <div class="toast">
        <p class="notice"></p>
        <div class="toast-body"></div>
        <div class="close"></div>
    </div> -->
    <script src="js/gridjs.umd.js"></script>
    <script>
        new gridjs.Grid({
            columns: <?php echo $columns ?>,
            data: <?php echo $data ?>,
            sort: true,
            search: true,
            resizable: true,
            pagination: {
                enabled: true,
                limit: 15,
                summary: true,
            },
            language: {
                'search': {
                    'placeholder': 'جستجو...'
                },
                sort: {
                    sortAsc: 'مرتب سازی به صورت صعودی',
                    sortDesc: 'مرتب سازی به صورت نزولی',
                },
                'pagination': {
                    'previous': 'قبلی',
                    'next': 'بعدی',
                    navigate: (page, pages) => `صفحه ${page} از ${pages}`,
                    page: (page) => `صفحه ${page}`,
                    'showing': 'نمایش',
                    'of': 'از',
                    'to': 'تا',
                    'results': () => 'نتیجه'
                },
                'loading': 'در حال بارگذاری...',
                'noRecordsFound': 'نتیجه‌ای یافت نشد.',
                'error': '.هنگام دریافت داده‌ها خطایی رخ داد',

            },
        }).render(document.getElementById('showReportModal'));
        /* Show toast 
            let finalNotOk = [91705, 91701, 91695, 91692, 91691];
            const notice = document.querySelector('.notice');

            if (finalNotOk.length == 0) {
                notice.innerText = 'بررسی نهایی تمامی سفارشات OK است'
            } else {
                notice.innerText = `سفارشات زیر را بررسی کنید.  (${finalNotOk.length})`
                finalNotOk.forEach(id => {
                    const item = document.createElement('p')
                    item.innerHTML = `${id}`
                    document.querySelector('.toast-body').appendChild(item)
                });
            }

        //Close toast
            const closeBtn = document.querySelector('.close')
            closeBtn.addEventListener('click', () => {
                closeBtn.parentElement.classList.add('slide-out')
                setTimeout(() => {
                    closeBtn.parentElement.style.display = 'none';
                }, 750);
            }) 
        */
        // Footer details data
        const infoArray = <?php echo $gridJsInfoArray ?>;
        
        // Append items to DOM lists
        function appendListItem(params) {
            if (params) {
                const item = document.createElement("li")
                item.innerText = `${params.title}: ${params.value}`
                document.querySelector(`.${params.list}-list`).appendChild(item)
            }
        }
        // Footer details box
        const footerDetails = document.querySelector(".bottom-details") 

        // Showing footer lists condition
        infoArray !== "NULL" ? infoArray.forEach(obj => appendListItem(obj)) : footerDetails.style.display = "none";

    </script>
</body>
</html>