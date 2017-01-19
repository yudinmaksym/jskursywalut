var oReq = new XMLHttpRequest();
oReq.open("GET", "http://www.nbp.pl/kursy/xml/LastA.xml", false);
oReq.send();
xmlDoc = oReq.responseXML;
var items = [];
var pozycja = xmlDoc.getElementsByTagName("pozycja");
for (i = 0; i < pozycja.length; i++) {
    var names = pozycja[i].getElementsByTagName("nazwa_waluty")[0].textContent;
    var przelicznik = pozycja[i].getElementsByTagName("przelicznik")[0].textContent;
    var kod = pozycja[i].getElementsByTagName("kod_waluty")[0].textContent;
    var kurs = pozycja[i].getElementsByTagName("kurs_sredni")[0].textContent;

    
    var itemArray = [
        { names: names, przelicznik: przelicznik, kod: kod, kurs: kurs }
    ];
    itemArray.forEach(function (item) {
        items.push(item);
    });
    WinJS.Namespace.define("Sample.ListView", {
        data: new WinJS.Binding.List(items)
    });
    WinJS.UI.processAll();
    }



(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("default.html",
    {
        ready: function (element, options) {
            document.getElementById("nextpage").addEventListener("click", NextPage, false);
            document.getElementById("close").addEventListener("click", CloseApp, false);
        },
    });
    function NextPage()
    {
        //WinJS.Navigation.navigate("page\dates.html");
        window.location.href = "dates.html";
        var context = document.getElementById("nextpage").textContent;
    }
    function CloseApp() {
        window.close()
    }
})();
