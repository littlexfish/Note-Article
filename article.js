
function replaceArticle(title, htmlElement) {
    let article = document.getElementsByClassName('article')[0];

    document.title = title;
    article.innerHTML = htmlElement;
}


function loadHtmlFromJson() {
    let queryString = new URLSearchParams(window.location.search);
    let id = queryString.get('id');
    id = '-1';
    if (id === undefined || id === null) {
        return;
    }
    let articleFilePath = 'article/' + id + '.json';

    //get article content
    getFileContent(articleFilePath, 'application/json', function (content) {

        let json = JSON.parse(content);

        let article = document.getElementsByClassName('article')[0];

        document.title = json['title'];
        article.innerHTML = '<div class="article_title">' + json['title'] + '</div>';
        article.innerHTML += '<div class="article_keywords">' + json['keywords'].toString().replace(',', ', ') + '</div>';

        let contentJson = json['content'];

        let other = false;

        article.innerHTML += '<div class="article_content"></div>';
        let inner = document.getElementsByClassName('article_content')[0];
        for (let i = 0; i < contentJson.length; i++) {
            let current = contentJson[i];
            let type = current['type'];
            let insert;
            if (type === 'text') {
                insert = getInsertText(current, other);
                other = false;
            }
            else if (type === 'image') {
                insert = getInsertImage(current);
                other = true;
            }
            else if (type === 'html') {
                insert = getInsertHtmlElement(current);
                other = true;
            }
            if (insert !== undefined) {
                inner.innerHTML += insert;
            }
        }
    });
}


function getInsertText(currentJsonObj, isOther) {
    if (currentJsonObj['type'] !== 'text') return null;
    let textStyle = currentJsonObj['style'];
    let textText = currentJsonObj['text'];
    let wrap = currentJsonObj['wrap'];
    let ret = '';
    if (typeof textStyle === 'string') {
        ret += '<div class="block styled" style="' + textStyle + '"' + '>';
        ret += textText;
        ret += '</div>';
    }
    else {
        if (isOther || typeof wrap === 'boolean' && wrap) {
            ret += '<div class="block">'
            ret += textText;
            ret += '</div>';
        }
        else {
            let blockEle = document.querySelectorAll('.block, .block.styled');
            if(blockEle.length === 0) {
                ret += '<div class="block">';
                ret += textText;
                ret += '</div>';
            }
            else {
                blockEle[blockEle.length - 1].innerHTML += textText;
            }
        }
    }

    return ret;
}

function getInsertImage(currentJsonObj) {
    if (currentJsonObj['type'] !== 'image') return null;
    let imageSrc = currentJsonObj['src'];
    let imageWidth = currentJsonObj['width'];
    let imageAlt = currentJsonObj['alt'];
    let imageTitle = currentJsonObj['title'];
    let imageLazy = currentJsonObj['lazy'];
    let ret = '<img class="can_zoom"';
    if (typeof imageSrc === 'string') {
        ret += ' src="' + imageSrc + '"';
    }
    if (imageWidth !== undefined && imageWidth !== null) {
        ret += ' width="' + imageWidth + '"';
    }
    if (imageAlt !== undefined && imageAlt !== null) {
        ret += ' alt="' + imageAlt + '"';
    }
    if (imageTitle !== undefined && imageTitle !== null) {
        ret += ' title="' + imageTitle + '"';
    }
    if (typeof imageLazy === 'boolean' && imageLazy) {
        ret += ' loading="lazy"';
    }
    ret += ' onclick="showImg(\'' + imageSrc + '\',\'' + imageTitle + '\',\'' + imageAlt + '\');"';
    ret += '></img>';
    return ret;
}

function getInsertHtmlElement(currentJsonObj) {
    if(currentJsonObj['type'] !== 'html') return null;
    let htmlElement = currentJsonObj['element'];
    let htmlAttr = currentJsonObj['attr'];
    let needTail = currentJsonObj['needTail'];
    let ret = '<' + htmlElement;
    if (htmlAttr !== undefined && htmlAttr !== null) {
        ret += ' ' + htmlAttr;
    }
    ret += '>';
    if (typeof needTail === 'boolean' && !needTail) {
        let cnt = currentJsonObj['content'];
        if (cnt !== undefined && cnt !== null) {
            ret += cnt;
        }
        ret += '</' + htmlElement + '>';
    }
    return ret;
}

function linkToCategory() {
    let queryString = new URLSearchParams(window.location.search);
    let id = queryString.get('id');
    if (id === undefined || id === null) {
        return;
    }

    getFileContent('article_list.json', 'application/json', function(content) {
        let json = JSON.parse(content);
        let articleJson = json['article'];

        for(let i = 0;i < articleJson.length;i++) {
            let idJson = articleJson[i]['id'];
            let cate = articleJson[i]['category'];
            if(idJson === id) {
                if(cate === undefined || cate === null) linkToAbsolute('list.html');
                else linkToAbsolute('list.html?category=' + cate);
                return;
            }
        }
    });

}

function showImg(src, title, alt) {

    let inner = document.getElementsByClassName("text")[0];

    let html = '<div class="zoom_img_bk" ondblclick="closeZoomImg();"><div class="zoom_img_text">按兩下關閉</div><img class="zoom_img" alt="' + alt + '" src="' + src + '"';
    if(title !== undefined && title !== null) html += ' title="' + title + '"';
    html += '></img></div>';

    inner.innerHTML += html;
}

function closeZoomImg() {
    document.getElementsByClassName('zoom_img_bk')[0].remove();
}

loadHtmlFromJson();

