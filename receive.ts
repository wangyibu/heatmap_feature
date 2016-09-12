namespace clickStatistics {



    interface IRandomClick {
        x: number;
        y: number;
    }

    export class Point implements IRandomClick {
        x: number;
        y: number;
        textNumber: string;
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;

        }

        init() {
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
        }
    }

    var aElementList: Element[] = [];
    var randomClickList: IRandomClick[] = [];

    // 生成随机点
    var randomClick = (num): Point => {
        var width = document.body.offsetWidth;
        var height = document.body.offsetHeight;
        var p = new Point(Math.random() * width, Math.random() * height);
        p.textNumber = num;
        p.init();
        return p;
    }

    
    function getClassElement(className):Element{
        return document.getElementsByClassName(className)[0];
    }

    var dataCollection = (logoName,headerMenuName, ulName, imageListName, InputListName:Array<string>) => {
        for (var i = 0; i < 10; i++) {
            randomClickList.push(randomClick(i));
        }
        

        var logoElement = getClassElement(logoName);
        var HeaderMenu = getClassElement(headerMenuName).getElementsByTagName('span');
        var listUlElement = getClassElement(ulName);

        var beginDateInput = document.getElementById(InputListName[0]);
        var endDateInput = document.getElementById(InputListName[1]);

    }

    var index = 10;

    document.onclick = function(event:MouseEvent){
        var x = event.pageX;
        var y = event.pageY;
        var p = new Point(x,y);
        p.textNumber = "" + index++;
        p.init();
        randomClickList.push(p);
        console.log(randomClickList);
    }

    dataCollection('top_brand_txt','top_brand_icon', 'home_banner_dian', 'brand_boxT', ['beginDate','endDate']);

    window.onresize = function () {
        var bannerBtnList = <HTMLElement>(document.getElementsByClassName("home_banner_dian")[0]);

        for (var i = 0; i < bannerBtnList.children.length; i++) {
            var aObject = <HTMLElement>(bannerBtnList.children[i]);
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
    }

}
