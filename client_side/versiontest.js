//This module requires JQuery

var VersionScript = "http://download.vidicor.ru/CurrentVersion.js.php";
var VersionDialogShowed = 0;
//var DownloadPath = "http://download.vidicor.ru/VidicorPlugin.exe";
var DownloadPath = "http://plugin.vidicor.ru";

function RequireNewVersion(oldVersion, newVersion)
{
 if (confirm("Вышла новая версия плагина "+ newVersion + " (Ваша версия:" + oldVersion + ") прелагаем установить?\r\n\r\nБез обновления новые возможости могут оказаться недоступными.\r\nОбновление будет применено после перезапуска браузера."))
 document.location.href = DownloadPath;
}


function TestVersion()
{
 if (VersionDialogShowed) return;
 var obj = null; 
 
 if (rmxfViewers) obj = rmxfViewers[0];
 if (typeof(obj) != 'undefined' && (obj!=null) && obj.rmxfobj!=null && typeof(obj.rmxfobj.URL)!='undefined') 
 { 
  VersionDialogShowed = 1;
  if (typeof( obj.rmxfobj.Version)=="undefined") RequireNewVersion("-", CurrentVersion);
  
  var arr_old = obj.rmxfobj.Version.split(".");
  var arr_new = CurrentVersion.split(".");
  for (var i=0; i<arr_old.length; i++)
    if (arr_new[i] > arr_old[i]) return RequireNewVersion(obj.rmxfobj.Version,CurrentVersion);
 }
 else
  setTimeout(TestVersion, 5000); 
}

$.getScript(VersionScript, TestVersion);
