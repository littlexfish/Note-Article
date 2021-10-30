

function error() {
    let queryString = new URLSearchParams(window.location.search);
    let id = queryString.get('errorid');

    let ErrorMsg;
    let ErrorCode;
    switch (id) {
        case '0':
            ErrorMsg = '疑? 好像出了什麼問題';
            ErrorCode = 404;
            break;
        case '1':
            ErrorMsg = '文章不存在';
            ErrorCode = 404;
            break;
        case '2':
            ErrorMsg = '';
            ErrorCode = 404;
            break;
        case '404notfound':
            ErrorMsg = '為什麼會覺得打404notfound有東西呢?'
            ErrorCode = 404;
    }

    document.getElementsByClassName('error_code')[0].innerHTML = ErrorCode
    document.getElementsByClassName('error_content')[0].innerHTML = ErrorMsg

}

error()