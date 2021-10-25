

function parseArticleList(content) {
  let json = JSON.parse(content);

  let queryString = new URLSearchParams(window.location.search);
  let catagory = queryString.get('catagory');

  let catagoryChildren = [];
  let catagoryUrls = [];
  let articleChildren = [];
  let articleUrls = [];
  
  if(catagory === undefined || catagory === null) { //root
    let jsonCatagory = json['catagory'];
	// children catagory
    for(let i = 0;i < jsonCatagory.length;i++) {
      let cata = jsonCatagory[i];
      let parentCata = cata['parent'];
      if(parentCata === undefined || parentCata === null) {
		let visible = cata['visible'];
		if(visible === undefined || visible === null || visible == false) continue;
		let name = cata['name'];
		catagoryChildren.push(name);
		catagoryUrls.push(window.location.href.split('?')[0] + '?catagory=' + name);
	  }
    }

    let jsonArticle = json['article'];
    //children article
    for(let i = 0;i < jsonArticle.length;i++) {
      let articleInfo = jsonArticle[i];
      let cata = articleInfo['catagory'];
	  if(cata === undefined || cata === null) {
		let visible = articleInfo['visible'];
		if(visible === undefined || visible === null || visible == false) continue;
		let name = articleInfo['name'];
		let id = articleInfo['id'];
		articleChildren.push(name);
		articleUrls.push('article.html?id=' + id);
	  }
    }
	
  }
  else {
    let jsonCatagory = json['catagory'];
    // children catagory
    for(let i = 0;i < jsonCatagory.length;i++) {
      let cata = jsonCatagory[i];
      let parentCata = cata['parent'];
      if(parentCata === undefined || parentCata === null || parentCata != catagory) continue;
      let visible = cata['visible'];
      if(visible === undefined || visible === null || visible == false) continue;
      let name = cata['name'];
      catagoryChildren.push(name);
      catagoryUrls.push(window.location.href.split('?')[0] + '?catagory=' + name);
    }

    let jsonArticle = json['article'];
    //children article
    for(let i = 0;i < jsonArticle.length;i++) {
      let articleInfo = jsonArticle[i];
      let cata = articleInfo['catagory'];
	  if(cata === undefined || cata === null || cata != catagory) continue;
      let visible = articleInfo['visible'];
      if(visible === undefined || visible === null || visible == false) continue;
      let name = articleInfo['name'];
      let id = articleInfo['id'];
      articleChildren.push(name);
      articleUrls.push('./article.html?id=' + id);
    }
  }

  let listElement = document.getElementsByClassName('article_list')[0];
  
  //list children catagory
  if(catagoryChildren.length !== 0) {
	listElement.innerHTML += '<div class="list_catagory"></div>'
    let listCatagory = document.getElementsByClassName('list_catagory')[0];
    listCatagory.innerHTML = '子分類<ul class="catagory_ul">';
    for(let i = 0;i < catagoryChildren.length;i++) {
      let name = catagoryChildren[i];
      let urlLink = catagoryUrls[i];
      listCatagory.innerHTML += '<li><a href="' + urlLink + '">' + name + '</a></li>';
    }
    listCatagory.innerHTML += '</ul>';
  }
  
  //list children article
  if(articleChildren.length !== 0) {
	listElement.innerHTML += '<div class="list_article"></div>'
    let listArticle = document.getElementsByClassName('list_article')[0];
    listArticle.innerHTML = '文章<ul class="article_ul">';
    for(let i = 0;i < articleChildren.length;i++) {
      let name = articleChildren[i];
      let urlLink = articleUrls[i];
      listArticle.innerHTML += '<li><a href="' + urlLink + '">' + name + '</a></li>';
    }
    listArticle.innerHTML += '</ul>';
  }
  
}


function loadList() {
  getFileContent('article_list.json', 'application/json', parseArticleList)
}



loadList();

