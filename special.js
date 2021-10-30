
//NOTE: Date of month and date start from 0
const theDates = [
    ['halloween', new Date(2021, 9, 30), new Date(2021, 10, 1)],
    ['christmas', new Date(2021, 11, 25), new Date(2021, 11, 26)],
];

function loadSpecialThings() {
    let now = new Date(Date.now()).getTime();

    for(let dateIndex in theDates) {
        let dateArray = theDates[dateIndex];
        let name = dateArray[0];
        let startDate = dateArray[1].getTime();
        let endDate = dateArray[2].getTime();
        if(startDate <= now && now < endDate) {
            let head = document.head;
            let style = document.createElement('link');
            style.rel = 'stylesheet';
            style.href = 'css/special/' + name + '.css';
            head.appendChild(style);
            // head.innerHTML += '<link rel="stylesheet" href="css/special/' + name + '.css">';

            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    let body = document.body;
                    let special = document.createElement('div');
                    special.className = 'special';
                    special.innerHTML = xmlhttp.responseText;
                    body.appendChild(special);
                    // setTimeout(function () {
                    //     for (var link of document.querySelectorAll("link[rel=stylesheet]")) {
                    //         link.href = link.href.replace(/\?.*|$/, "?" + Date.now())
                    //     }
                    // }, 5000);

                }
            }
            xmlhttp.open("GET", 'css/special/' + name + '.html', true);
            xmlhttp.send();
        }
    }

}

loadSpecialThings()

