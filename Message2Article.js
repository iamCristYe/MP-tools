// ==UserScript==
// @name         Message2Article
// @namespace    https://github.com/iamCristYe/MP-tools
// @version      1501980136.0
// @description  Automatically build article from messages.
// @author       Crist
// @match        https://mp.weixin.qq.com/cgi-bin/message?*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function Message2Article() {
        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        if (getParameterByName("count") != "1000") {
            window.location.href = "https://mp.weixin.qq.com/cgi-bin/message?t=message/list&count=1000&day=7&token=" + getParameterByName('token');
        }
        else {
            var MessageArray = [].slice.call(document.getElementsByClassName("message_item"));
            var resultArray = [];
            for (var index = 0; index < MessageArray.length; index++) {
                var tmp = {};

                //get UserID
                if (MessageArray[index].getElementsByTagName("a").length == 9) {          //for images
                    tmp.UserID = MessageArray[index].getElementsByTagName("a")[4].getAttribute("data-fakeid");
                }
                else {       //for texts and expired image
                    tmp.UserID = MessageArray[index].getElementsByTagName("a")[2].getAttribute("data-fakeid");
                }
                //tmp.UserName = MessageArray[index].getElementsByTagName("a")[2].innerText;

                tmp.TimeID = MessageArray[index].getAttribute("data-id");;
                tmp.Message = MessageArray[index].getElementsByClassName("wxMsg")[0].innerText;

                //expired image
                if (tmp.Message == "") tmp.Message = "(expired image)"

                //get image URL
                if (MessageArray[index].getElementsByClassName("appmsgSendedItem")[0] != null)
                    tmp.pic = "https://mp.weixin.qq.com" + MessageArray[index].getElementsByClassName("appmsgSendedItem")[0].getElementsByTagName("a")[0].getAttribute("href");

                resultArray.push(tmp);
            }
            resultArray.sort((a, b) => {
                if (a.UserID < b.UserID) {
                    return -1;
                }
                if (a.UserID > b.UserID) {
                    return 1;
                }
                if (a.TimeID < b.TimeID) {
                    return -1;
                }
                if (a.TimeID > b.TimeID) {
                    return 1;
                }
            });

            console.log(resultArray);

            var newHTML = ""; var lastUser = resultArray[0].UserID;
            for (var index = 0; index < resultArray.length; index++) {
                if (resultArray[index].UserID != lastUser) newHTML += "------<br>"; lastUser = resultArray[index].UserID;

                if (resultArray[index].pic != null) newHTML += "<img src=" + resultArray[index].pic + "><br>";
                else newHTML += resultArray[index].Message + "<br>";

            }

            var win = window.open();
            win.document.body.innerHTML = newHTML;
        }
    }

    setInterval(() => { Message2Article(); }, 10000);
})();
