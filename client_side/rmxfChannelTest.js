
var lost_limit = 15;		// процентов
var lost_limit_time = 1000;	// миллисекунд -- интервал между проверками
var cpu_load_limit = 90;	// процентов
var cpu_load_time  = 5;		// секунд
var ShowSmallWindow = 0;	// Показывать ТОЛЬКО в маленьком окошке
var i_times=0;

function showHelp()
{
 window.open("http://download.vidicor.ru/meloman/help.htm"); // Нельзя имена/пути файлов вставлять в текст!!!
 return 0;
}


var rmxf_message = "<table height=60% width='100%'><tr valign=middle>" +
		"<td valign=center><img src='../img/warning.png'>" +
		"<td align=center><font color='red'>Lost: #lost# %<br> Your channel's width is unsufficiant<br>to receive this stream</font>" +
		"<hr>Please, try:<br>- use another video stream,<br>- choose <b>another reflector</b><br>- contact your <b>provider" +
		"<a href='http://download.vidicor.ru/VidicorView_help.htm' onclick='parent.window.open(\"http://download.vidicor.ru/VidicorView_help.htm\")' title='Open help'>(Help)</a>";
    short_rmxf_message = "<table><tr><td valign=middle><img src='../img/warning.png' width=24 height=24></td><td align=center valign=middle><font color='red'><b>Channel lost:</b> #lost#%</font></td></tr></table>";

if (lang == 'ru')
{
 rmxf_message =	"<table height=60% width='100%'><tr valign=middle>" +
		"<td valign=middle width=48><img src='../img/warning.png' width=48 height=48></td>" +
		"<td align=center valign=middle>" +
		"<font color='red'>Ширина вашего интернет-канала недостаточна<br>для просмотра данного видеопотока</font>" +
		"<br>Продолжение просмотра с такими потерями будет сопровождаться пропаданием звука, замираниями изображения и рассыпанием его на \"квадраты\"</b>" +
		"<hr><font color='red'><b><big><BIG>Потери данных в канале: <u>#lost#%</u>!!!</BIG></big></b></font>" +
		"<hr>Попробуйте:<br>- выбрать подпоток с <b>меньшим битрейтом</b>, или<br>- выбрать <b>другой ретранслятор</b>, или <br>- обратиться к <b>провайдеру</b>" +
		"<br><a href='http://download.vidicor.ru/VidicorView_help.htm' onclick='parent.showHelp()' target='_blank' title='Открыть помощь'>Помощь</a>";
 short_rmxf_message = "<table><tr><td valign=middle><img src='../img/warning.png' width= 24 height=24></td><td align=center valign=middle><font color='red'><b>Потери в канале: #lost#%</b></font></td></tr></table>";
}


var cpu_message = "<table height=60% width='100%'><tr valign=middle><td valign=middle align=center><img src='../img/warning.png'></td><td align=center valign=middle><font color='red'><b><big>Your processor is overloaded</big></b></font><hr>Please try:<br>- close some applications,<br>- use lower video substream";
    short_cpu_message = "<table><tr><td valign=middle><img src='../img/warning.png' width=24 height=24></td><td align=center valign=middle><font color='red'><b>Processor overload</b></font></td></tr></table>"
if (lang == 'ru')
{
    cpu_message = "<table height=60% width='100%'><tr valign=middle><td valign=middle align=center><img src='../img/warning.png'></td><td align=center valign=middle><font color='red'><b><big>Ваш процессор перегружен</big></b></font><hr>Попробуйте: <br>- закрыть часть приложений<br>- выбрать поток с меньшим битрейтом";
    short_cpu_message = "<table><tr><td valign=middle><img src='../img/warning.png' width=24 height=24></td><td align=center valign=middle><font color='red'><b>Перегрузка процессора</b></font></td></tr></table>"
}
//alert(short_cpu_message);
var rmxf_message_end = "</td></tr></table>";


function rmxf_test_channel_bandwidth(lost_limit_percent,testing_interval_ms)
{
 lost_limit = lost_limit_percent
 i_times = 0;
 setTimeout ("rmxt_test("+testing_interval_ms+","+lost_limit_percent+")", testing_interval_ms);
}


var v_popup=0;
try{
 if (!v_popup)
  if (typeof(window.createPopup) != "undefined")
   v_popup =  window.createPopup();

}
catch(err)
{};


function disconnect_v(i)
{
 ShowSmallWindow = 1;
 var obj = rmxfViewers[i];
 if (obj)
  obj.Disconnect();
 v_popup.hide();
}


function continue_v()
{
 try
 {
  ShowSmallWindow = 1; // Отныне сообщения будут только маленькие
  v_popup.hide();
  parent.window.focus();
 }
 catch(err)
 {}
}


function show_popup(Text)
{
 if (typeof(v_popup.document) == 'undefined') return false;
  var oBody = v_popup.document.body;  
      oBody.style.backgroundColor = "lightyellow";
      oBody.style.border = "solid black 1px";
      oBody.innerHTML = Text;

        if (!ShowSmallWindow )
        {
         p_h = 310; // высота окна с большим сообщением о нехватке ресурса
         p_w = 600; //
        }
         else
         {
          p_h = 30;  // высота окна с маленьким сообщением о нехватке ресурса
          p_w = 340;
         }

        w = document.body.clientWidth;
        h = document.body.clientHeight;
        try { 
         if (!ShowSmallWindow)
         parent.window.focus();         
         }
          catch(err) {};
          try {           
           if (!ShowSmallWindow) 
	    {
             v_popup.show(w/2 - p_w/2, h/2 - p_h/2, p_w, p_h, document.body);
	     ShowSmallWindow=1;
 	    }
            else
            {             
             v_popup.show(0, 0, p_w, p_h, document.body); // Вывод маленького сообщения
            }
           }
          catch(err) {};
}


function rmxt_test(interval, lost)
{
 
 if (rmxfViewers && ( !rmxf_test_bandwidth_disable ) )
 if (i_times > 3) 
 for (i=0; i<rmxfViewers.length; i++)
  {
   var obj = rmxfViewers[i];
   
   var Buttons = ("<center><br><input type=button value='Disconnect'  onclick='parent.disconnect_v(\""+i+"\")'><input type=button value='Continue viewing with freeses' onclick='parent.continue_v()'></span></center><br>"); 
   if (lang == 'ru')
       Buttons = ("<center><br><input type=button value='Отключиться' onclick='parent.disconnect_v(\""+i+"\")'><input type=button value='Продолжить смотреть с \"тормозами\"'  onclick='parent.continue_v()'></span></center><br>");
   if (obj && obj.rmxfobj && !rmxfViewers[i]["DisableBMonitoring"])
   {
    //Тест полосы пропускания 
    if (obj.rmxfobj.ChannelLost >= lost_limit && obj.rmxfobj.ChannelLost!==100) // 100% иногда выдаваётся из-за ошибки в софте
    {
     rmxfViewers[i]["DisableBMonitoring"] = 1;
     var Text = "<center><span>";
     Text+= !ShowSmallWindow ? rmxf_message : short_rmxf_message; 
     Text = Text.replace("#lost#", obj.rmxfobj.ChannelLost);
     if (!ShowSmallWindow)  
     {
      Text+=rmxf_message_end;
      Text+=Buttons;
     }
     show_popup(Text);
    }
   }
    /////////////////////////////////////////////////////////////////
    if (obj && obj.rmxfobj)
    {
        if (obj.rmxfobj.CPUUsage >= cpu_load_limit && !rmxfViewers[i]["DisableCpuMonitoring"]) 
        {
         if (!rmxfViewers[i]["CpuOverloaded"]) rmxfViewers[i]["CpuOverloaded"]=1;
         rmxfViewers[i]["CpuOverloaded"]++;
    
         if (rmxfViewers[i]["CpuOverloaded"] > cpu_load_time)	//Система перегружена дольше <cpu_load_time> секунд
         {
          rmxfViewers[i]["DisableCpuMonitoring"] = 1;
          var Text = ""; 
          Text+= !ShowSmallWindow ?  cpu_message : short_cpu_message; 
          if (!ShowSmallWindow)
          {
           Text+=rmxf_message_end ;
           Text+=Buttons;
          }
          show_popup(Text);
         }
        }
        else
        if (!rmxfViewers[i]["CpuOverloaded"]) rmxfViewers[i]["CpuOverloaded"]=1;
      }
  }

  i_times ++;
  setTimeout ("rmxt_test("+interval+","+lost+")", interval);
}


var rmxf_test_bandwidth_disable = 0;	// Не проводить тесты канала связи
var rmxf_test_cpu_disable = 0;		// Не проводить тесты процессора

if (rmxf_test_channel_bandwidth) rmxf_test_channel_bandwidth(lost_limit, lost_limit_time); //Выдавать сообщение при остаточных потерях в <lost_limit>%, интервал проверки <lost_limit_time> мс
