
var applicationData = Windows.Storage.ApplicationData.current;
var localFolder = applicationData.localFolder;
localFolder.getFileAsync("test.txt")
   .then(function (sampleFile) {
       return Windows.Storage.FileIO.readTextAsync(sampleFile);
   }).done(function (timestamp) {
       var oReq3 = new XMLHttpRequest();
       oReq3.open("GET", "http://www.nbp.pl/kursy/xml/" + timestamp + ".xml", false);

       oReq3.send(null);
       var dirresp = oReq3.responseText;

       xmlDoc = oReq3.responseXML;
       var items2 = [];
       var pozycja = xmlDoc.getElementsByTagName("pozycja");
       for (i = 0; i < pozycja.length; i++) {
           var names = pozycja[i].getElementsByTagName("nazwa_waluty")[0].textContent;
           var przelicznik = pozycja[i].getElementsByTagName("przelicznik")[0].textContent;
           var kod = pozycja[i].getElementsByTagName("kod_waluty")[0].textContent;
           var kurs = pozycja[i].getElementsByTagName("kurs_sredni")[0].textContent;
           var itemArray2 = [
           { names: names, przelicznik: przelicznik, kod: kod, kurs: kurs }
           ];

           itemArray2.forEach(function (item) {
               items2.push(item);
           });
           WinJS.Namespace.define("Sample.ListView", {
               data: new WinJS.Binding.List(items2)
           });
           WinJS.UI.processAll();
       }
   });

(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("page3.html",
    {
        ready: function (element, options) {
            
            document.getElementById("backtopresent").addEventListener("click", BackToPresent, false);
            document.getElementById("nextpage").addEventListener("click", NextPage, false);
            document.getElementById("close").addEventListener("click", CloseApp, false);
            //document.getElementById("count").addEventListener("click", KursForData, false);
        },
    });
    function NextPage() {
        //WinJS.Navigation.navigate("page\dates.html");
        window.location.href = "dates.html";
        //var context = document.getElementById("nextpage").textContent;
    }
    function CloseApp() {
        window.close()
    }
    function BackToPresent() {
        window.location.href = "default.html";
    }
})();