
//NOTE: This javascript file need load first on defer


function linkTo(direct) {
  window.location.href = direct;
}

function linkToRoot() {
    linkTo('https://littlexfish.github.io/Note-Article');
}

function getPathAbsolute(path) {
    return 'https://littlexfish.github.io/Note-Article/' + path;
}

function linkToAbsolute(path) {
    linkTo(getPathAbsolute(path));
}

function linkToRelative(path) {
    linkTo(path);
}

function attachMIcon(className = 'svg_icon', scaleX = 1, scaleY = 1) {
	let svgElement = document.getElementsByClassName(className);
	
	//svg html
	let svgHTML = '<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">\
	  <g transform="scale(' + scaleX + ',' + scaleY + ')">\
      <rect x="-0" y="0" width="500" height="500" style="fill: rgb(200, 200, 255);"></rect>\
      <g transform="matrix(0.996195, -0.087155, 0.087155, 0.996195, -12.104853, 12.753579)">\
        <title>L</title>\
        <path style="fill-opacity: 0; stroke: rgb(50, 80, 255); stroke-width: 10; stroke-linecap: round; stroke-linejoin: round;" d="M 80 60 L 80 230 L 200 230"></path>\
        <text style="white-space: pre; fill: rgb(50, 80, 255); font-family: Arial, sans-serif; font-size: 20px;" transform="matrix(0.999848, 0.017452, -0.017452, 0.999848, 89.490303, 219.565964)" bx:origin="0.523 0.5">ittle<tspan x="0" dy="1em">​</tspan></text>\
      </g>\
      <g transform="matrix(0.996195, 0.087156, -0.087156, 0.996195, 14.007491, -30.824299)">\
        <title>F</title>\
        <path style="fill-opacity: 0; stroke: rgb(50, 80, 255); stroke-width: 10; stroke-linecap: round; stroke-linejoin: round;" d="M 420 60 L 300 60 L 300 230"></path>\
        <path style="fill: rgb(216, 216, 216); stroke: rgb(50, 80, 255); stroke-width: 10; stroke-linecap: round;" d="M 300 150 L 420 150"></path>\
        <text style="white-space: pre; fill: rgb(50, 80, 255); font-family: Arial, sans-serif; font-size: 20px;" x="307.652" y="83.496">ish</text>\
      </g>\
      <g style="">\
        <title>Fish</title>\
        <path style="fill: rgb(100, 150, 255); stroke: rgb(50, 80, 255); stroke-width: 5;" d="M 40 380 C 80 330 120 310 200 310 C 280 310 320 330 380 380 L 460 440 L 460 320 L 380 380 C 320 430 280 450 200 450 C 120 450 80 430 40 380 Z"></path>\
        <path style="fill-opacity: 0; stroke: rgb(50, 80, 255); stroke-width: 5;" d="M 100 330 C 120 350 120 410 100 430"></path>\
        <circle style="fill: rgb(50, 80, 255);" cx="80" cy="360" r="5"></circle>\
      </g>\
	  </g>\
    </svg>';
	
	for(let i = 0;i < svgElement.length;i++) {
		svgElement.item(i).innerHTML = svgHTML;
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

function top_bar_render() {
  getFileContent('part/top_bar.html', null, function(content) {
    document.getElementsByClassName('top_bar')[0].innerHTML = content;
  });
}

function sidebar_render() {
  getFileContent('part/sidebar.html', null, function(content) {
	document.getElementsByClassName('sidebar')[0].innerHTML = content;
  });
}

//render top bar

attachMIcon('svg_icon', 0.05, 0.05);


//render sidebar



