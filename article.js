
function replaceArticle() {
  let queryString = window.location.search;
  let id = queryString['id'];
  if(id === 'undefined') {
    return;
  }
  let articleFilePath = 'article/' + id + '.html';
  
  //get article content
  getFileContent(articleFilePath, function(content) {
    let content = document.getElementById('article_content');
    
    conetnt.innerHTML = xmlhttp.responseText;
  });
}


function parseArticleList(content) {
  let json = JSON.parse(content);

  let queryString = window.location.search;
  let catagory = queryString['catagory'];

  let catagoryChildren = [];
  let catagoryUrls = [];
  let articleChildren = [];
  let articleUrls = [];

  if(catagory === 'undefined') { //root
    return;
  }
  else {
    let jsonCatagory = json['catagory'];
    // children catagory
    for(let i = 0;i < jsonCatagory.length;i++) {
      let cata = jsonCatagory[i];
      let parent = cate["parent"];
      if(parent === 'undefined' && parent != catagory) continue;
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

  let listElement = document.getElementById('article_list');

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


function getFileContent(path, callback) { //callback need content as parameter
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.overrideMimeType("application/json");
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          callback(xmlhttp.responseText);
      }
  }
  xmlhttp.open("GET", path, true);
  xmlhttp.send();
}




