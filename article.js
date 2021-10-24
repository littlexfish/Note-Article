
function replaceArticle() {
  let queryString = new URLSearchParams(window.location.search);
  let id = queryString.get('id');
  if(id === undefined || id === null) {
    return;
  }
  let articleFilePath = 'article/' + id + '.html';
  
  //get article content
  getFileContent(articleFilePath, null, function(content) {
    let article = document.getElementsByClassName('article_content')[0];
    
	document.title = findName(id);
    article.innerHTML = xmlhttp.responseText;
  });
}


function findName(id) {
	if(id === undefined || id === null) return null;
	let ret;
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.overrideMimeType('application/json');
	xmlhttp.onreadystatechange = function() {
	  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
		let json = JSON.parse(xmlhttp.responseText);
		let allArticle = json['article'];
		for(let i = 0;i < allArticle.length;i++) {
			if(allArticle[i]['id'] == id) {
				ret = allArticle[i]['name'];
			}
		}
	  }
	}
	xmlhttp.open("GET", path, false);
	xmlhttp.send();
	return ret;
}


function parseArticleList(content) {
  let json = JSON.parse(content);

  let queryString = new URLSearchParams(window.location.search);
  let catagory = queryString.get('catagory');

  let catagoryChildren = [];
  let catagoryUrls = [];
  let articleChildren = [];
  let articleUrls = [];
  
  if(catagory === null) { //root
    return;
  }
  else {
    let jsonCatagory = json['catagory'];
    // children catagory
    for(let i = 0;i < jsonCatagory.length;i++) {
      let cata = jsonCatagory[i];
      let parentCata = cata['parent'];
      if((parentCata === undefined || parentCata === null) && parentCata != catagory) continue;
      let visable = cata['visable'];
      if(visable === 'undefine' && visable == false) continue;
      let name = cata['name'];
      catagoryChildren.push(name);
      catagoryUrls.push(window.location.href.split('?')[0] + '?catagory=' + name);
    }

    let jsonArticle = json['article'];
    //children article
    for(let i = 0;i < jsonArticle.length;i++) {
      let articleInfo = jsonArticle[i];
      let cata = articleInfo['catagory'];
      if(cata != 'catagory') continue;
      let visable = articleInfo['visable'];
      if(visable === 'undifine' || visable == false) continue;
      let name = articleInfo['name'];
      let id = articleInfo['id'];
      articleChildren.push(name);
      articleUrls.push(window.location.href.split('?')[0] + '?id=' + id);
    }
  }

  let listElement = document.getElementsByClassName('article_list')[0];

  listElement.innerHTML = '<div class="list_catagory"></div><div class="list_article"></div>';
  
  //list children catagory
  if(catagoryChildren.length !== 0) {
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


function getFileContent(path, mimeType, callback) { //callback need content as parameter
  let xmlhttp = new XMLHttpRequest();
  if(mimeType !== null) xmlhttp.overrideMimeType(mimeType);
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          callback(xmlhttp.responseText);
      }
  }
  xmlhttp.open("GET", path, true);
  xmlhttp.send();
}


function loadList() {
  getFileContent('article_list.json', 'application/json', parseArticleList)
}


loadList();
replaceArticle();

