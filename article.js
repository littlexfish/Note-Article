function replaceArticle(title, htmlElement) {
    let article = document.getElementsByClassName('article')[0];

    document.title = title;
    article.innerHTML = htmlElement;
}


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

        let ret = '<div class="article_title">' + json['title'] + '</div>';
        ret += '<div class="article_keywords" style="font-size: 6px;">' + json['keywords'] + '</div>';

        let contentJson = json['content'];

        ret += '<div class="article_content">'
        for (let i = 0; i < contentJson.length; i++) {
            let current = contentJson[i];
            let type = current['type'];
            let insert;
            if (type === 'text') insert = getInsertText(current);
            else if (type === 'image') insert = getInsertImage(current);
            else if (type === 'html') insert = getInsertHtmlElement(current);
            if (insert !== undefined) {
                ret += insert;
            }
        }
        ret += '</div>';

        replaceArticle(json['title'], ret);
    });
}


function getInsertText(currentJsonObj) {
    if (currentJsonObj['type'] !== 'text') return null;
    let textStyle = currentJsonObj['style'];
    let textText = currentJsonObj['text'];
    let wrap = currentJsonObj['wrap'];
    let ret = '<div';
    if (typeof textStyle === 'string') {
        ret += ' class="' + textStyle + '"';
    }
    ret += '>' + textText;
    if (typeof wrap === 'boolean' && wrap) {
        ret += '<br>';
    }
    ret += '</div>';
    return ret;
}

function getInsertImage(currentJsonObj) {
    if (currentJsonObj['type'] !== 'image') return null;
    let imageSrc = currentJsonObj['src'];
    let imageWidth = currentJsonObj['width'];
    let imageAlt = currentJsonObj['alt'];
    let imageTitle = currentJsonObj['title'];
    let imageLazy = currentJsonObj['lazy'];
    let ret = '<img';
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
    ret += '></img>';
    return ret;
}

function getInsertHtmlElement(currentJsonObj) {
    if (currentJsonObj['type'] !== 'html') return null;
    let htmlElement = currentJsonObj['element'];
    let htmlAttr = currentJsonObj['attr'];
    let needTail = currentJsonObj['needTail'];
    let ret = '<' + htmlElement;
    if (htmlAttr !== undefined && htmlAttr !== null) {
        ret += ' ' + htmlAttr;
    }
    ret += '>';
    if (typeof needTail === 'boolean' && !needTail) {
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


loadHtmlFromJson();

