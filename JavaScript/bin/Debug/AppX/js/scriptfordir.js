//var button = document.getElementById('searchdatabutton');
//button.addEventListener('click', clickResponse, false);
function clickListener() {
    var oReq2 = new XMLHttpRequest();
    oReq2.open("GET", "http://www.nbp.pl/kursy/xml/dir.txt", false);
    var Array = [];
    oReq2.send(null);
    var dirresp = oReq2.responseText;
        var start = 0;
        var end = 11;
        var array = [];
        var typtabelki = document.getElementById('typtabeli');
        var miesiac = document.getElementById('miesiac');
        var dzien = document.getElementById('dzien');
        var texttyp = typtabelki.options[typtabelki.selectedIndex].text;
        var textmiesanc = miesiac.options[miesiac.selectedIndex].text;
        var textdzien = dzien.options[dzien.selectedIndex].text;
        for (i = 0; i < dirresp.length; i++) {
           
            var dates = dirresp.substring(start, end);
            start += 13;
            end += 13;
            i += 13;
            var typtabeli = dates.substr(0, 1);
                                            var year = dates.substr(5, 2);
                                            var month = dates.substr(7, 2);
                                            var day = dates.substr(9, 2);
                                            if(typtabeli == texttyp && month == textmiesanc && day == textdzien)
                                            {
                                                document.getElementById('divfornewkurs').style.visibility = 'visible';
                                                document.getElementById('Error').innerHTML = ""
                                                printKurs(dates);
                                                break;
                                            }
                                            else {
                                                document.getElementById('Error').innerHTML="Nie ma kursow na taki daty"
                                            }
        }



}
    
function printKurs(dates) {
    document.getElementById('divfornewkurs').innerHTML = "";
    var oReq3 = new XMLHttpRequest();
    oReq3.open("GET", "http://www.nbp.pl/kursy/xml/"+dates+".xml", false);
    var Array = [];
    oReq3.send(null);
    var dirresp = oReq3.responseXML;
    var items2 = [];
    var pozycja = dirresp.getElementsByTagName("pozycja");
    var div = document.getElementById('divfornewkurs');
    div.winControl;
    for (i = 0; i < pozycja.length; i++) {
        var names = pozycja[i].getElementsByTagName("nazwa_waluty")[0].textContent;
        var przelicznik = pozycja[i].getElementsByTagName("przelicznik")[0].textContent;
        var kod = pozycja[i].getElementsByTagName("kod_waluty")[0].textContent;
        var kurs = pozycja[i].getElementsByTagName("kurs_sredni")[0].textContent;
            
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
                document.getElementById("searchdatabutton").addEventListener("click", clickListener, false);
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