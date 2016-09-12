var clickStatistics;
(function (clickStatistics) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.prototype.init = function () {
            // 添加样式
            var div = document.createElement('div');
            div.innerText = this.textNumber;
            div.style.textAlign = 'center';
            div.style.color = 'white';
            div.style.fontSize = '10px';
            div.style.zIndex = '1000';
            div.setAttribute('data-point', 'cp');
            div.style.position = 'absolute';
            div.style.left = this.x + 'px';
            div.style.top = this.y + 'px';
            div.style.backgroundColor = 'red';
            div.style.height = '15px';
            div.style.width = '15px';
            div.style.borderRadius = '50%';
            document.body.appendChild(div);
        };
        return Point;
    }());
    clickStatistics.Point = Point;
    var aElementList = [];
    var randomClickList = [];
    // 生成随机点
    var randomClick = function (num) {
        var width = document.body.offsetWidth;
        var height = document.body.offsetHeight;
        var p = new Point(Math.random() * width, Math.random() * height);
        p.textNumber = num;
        p.init();
        return p;
    };
    var dataCollection = function (headerMenuName, ulName, imageListName, InputListName) {
        for (var i = 0; i < 10; i++) {
            randomClickList.push(randomClick(i));
        }
    };
    var index = 10;
    document.onclick = function (event) {
        var x = event.clientX;
        var y = event.clientY;
        var p = new Point(x, y);
        p.textNumber = "" + index++;
        p.init();
        randomClickList.push(p);
        console.log(randomClickList);
    };
    dataCollection(null, null, null, null);
    window.onresize = function () {
        var bannerBtnList = (document.getElementsByClassName("home_banner_dian")[0]);
        for (var i = 0; i < bannerBtnList.children.length; i++) {
            var aObject = (bannerBtnList.children[i]);
            aObject.style.fontSize = '18px';
        }
        var top = document.getElementById('imageId').getBoundingClientRect().top + document.body.scrollTop;
        var left = document.getElementById('imageId').getBoundingClientRect().left;
        var currentPageWidth = document.body.offsetWidth;
        // if (currentPageWidth > 1290 || currentPageWidth < 1903) {
        //     aElementList.push({
        //         'minWidth': 1290,
        //         'maxWidth': currentPageWidth,
        //         'left': left,
        //         'top': top
        //     });
        // }
        // if (currentPageWidth == 1903) {
        //     console.log(aElementList);
        // }
    };
})(clickStatistics || (clickStatistics = {}));
