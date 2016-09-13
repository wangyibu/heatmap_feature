function update(item, currentPageWidth, arr) {
    if (currentPageWidth < 1290) {
        obj[item.className] = [];
        return;
    } else {
        var top = item.getBoundingClientRect().top + document.body.scrollTop;
        var left = item.getBoundingClientRect().left;

        if (currentPageWidth > 1290 && currentPageWidth <= 1903) {
            obj[item.className].push({
                'minWidth': 1290,
                'maxWidth': currentPageWidth,
                'left': left,
                'top': top
            });
        }
        if (currentPageWidth == 1903) {
            console.log(obj);
        }
    }
}

var aList = document.getElementsByClassName('top_brand_icon')[0].getElementsByTagName('span');
var obj = {};
for(var i = 0;i<aList.length;i++){
    obj[aList[i].className] = [];
}


function resetClickPosition(){
    
}


window.onresize = function () {
    var currentPageWidth = document.body.offsetWidth;
    // var idList = ['imageId0', 'imageId1', 'imageId2', 'imageId3', 'imageId4',
    //     'imageId5', 'imageId6', 'imageId7', 'imageId8', 'imageId9',
    //     'imageId10', 'imageId11', 'imageId12', 'imageId13',
    //     'imageId14', 'imageId15', 'imageId16', 'imageId17',
    //     'imageId18', 'imageId19'];

    for(var i = 0;i<aList.length;i++){
        update(aList[i],currentPageWidth);
    }

    // aList.forEach(function (item, index) {
    //     update(item, currentPageWidth);
    // });
}


