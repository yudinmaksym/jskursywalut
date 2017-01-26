function init() {
    document.getElementById('divfornewkurs').innerHTML = "";
    document.getElementById('backtodatas').style.display = "none";
    var div = document.getElementById("divfornewkurs")
    div.winControl;
var oReq2 = new XMLHttpRequest();
    oReq2.open("GET", "http://www.nbp.pl/kursy/xml/dir.txt", false);
    oReq2.send(null);
    var dirresp = oReq2.responseText;
         
        var start = 0;
        var end = 11;
        var array = [];
        var res = dirresp.split("\r\n");
        for (i = 0; i < res.length; i++) {
            var sub = res[i].substr(5, 7)
            var typtabeli = res[i].substr(0,1)
            var year = sub.substr(0, 2)
            var month = sub.substr(2, 2)
            var day = sub.substr(4, 6)
            var onealldat = "Typ tabeli: " + typtabeli + " " + "Data: " + day + "-" + month + "-" + year;

            var opt = document.createElement('button');
            opt.id = "databutton";
            opt.name = res[i];
            opt.value = onealldat;
            opt.innerHTML = onealldat;
            
            div.appendChild(opt);
            WinJS.UI.processAll();



        }
}


function getAncestor(node, tagName) {
    tagName = tagName.toUpperCase();
    while (node) {
        if (node.nodeType == 1 && node.nodeName == tagName) {
            return node;
        }
        node = node.parentNode;
    }
    return null;
}



//element.onclick = function (event) {
//    event = event || window.event; // (*)
//    var target = $(event.target);
//    if (target.is("button")) {
//        printKurs(this.name);
//    }
//    // Теперь event - объект события во всех браузерах.
//};


    
function printKurs(name) {
    document.getElementById('divfornewkurs').innerHTML = "";
    document.getElementById('backtodatas').style.display = "block";
    var oReq3 = new XMLHttpRequest();
    oReq3.open("GET", "http://www.nbp.pl/kursy/xml/" + name + ".xml", false);
    var Array = [];
    oReq3.send(null);
    var dirresp = oReq3.responseXML;
    var items2 = [];
    var pozycja = dirresp.getElementsByTagName("pozycja");
    var div = document.getElementById('divfornewkurs');
    div.winControl;
    for (i = 0; i < pozycja.length; i++) {

        if (name[0] == 'c') {
            var names = pozycja[i].getElementsByTagName("nazwa_waluty")[0].textContent;
            var przelicznik = pozycja[i].getElementsByTagName("przelicznik")[0].textContent;
            var kod = pozycja[i].getElementsByTagName("kod_waluty")[0].textContent;
            var kurs = pozycja[i].getElementsByTagName("kurs_kupna")[0].textContent;

        }
        else {

            if (name[0] == 'h') {
                var names = pozycja[i].getElementsByTagName("nazwa_kraju")[0].textContent;
                var przelicznik = pozycja[i].getElementsByTagName("przelicznik")[0].textContent;
                var kod = pozycja[i].getElementsByTagName("nazwa_waluty")[0].textContent;
                var kurs = pozycja[i].getElementsByTagName("kurs_kupna")[0].textContent;
            }
            else {
                var names = pozycja[i].getElementsByTagName("nazwa_waluty")[0].textContent;
                var przelicznik = pozycja[i].getElementsByTagName("przelicznik")[0].textContent;
                var kod = pozycja[i].getElementsByTagName("kod_waluty")[0].textContent;
                var kurs = pozycja[i].getElementsByTagName("kurs_sredni")[0].textContent;
            }
            
        }


            
            var div2 = document.createElement('div');
            
            var opt = document.createElement('h2');
            opt.value = names;
            opt.innerHTML = names;
            var opt2 = document.createElement('h3');
            opt2.value = przelicznik;
            opt2.innerHTML = przelicznik;
            var opt3 = document.createElement('h3');
            opt3.value = kod;
            opt3.innerHTML = kod;
            var opt4 = document.createElement('h3');
            opt4.value = kurs;
            opt4.innerHTML = kurs;
            div2.appendChild(opt);
            div2.appendChild(opt2);
            div2.appendChild(opt3);
            div2.appendChild(opt4);
            div.appendChild(div2);

            WinJS.UI.processAll();
    }

}

    (function () {
        "use strict";
        var page = WinJS.UI.Pages.define("dates.html",
        {
            ready: function (element, options) {
                  document.getElementById("mainpage").addEventListener("click", NextPage, false);
                  document.getElementById("close").addEventListener("click", CloseApp, false);
                  document.getElementById("backtodatas").addEventListener("click", init, false);
                //document.getElementById("databutton").addEventListener("click", printKurs(dates), false);
                window.addEventListener('load', init());
                document.body.addEventListener("click", function (event) {
                    var target = getAncestor(event.target, "button");
                    if (event.target.tagName == "DIV")
                    {
                        
                    }
                    else {
                            if (event.target.id == "mainpage") {
                                NextPage();
                            }
                            else {
                                if (event.target.id == "close") {
                                    CloseApp();
                                }
                                else {
                                    if (event.target.id == "backtodatas"){
                                        init();
                                    }
                                    else {
                                        if (event.target.tagName == "BUTTON") {
                                            printKurs(target.name);
                                        }
                                    }
                                }
                            }
                        }
                    
                    
                }, false);
            },
        });
        function NextPage() {
            window.location.href = "default.html";
        }
        function CloseApp() {
            window.close()
        }
        function KursForData() {
            var count = this.innerHTML;
        }
       
    })();