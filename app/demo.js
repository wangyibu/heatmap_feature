var demo;
(function (demo) {
    var Demo = (function () {
        function Demo() {
        }
        return Demo;
    }());
    demo.Demo = Demo;
    demo.setIframeHeight = function (iframe) {
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
})(demo || (demo = {}));
function changeImage() {
    var foreignObject = document.getElementById('foreignId');
    var iframe = foreignObject.getElementsByTagName('iframe')[0];
    // iframe.
}
window.onload = function () {
    demo.setIframeHeight(document.getElementById('external-frame'));
};
