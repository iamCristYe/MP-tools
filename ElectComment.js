// ==UserScript==
// @name         ElectComment
// @namespace    https://github.com/iamCristYe/MP-tools
// @version      7.0
// @description  Automatically elect new comments.
// @author       Crist
// @match        https://mp.weixin.qq.com/misc/appmsgcomment?action=list_latest_comment*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function eventFire(el, etype) {
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }

    function Elect() {
        if (document.getElementsByClassName('jsNewElect').length) {                                         //comment(s) to be elcted exist(s)
            eventFire(document.getElementsByClassName('jsNewElect')[0], 'click');
            window.setTimeout(Elect, 2000);
        } else {
            console.log("No comment to be elected.");
            setInterval(() => {
                if (document.getElementById("js_div_newnum").style.display == "block") location.reload();   //new comment appears
            }, 1000);
            setTimeout(() => {
                location.reload();                                                                          //in case of no activity log out
            }, 800000);
        }
    }

    setTimeout(() => { Elect(); }, 5000);
})();
