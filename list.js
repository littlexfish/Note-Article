

function parseArticleList(content) {
    let json = JSON.parse(content);

    let queryString = new URLSearchParams(window.location.search);
    let category = queryString.get('category');

    let categoryChildren = [];
    let categoryUrls = [];
    let articleChildren = [];
    let articleUrls = [];

    if(category === undefined || category === null) { //root
        let jsonCategory = json['category'];
        // children category
        for(let i = 0;i < jsonCategory.length;i++) {
            let cate = jsonCategory[i];
            let parentCate = cate['parent'];
            if(parentCate === undefined || parentCate === null) {
                let visible = cate['visible'];
                if(visible === undefined || visible === null || visible === false) continue;
                let name = cate['name'];
                categoryChildren.push(name);
                categoryUrls.push(getPathAbsolute('list.html?category=' + name));
            }
        }

        let jsonArticle = json['article'];
        //children article
        for(let i = 0;i < jsonArticle.length;i++) {
            let articleInfo = jsonArticle[i];
            let cata = articleInfo['category'];
            if(cata === undefined || cata === null) {
                let visible = articleInfo['visible'];
                if(visible === undefined || visible === null || visible === false) continue;
                let name = articleInfo['name'];
                let id = articleInfo['id'];
                articleChildren.push(name);
                articleUrls.push('article.html?id=' + id);
            }
        }

    }
    else {
        let jsonCategory = json['category'];
        // children category
        for(let i = 0;i < jsonCategory.length;i++) {
            let cate = jsonCategory[i];
            let parentCate = cate['parent'];
            if(parentCate === undefined || parentCate === null || parentCate !== category) continue;
            let visible = cate['visible'];
            if(visible === undefined || visible === null || visible === false) continue;
            let name = cate['name'];
            categoryChildren.push(name);
            categoryUrls.push(getPathAbsolute('list.html?category=' + name));
        }

        let jsonArticle = json['article'];
        //children article
        for(let i = 0;i < jsonArticle.length;i++) {
            let articleInfo = jsonArticle[i];
            let cata = articleInfo['category'];
            if(cata === undefined || cata === null || cata !== category) continue;
            let visible = articleInfo['visible'];
            if(visible === undefined || visible === null || visible === false) continue;
            let name = articleInfo['name'];
            let id = articleInfo['id'];
            articleChildren.push(name);
            articleUrls.push('./article.html?id=' + id);
        }
    }

    let listElement = document.getElementsByClassName('article_list')[0];

    //list children category
    if(categoryChildren.length !== 0) {
        listElement.innerHTML += '<div class="list_category">'
        listElement.innerHTML += '子分類<ul class="category_ul">';
        for(let i = 0;i < categoryChildren.length;i++) {
            let name = categoryChildren[i];
            let urlLink = categoryUrls[i];
            listElement.innerHTML += '<li><a href="' + urlLink + '">' + name + '</a></li>';
        }
        listElement.innerHTML += '</ul></div>';
    }

    //list children article
    if(articleChildren.length !== 0) {
        listElement.innerHTML += '<div class="list_article">'
        listElement.innerHTML += '文章<ul class="article_ul">';
        for(let i = 0;i < articleChildren.length;i++) {
            let name = articleChildren[i];
            let urlLink = articleUrls[i];
            listElement.innerHTML += '<li><a href="' + urlLink + '">' + name + '</a></li>';
        }
        listElement.innerHTML += '</ul></div>';
    }

}

function loadList() {
    getFileContent('article_list.json', 'application/json', parseArticleList)
}

function linkToParentCategory() {
    let queryString = new URLSearchParams(window.location.search);
    let category = queryString.get('category');

    if(category === undefined || category === null) {
        alert('已經是根資料夾');
        return;
    }

    getFileContent('article_list.json', 'application/json', function (content) {

        let json = JSON.parse(content);
        let categoryJson = json['category'];

        for(let i = 0;i < categoryJson.length;i++) {
            let name = categoryJson[i]['name'];
            if(name === category) {
                let parent = categoryJson[i]['parent'];
                if(parent === undefined || parent === null) linkToAbsolute('list.html');
                else linkToAbsolute('list.html?category=' + parent);
                break;
            }
        }
    });

}

function closeRootButton() {
    let queryString = new URLSearchParams(window.location.search);
    let category = queryString.get('category');

    if(category === undefined || category === null) {
        document.getElementsByClassName("back_button")[0].disabled = true;
    }
}

loadList();
closeRootButton();
