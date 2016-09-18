// ==UserScript==
// @name         Alis.io Skin Rotator
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Skin Rotator, probably have errors.
// @author       MiyakeDev
// @author       master2500
// @match        http://alis.io/*
// @grant        none
// ==/UserScript==

var rotatorcss = 'rotator.css';
var rotatorjs = 'rotator.js';

var styleh = document.createElement('style');
styleh.id = 'imgHeight';

var rotatorcss = document.createElement('link');
rotatorcss.rel = 'stylesheet';
rotatorcss.href = css;

var rotatorjs = document.createElement("script");
rotatorjs.type = "text/javascript";
rotatorjs.src = js;

$("head").append(styleh);
$("script:last").after(rotatorcss);
$("script:last").after(rotatorjs);
