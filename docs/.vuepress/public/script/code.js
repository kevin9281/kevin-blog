window.onload = function () {
    var num = document.getElementsByClassName("post-num")
    // console.log(num); // HTMLCollection []
    // console.log(typeof num); // object
    // console.log(num.length); // 0
    function f() {
        /* console.log(num); */
        for (var i = 0; i < num.length; i++) {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            var a = Number(Math.random().toFixed(1));
            if (a == 0) {
                a = 1
            }
            /* console.log(r, g, b, a); */
            num[i].style.backgroundColor = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        }
        // 隐藏头像
        var headImg = document.getElementsByClassName("personal-img");
        headImg[0].style.display = 'none';
        // 隐藏头像标题
        var headTitle = document.getElementsByClassName("name");
        /* console.log(headTitle); */
        headTitle[0].style.display = 'none';
        // 隐藏头像标题下面 hr
        var fistHr = document.getElementsByTagName('hr');
        console.log(fistHr);
        fistHr[5].style.display = 'none';
    }
    setTimeout(f, 20);
}