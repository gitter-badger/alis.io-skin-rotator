$(document).ready(function() {
function addZero(i) {
if (i < 10) {
i = "0" + i;
}
return i;
}
var today = new Date();
var h = addZero(today.getHours());
var m = addZero(today.getMinutes());
var time = h + ":" + m + " ";
if(window.console){window.console.log("%c" + time + "%cMiyakeDev : " + "%cHello, Thank you for downloading this userscript, I hope to be to your liking.","color:#6f6f6f; font-size:12px; font-style:italic;","color:#4caf50; font-size: 14px;","color:#444444; font-size: 13px;");}

$("#mainPanel").after(
'<div id="skinrotator">' +
'<div class="card card-nav-tabs">' +
'<div class="content" style="min-height:auto;">' +
'<div class="header header-success">' +
'<div class="nav-tabs-navigation">' +
'<div class="nav-tabs-wrapper">' +
'<ul class="nav nav-tabs" data-tabs="tabs">' +
'<li class="active skins">' +
'<a data-toggle="tab" aria-expanded="true">skin rotator<div class="ripple-container">' +
'</div></a></li></ul></div></div></div>' +
'<div class="form-group">' +
'<input id="albumID" type="text" placeholder="Imgur skins album ID" class="form-control">' +
'</div>' +
'<div class="form-group">' +
'<input id="interval" type="text" placeholder="Interval (ms)" class="form-control">' +
'</div>' +
'<div class="form-group">' +
'<input id="key" type="text" placeholder="Hotkey" class="form-control" maxlength="1">' +
'</div>' +
'<button id="skinChangerButton" class="btn btn-info btn-skin" style="width:100%!important;">start</button>' +
'<span id="version">version 1.7</span>' +
'</div></div><img id="height" src></div>' 
);

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var keys=getCookie("key");
    if (keys != "") {
        $('#key').val(String.fromCharCode(unescape(atob(keys))));
        $("#key").bind("keyup",function(e){
            if (e.keyCode > 64 && e.keyCode < 91) {
                keys = btoa(escape(e.keyCode));
                setCookie("key", keys, 30);
            }
        });
    } else {
        $('#key').val("");
        $("#key").bind("keyup",function(e){
            if (e.keyCode > 64 && e.keyCode < 91) {
                keys = btoa(escape(e.keyCode));
                setCookie("key", keys, 30);
            }
        });
    }
}

checkCookie()

var current = 0;
var mainInterval;
var ci = setInterval(function()
{
        clearInterval(ci);
        $('#albumID').val(localStorage.getItem('album'));
        $('#interval').val(localStorage.getItem('interval'));
        $('#skinChangerButton').on('click', this, function()
        {
            if ($('#skinChangerButton').text() == 'start')
            {
                if ($("#albumID").val().indexOf("imgur") !== -1) {
                    var dataURL = $('#albumID').val();
                    var data = dataURL.substr(dataURL.lastIndexOf("/") + 1, dataURL.length);
                } else {
                    var data = $('#albumID').val();
                }
                $.ajax(
                {
                    url: 'https://api.imgur.com/3/album/' + data + '/images',
                    type: 'GET',
                    dataType: 'json',
                    beforeSend: function(xhr)
                    {
                        xhr.setRequestHeader('Authorization', 'Client-ID 3d3ef891ffc63d7');
                    },
                    success: function(data)
                    {
                        $('#skinChangerButton').text('stop');
                        $('#skinChangerButton').css('background-color', '#f44336');
                        $('#skinChangerButton').css('box-shadow', '0 2px 2px 0 rgba(244, 67, 54, 0.14), 0 3px 1px -2px rgba(244, 67, 54, 0.2), 0 1px 5px 0 rgba(244, 67, 54, 0.12)');                
                        for (var i = 0; i < data.data.length; i++)
                        {
                            var img = new Image();
                            img.src = data.data.link;
                        }
                        localStorage.setItem('album', $('#albumID').val());
                        localStorage.setItem('interval', $('#interval').val());
                        mainInterval = setInterval(function()
                        {
                            $("#skin_url").val(data.data[current].link);
                            if ($("#overlays").css('display') == 'none')
                            {
                                document.querySelector('button[data-itr="play"]').click();
                            }
                            $('img#preview-img').prop('src', data.data[current].link);
                            current++;
                            if (current == data.data.length)
                            {
                                current = 0;
                            }
                        }, parseInt($('#interval').val()));
                    },
                    error: function()
                    {
                        window.console.error("%c" + time + "%cMiyakeDev : " + "%cFailed to fetch images from imgur, Try Again.","color:#6f6f6f; font-size:12px; font-style:italic;","color:#4caf50; font-size: 14px;","color:#f55145; font-size: 13px;");
                    }
                });
            }
            else
            {
                clearInterval(mainInterval);
                $('#skinChangerButton').text('start');
                $('#skinChangerButton').css('background-color', '#03a9f4');
                $('#skinChangerButton').css('box-shadow', '0 2px 2px 0 rgba(3, 169, 244, 0.14), 0 3px 1px -2px rgba(3, 169, 244, 0.2), 0 1px 5px 0 rgba(3, 169, 244, 0.12)');
            }
        });
}, 100);


window.addEventListener('keydown', keydown);
function keydown(e) {
    if (e.keyCode === $('#key').val().toUpperCase().charCodeAt(0) && $('#overlays').css('display') == 'none' && $('#chatboxArea2').css('display') == 'none' && !($("#key").is(":focus"))) 
    {
        $("#skinChangerButton").click();
    }
}

var currentsize = 252; // Default size //

function imgHeight( element, height ) {
$("#imgHeight").text( "img#height{display:block;height:" + currentsize + "px;width:255px;visibility:hidden}" );
}

imgHeight();

//setInterval(function() {
//if ($("#mainPanel").height() !== currentsize) {
//imgHeight( "#mainPanel", $("#mainPanel").height() );
//currentsize = $("#mainPanel").height();
//};
//}, 1);
})
