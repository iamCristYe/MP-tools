// ==UserScript==
// @name         ElectComment
// @namespace    https://github.com/iamCristYe/MP-tools
// @version      4.0
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
        switch (document.getElementsByClassName('jsNewElect').length) {
            case 0:
                console.log("No comment to be elected.");

                setInterval(() => {
                    if (document.getElementById("js_div_newnum").style.display == "block") {
                        location.reload();
                    }
                }, 1000);

                setInterval(() => {
                    location.reload();         //in case of no activity log out          
                }, 900000);

                break;
            case 1:
                eventFire(document.getElementsByClassName('jsNewElect')[0], 'click');
                console.log("All comments elected.");
                break;
            default:
                eventFire(document.getElementsByClassName('jsNewElect')[0], 'click');
                window.setTimeout(Elect, 2000);
        }
    }

    setInterval(() => { Elect(); }, 5000);

})();
