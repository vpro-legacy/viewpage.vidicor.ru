//This module requires JQuery

var StatScript = "http://viewpage.vidicor.ru/stat/";
var StatSended = 0;
var StatTimeout = 60000; //Отправляет данные через 30 секунд.

function SendStat()
{
 var obj = null; 
 if (rmxfViewers) obj = vidRMXF;
 if (obj != null)
 if (typeof(obj) != 'undefined' && typeof(obj.rmxfobj)!='undefined' && obj.rmxfobj & typeof(obj.rmxfobj.URL)!='undefined') 
 {   
  if (obj.rmxfobj.ChannelLost < 100)
  {
   StatSended = 1;
   $.get( StatScript,  { lost:obj.rmxfobj.ChannelLost,cpu : obj.rmxfobj.CPUUsage, bitrate : obj.rmxfobj.CurrentBitrate });  
  }
 } 
 if (!StatSended) setTimeout(SendStat, StatTimeout);  
}

setTimeout(SendStat, StatTimeout);  

