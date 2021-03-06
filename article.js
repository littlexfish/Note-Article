
function loadHtmlFromJson() {
    let queryString = new URLSearchParams(window.location.search);
    let id = queryString.get('id');
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
    }, function (status) {
        if(status === 404) {
            linkToAbsolute('error.html?errorid=1');
        }
    });
}

function getInsertText(currentJsonObj, isOther) {
    if (currentJsonObj['type'] !== 'text') return null;
    let textClass = currentJsonObj['class'];
    let textStyle = currentJsonObj['style'];
    let textText = currentJsonObj['text'];
    let wrap = currentJsonObj['wrap'];
    let ret = '';
    if (typeof textStyle === 'string' || typeof textClass === 'string') {
        ret += '<div class="block';
        if(textStyle !== undefined && textStyle !== null) {
            ret += ' styled';
        }
        if(textClass !== undefined && textClass !== null) {
            ret += ' ' + textClass;
        }
        ret += '"';
        if(textStyle !== undefined && textStyle !== null) {
            ret += ' style="' + textStyle + '"';
        }
        ret += '>' + textText;
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
    ret += ' onclick="showImg(\'' + imageSrc + '\',\'' + imageAlt + '\');"';
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
    if (typeof needTail === 'boolean' && needTail) {
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
            if(idJson === parseInt(id)) {
                if(cate === undefined || cate === null) linkToAbsolute('list.html');
                else linkToAbsolute('list.html?category=' + cate);
                return;
            }
        }
    });

}

function showImg(src, alt) {

    let inner = document.getElementsByClassName("img_show")[0];

    let html = '<div class="zoom_img_bk animate_img" ondblclick="closeZoomImg();"><div class="zoom_img_text">???????????????</div><img class="zoom_img" alt="' + alt + '" src="' + src + '"';
    html += '></img></div>';

    inner.innerHTML = html;
    inner.style += 'transition: padding-top 1s;padding-top: 0;'
    console.log(inner.style)


}

function closeZoomImg() {
    document.getElementsByClassName('zoom_img_bk')[0].remove();
}

loadHtmlFromJson();

