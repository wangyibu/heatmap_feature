var clickStatistic;
(function (clickStatistic) {
    var demo;
    (function (demo) {
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
                div.style.zIndex = '9999';
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
        demo.Point = Point;
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
        var recurrentPoint = function (aElementList) {
            aElementList.forEach(function (item, index) {
                var p = new Point(item.x, item.y);
                p.textNumber = index + "ul";
                p.init();
            });
        };
        function getClassElement(className) {
            return document.getElementsByClassName(className)[0];
        }
        function getBoundingClientRect(item) {
            if (item instanceof Element) {
                return {
                    x: item.getBoundingClientRect().left,
                    y: item.getBoundingClientRect().top
                };
            }
            else {
                return null;
            }
        }
        var dataCollection = function (logoName, headerMenuName, ulName, imageListName, InputListName) {
            for (var i = 0; i < 10; i++) {
                randomClickList.push(randomClick(i));
            }
            var logoElement = getClassElement(logoName);
            var HeaderMenu = getClassElement(headerMenuName).getElementsByTagName('span');
            var listUlElement = getClassElement(ulName);
            var beginDateInput = document.getElementById(InputListName[0]);
            var endDateInput = document.getElementById(InputListName[1]);
            aElementList.push(getBoundingClientRect(logoElement));
            for (var i = 0; i < HeaderMenu.length; i++) {
                aElementList.push(getBoundingClientRect(HeaderMenu[i]));
            }
            console.log(aElementList);
            recurrentPoint(aElementList);
        };
        var index = 10;
        document.onclick = function (event) {
            var x = event.pageX;
            var y = event.pageY;
            var p = new Point(x, y);
            p.textNumber = "" + index++;
            p.init();
            randomClickList.push(p);
            console.log(randomClickList);
        };
        dataCollection('top_brand_txt', 'top_brand_icon', 'home_banner_dian', 'brand_boxT', ['beginDate', 'endDate']);
        window.onresize = function () {
            // 重绘位置
            // var bannerBtnList = <HTMLElement>(document.getElementsByClassName("home_banner_dian")[0]);
            // for (var i = 0; i < bannerBtnList.children.length; i++) {
            //     var aObject = <HTMLElement>(bannerBtnList.children[i]);
            //     aObject.style.fontSize = '18px';
            // }
            // var top = document.getElementById('imageId').getBoundingClientRect().top + document.body.scrollTop;
            // var left = document.getElementById('imageId').getBoundingClientRect().left;
            // var currentPageWidth = document.body.offsetWidth;
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
    })(demo = clickStatistic.demo || (clickStatistic.demo = {}));
})(clickStatistic || (clickStatistic = {}));
