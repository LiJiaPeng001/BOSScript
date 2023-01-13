// ==UserScript==
// @name         boss直聘批量投递工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  boss直聘批量投递
// @author       solenya
// @copyright       2015-2020, AC
// @require      http://code.jquery.com/jquery-2.1.1.min.js
// @match        https://www.zhipin.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

// js跨浏览器标签页通信 storage
// iframe
// 获取页面一的a标签，发送请求获取a标签对应的链接的数据，再从中得到立即沟通对应的请求，发送请求
// 写一个浏览器脚本，把以上三行代码放进去就行


// 定时器5s轮询一次，一旦有了跳出轮询，没有继续，10次后结束提示错误

(function () {
    'use strict';
    // 添加按钮
    var btn = document.createElement("button");
    btn.innerHTML = '批量投递'
    btn.style.position = 'fixed'
    btn.style.top = '45%'
    btn.style.left = '2%'
    btn.style.border = '1px solid white'
    btn.style.background = 'red'
    btn.style.font = '16px'
    btn.style.color = 'white'
    btn.style.padding = '5px'
    btn.style.borderRadius = '5%'
    document.body.append(btn)
    
    btn.onclick = () => {
        const ulList = document.getElementsByClassName('job-list-box')[0]
        const lilists = ulList.getElementsByTagName('li');

        const autoClick = (url) => {
            window.open(url)
        }
        const waitAutoClickArr = [];
        [...lilists].forEach(ele => {
            const a = ele.getElementsByTagName('a')[0]
            if (a) {
                waitAutoClickArr.push(a.href)
            }
        })
    
        waitAutoClickArr.forEach((ele, index) => {
            autoClick(ele);
        })
    }

    function fetch() {
        const btn = document.getElementsByClassName('btn-container')[0]
        if (btn) {
            const aLink = btn.getElementsByClassName('btn-startchat')[0]
            if (aLink) {
                aLink.click()
            } else {
                console.log('aLink挂了', aLink)
            }
        } else {
            console.log('btn挂了', btn)
        }

    }
    fetch()
    const timer = setInterval(() => {
        console.log('重新轮询')
        fetch()
        const textBtn = document.getElementsByClassName('btn-startchat')[0]
        const leftTitle = document.getElementsByClassName('left-title')[0]
        const dialogContainer = document.getElementsByClassName('dialog-container')[0]
        if (!textBtn && location.pathname === '/web/geek/job') {
            clearInterval(timer)
            console.log('是主页，不管他')
            return;
        }
        if (leftTitle) {
            clearInterval(timer)
            window.close()
            return;
        }
        if (dialogContainer) {
            clearInterval(timer)
            window.close();
            return;
        }
        if (textBtn.innerText === '继续沟通') {
            console.log('完事了')
            clearInterval(timer)
            window.close()
        }
    }, 1000);

})();
