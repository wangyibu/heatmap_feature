module demo {
    export class Demo {
    export var setIframeHeight = function (iframe) {
        var foreignObject = document.getElementById('foreignId');
        var svg = document.getElementsByTagName("svg")[0];

        if (iframe) {
            var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
            if (iframeWin.document.body) {
                iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
                foreignObject.setAttribute("height", iframe.height);
                svg.setAttribute("height", iframe.height);
            }
        }
    };
}





function changeImage() {
    var foreignObject = document.getElementById('foreignId');
    var iframe = foreignObject.getElementsByTagName('iframe')[0];
    // iframe.

}
}


window.onload = () => {
    demo.setIframeHeight(document.getElementById('external-frame'));
};