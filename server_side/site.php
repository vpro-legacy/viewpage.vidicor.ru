<html>

 <head>
 <meta	http-equiv="Content-Type"	content="text/html; charset=utf-8" />

 <HTTP-EQUIV="PRAGMA" CONTENT="NO-CACHE">

 <meta	http-equiv="Cache-Control"	content="no-cache">

 <link	rel="shortcut icon"		type=image/x-icon	href="../favicon.ico" /> 
 <LINK	REL="stylesheet"		TYPE="text/css"		HREF="../styles/style.css" >
 
 <!-- JQuery linked files -->
 <script type="text/javascript" src="../client_side/jquery/jquery.js">				</script>
 <script type="text/javascript" src="../client_side/jquery/jquery-ui.js">			</script>
 <script type="text/javascript" src="../client_side/jquery/jquery.corners.js">			</script>
 <script type="text/javascript" src="../client_side/jquery/jquery.outer.js">			</script>
 
 <link rel="stylesheet" href="../client_side/jquery/tooltip/jquery.tooltip.css" />
 <link rel="stylesheet" href="../client_side/jquery/styles/ui.all.css" />
 
 
 <script type="text/javascript" src="../client_side/jquery/lib/jquery.bgiframe.js" >		</script>
 <script type="text/javascript" src="../client_side/jquery/lib/jquery.dimensions.js" >		</script>
 
 <!--script src="../client_side/jquery/tooltip/jquery.tooltip.js" type="text/javascript">	</script>
 <!--END JQuery linked files -->
 
 <script type="text/javascript" language='JavaScript' src='../client_side/rmxfrecv.js'>		</script>
 <script type="text/javascript" language="JavaScript" src="../client_side/cookies.js" >		</script>
 <script type="text/javascript" language="JavaScript" src="../-defconfig-.js" ></script>
 <br />
<b>Notice</b>:  Undefined index:  refsite in <b>/home/vidicor1/vidicor1.nichost.ru/docs/server_side/head.html</b> on line <b>32</b><br />
 <script type="text/javascript" language="javascript" src="/-config-.js"></script> 
 <script type="text/javascript" language='JavaScript' src='../client_side/scripts.js'>		</script> 
 <script type="text/javascript" language='JavaScript' src='../client_side/rmxfChannelTest.js'>	</script> 
 <script type="text/javascript" language='JavaScript' src='../client_side/versiontest.js'>	</script> 
 <script type="text/javascript" language='JavaScript' src='../client_side/stat_collector.js'>	</script> 
 <script type="text/javascript">								</script> 

 </head> 
<body onload="OnLoad();" onunload="DestroyAllViewers()" style="margin:0" bgcolor="black">
    <!--iframe id="LayoutsFrame" style="left:0; top: 0; position: absolute; width: 100%; height: 100px; z-index: 1000; background-color: #ffffff;" / src="layouts.php"></iframe-->
    <!-- ------------------------------------------------------------------------------- -->
    <div style="width: 100%; float: center;">
        <div id="ControlButtonsAnc">
        </div>
        <center>
            <table width="100%" id="ButtonPanel" border="0" cellpadding="0" cellspacing="0" bgcolor="#000000">
                <tr>
                    <!-- --------------------------- Выбор скорости потока --------------------------------------- -->
                    <td valign=middle width="1">
                        <table border="0" cellpadding="0" cellspacing="0" title="Выберите скорость подключения к сети.
Выбранная скорость влияет на качество принимаего видеосигнала.
При индикации потерь, залипании изображения, прерывании звука следует выбрать меньшую скорость">
                            <tr>
                                <td id="c_SpeedSelectDiv" valign="middle" align="center">
                                    <div id="speedTitle">
                                            <font color="white"><small><small><small>Скорость канала:</small></small></small></font>
                                    </div>
                                    <div id='SpeedSelectDiv'>
                                    </div>
                                </td>
                                <td valign="middle">
                                    <div id="c_quality_title">
                                    </div>
                                </td>
                                <td>
                                    <div id="c_quality">
                                    <table border="0" cellpadding="0" cellspacing="0"><tr>
                                      <script language='JavaScript' type="text/javascript">
                                         document.write(BuildSpeedList("<td>", "</td>"));
                                     </script>
                                     </tr></table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <!-- --------------------------- /Выбор скорости потока --------------------------------------- -->
                    <!-- ------------------------------- Средняя часть  ------------------------------------------- -->
                    <td align="center" valign="middle" width="100%">
                        <table style="display:none" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <font color="white"><small><small><small>Вывод только первого окна:</small></small></small>&nbsp;</font>
                                </td>
                                <td align="left" valign="middle">
                                    <a href="../simplest.htm">
                                        <img height='28' border="0" src="../img/vid_or_yell_but.jpg" title="Вывод только первого окна"
                                            alt="Вывод только первого окна"></a>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <!--td align=center valign=middle>
	   <table id="FlashSwitch" border="0" cellpadding="0" cellspacing="0" bgcolor=LightYellow>
	     <tr>
	       <td align=center valign=middle>
		 <font color=white><small><small><small>Переключиться<br>на&nbsp;Adobe&nbsp;Flash:</small></small></small>&nbsp;</font>
	       </td>
	       <td align=right valign=middle>
		 <a href="../flash/flash.php"><img height='28' border=0 src="../img/flash.jpg" title="Переключиться на Adobe Flash"></a>
	       </td>
	     </tr>
	   </table>
	 </td-->
                    <!-- ------------------------------- /Средняя часть  ------------------------------------------- -->
                    <!-- --------------------------- Выбор репликатора --------------------------------------- -->
                    <td align="right" valign=middle width="1">
                        <table border="0" cellpadding="0" cellspacing="0" title='Трансляция ведется через сеть репликаторов (ретрансляторов) "Видикор".
        Выберите тот из репликаторов, который окажется для вас источником, дающим наилучшее качество видео и звука.'>
                            <tr>
                                <td align="center" valign="middle" title='Трансляция ведется через сеть репликаторов (ретрансляторов) "Видикор".
        Выберите тот из репликаторов, который окажется для вас источником, дающим наилучшее качество видео и звука.'
                                    id="reflectorTable">
                                    <div  id="reflectorTitle">
                                        <font color="white"><small><small><small>Источник:</small></small></small>&nbsp;</font></div>
                                     <div id="reflectorDiv">
                                    </div>
                                </td>
                                <td valign=middle>
                                    <div id="c_reflectors_title">
                                    </div>
                                </td>
                                <td>
                                    <div id="c_reflectors">
                                      <table border="0" cellpadding="0" cellspacing="0"><tr>
                                      <script language='JavaScript' type="text/javascript">
                                          document.write(BuildReflectorList("<td>", "</td>"));
                                     </script>
                                     </tr></table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <!-- --------------------------- /Выбор репликатора --------------------------------------- -->
		    <td valign=middle>&nbsp;
		    </td>
                    <td align="right" valign=middle width="1">
                        <img id="admin_mode" src="../img/user_mode.png" height="28px" width="28px" title="Вход в режим администратора"
                            alt="Вход в режим администратора" style="cursor: hand" onclick="EnterAdministrator()" />
                        <img id="admin_mode1" src="../img/user_mode.png" height="28px" width="28px" title="Вход в режим администратора1"
                            alt="Вход в режим администратора1" style="cursor: hand" onclick="EnterAdministrator1()" />
                    </td>
                </tr>
            </table>
        </center>
    </div>
    <!-- ---------------------------- /Кнопки управления -------------------------------- -->
    <div id="PreviewWindowAnc" style="width: 100%; align: center; display:none" >
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td height="1" width="100%" bgcolor="#dddddd">
                </td>
            </tr>
            <tr>
                <td height="4" width="100%">
                </td>
            </tr>
        </table>
        <!-- ---------------------------------- Панель меню и минивидеоокон ----------------------------- -->
        <table id="c_previewTable" width="100%" bgcolor="#555555" border="0" cellpadding="0"
            cellspacing="0" title="   Выбирайте камеру для просмотра видео, нажимая на кнопку с названием камеры под соответствующим мини-видеоокном.
Звук при этом прерываться не будет, синхронность изображения и звука сохранится.">
            <tr>
                <!--td align="center">
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
			  <td valign=middle align=center><small><small<small><font color=white>Выберите<br>камеру</font></small></small</small></td>
			  <td valign=middle>&nbsp;<img src="../img/strelka.gif"></td>
			</tr>
                    </table>
                </td-->
                <td align="center" valign="bottom" width="100%">
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td align="center">
                                <div id="previewContainer">
                                    Подождите, идет загрузка...<br>
                                    <img src="../client_side/loading.gif" alt="Загрузка..."></div>
                            </td>
                        </tr>
                    </table>
                </td>
                <td valign=middle>
			<table border=1 bordercolor=white cellpadding="0" cellspacing="0"><tr><td>
				<input type="checkbox" id="PreviewModeBox" onclick="ChangePreviewMode()" checked title="Если у вас узкий интернет-канал, то выключите минивидеоокна, чтобы не загружать канал дополнительными потоками для отображения этих окон">
				<input type="checkbox" onclick="UseMatrixMode()" id="cb_matrix" title="Вывод нескольких видеоокон одновременно.
Добавление камеры -- нажатием кнопки выбора,
удаление окна камеры -- повторным нажатием кнопки выбора">
				<!--input type="checkbox" onclick="UseWatcher()" title="Открыть в Watcher"-->
				<input type="checkbox" id="cb_audiopanel" onclick="ShowAudioPanel()" title="Можно отключить звук он каких-то точек, регулировать громкость каждой точки, посмотреть параметры каждой из точек">
			</td></tr></table>
		</td>
		<td>
			<font color="white"><small><small><small>
			&nbsp;Минивидеоокна<br><br>
			&nbsp;Мультиэкран<br><br>
			<!--&nbsp;Плеер&nbsp;(<a href="http://download.vidicor.ru/vidicorwatcher.exe">скачать</a>)<br><br>-->
			&nbsp;Панель&nbsp;звуков
			</font>
                </td>
            </tr>
        </table>
        <!-- ---------------------------------- /Панель меню и минивидеоокон ----------------------------------- -->
    </div>

    <!-- --------------------------- Вывод суммарного звука --------------------------------------- -->
    <center>
        <div id="AudioPanel">
        </div>
    </center>
    <!-- --------------------------- /Вывод суммарного звука --------------------------------------- -->

    <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td height="5" width="95%" bgcolor="#ddddff"></td>
	    <script language=JavaScript> 
	    if(doScrollDown == 1) 
		document.write('<td height="5" width="500px" bgcolor="#aaaaff" onmouseover="ScrollToEl(\'VideoWindowAnc\')"></td>')
	    else
		document.write('<td height="5" width="500px" bgcolor="#ddddff" onmouseover="ScrollToEl(\'PreviewWindowAnc\')"></td>')
	    </script>
        </tr>
        <tr>
<div id='VideoWindowAnc'></div>
            <td height="5" bgcolor="#ddddff" onmouseover="ScrollToEl('PreviewWindowAnc' );"></td>
            <td height="5" bgcolor="#ddddff" onmouseover="ScrollToEl('PreviewWindowAnc' );"></td>
        </tr>
    </table>
    <script type="text/javascript" language="JavaScript">
        window.setTimeout("ScrollToEl('VideoWindowAnc()')", 20000);
    </script>

    <!-- --------------------------- Таблица с видеоокном ---------------------------------------- -->

    <div style="width: 100%; float: center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td width="100%" align="center" id="c_Window">
                    <!-- ------------------------- Окно вывода видео -------------------------------- -->
                    <table border="1" cellspacing="0" cellpadding="0" id="allWindow" bgcolor="#eeeeee"
                        width="100%">
                        <tr>
                            <td valign="middle" align="center" bgcolor="#C0C0C0">
                                <div id="AfishaContainer">
                                </div>
                                <div id="MainContainer">
                                </div>
                            </td>
                            <!-- Видеоокно -->
                        </tr>
                    </table>
                    <!-- ------------------------- /Окно вывода видео в рамке -------------------------------- -->
                </td>
            </tr>
        </table>
    </div>
    <input type="button" onclick="ShowLayoutPanel()" value="Выбрать раскладку">

<div style="width: 100%; float: center;">
<!-- --------------------------- Вывод общего звука --------------------------------------- -->
<center>
<SCRIPT language=JavaScript>
  if (EnableAudio==0) {document.write("<table><tr> <!--td align=center><img src='../img/speaker.png'></td--><td align=center id='SndContainer'>Звук</td></tr></table>");}
</SCRIPT>
</center>
<!-- --------------------------- /Вывод общего звука --------------------------------------- -->
</div>

    <!--table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td 95%>&nbsp;
            </td>
            <td width="5%" height="4" bgcolor="#aaaaFF" on mouse over="ScrollToEl('ChatAnc');"> <!-- Сенсор прокрутки на чат -->
            </td>
        </tr>
        <tr>
            <td 95%> 
            </td>
            <td height="4" bgcolor="#ddddFF" on mouse over="ScrollToEl('VideoWindowAnc');">   <!-- Сенсор прокрутки вверх -->
            </td>
        </tr>
    </table-->

    <!--table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td width="100%" height="2" bgcolor="#0000FF" onmouseover="ScrollToEl('ChatAnc');">
            </td>
        </tr>
        <tr>
            <td>
            </td>
        </tr>
        <tr>
            <td height="2" bgcolor="#ddddFF" onmouseover="ScrollToEl('VideoWindowAnc');">
            </td>
        </tr>
    </table-->


    <div id="ChatAnc" style="display:none"></div>   
    <div id="EndAnc" style="display:none"></div> 
</div><div id="Chatdialog" style=" z-index:10000">
 <script language="JavaScript" type="text/javascript">

$(function() {
 if (ChatShow)
 $("#Chatdialog").html("<c"+"enter><I"+"FRAME src='http://chat.vidicor.ru?Rnd="+Math.random()+"#"+ChatSite+"' width='98%' height='720pt'></"+"IFRAME></"+"center>");
});
 </script>
</div>
<table>
 <tr>
 <td>
<!-- Yandex.Metrika informer -->
<a href="http://metrika.yandex.ru/stat/?id=5462944&amp;from=informer"
target="_blank" rel="nofollow"><img src="//bs.yandex.ru/informer/5462944/2_1_EDCECEFF_CDAEAEFF_0_pageviews"
style="width:80px; height:31px; border:0;" alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (просмотры)" /></a>
<!-- /Yandex.Metrika informer -->

<!-- Yandex.Metrika counter -->
<div style="display:none;"><script type="text/javascript">
(function(w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter5462944 = new Ya.Metrika(5462944);
             yaCounter5462944.clickmap(true);
             yaCounter5462944.trackLinks(true);
        
        } catch(e) { }
    });
})(window, 'yandex_metrika_callbacks');
</script></div>
<script src="//mc.yandex.ru/metrika/watch.js" language="javascript" type="text/javascript" defer="defer"></script>
<noscript><div><img src="//mc.yandex.ru/watch/5462944" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
 </td>
 <td>
  <a href="http://metrika.yandex.ru/stat/sources/sites/?counter_id=5462944&goal_id=&per_page=&table_mode=&filter=week&chart_type=&">Наши популярные сайты</a>
 </td>
</tr>
</table><small><small><span id="paramsinformer">PageParams</span></small></small>

<script Language="JavaScript">

 var fRedColor = "red";
 var RedLimit = 1000;
 var el = document.getElementById("paramsinformer");
 
 var Params = "";
     Params +="bfV=" + BufferVideo;
     Params += "&bfA=" + BufferAudio;
     Params += "&Aud=" + EnableAudio;
     Params += "&sCnt=" + 1*(sources.length-1);
     Params += "&base=" + commonrfbase;
 if (el) 
  {
   var fcolor = "";
   if ((BufferVideo > RedLimit) || (BufferAudio>RedLimit))
   fcolor = fRedColor;

   el.innerHTML = "<font color='"+fcolor+"'>"+Params+"</font>";
  }
</script><hr>
<center>
<font size=1 color=Black>
Система многоракурсной FullHD и 3D интернет-трансляции "Vidicor Video System" <nobr>&copy; 2005-2014 <a href="http://vidicor.ru/">НПЦ "Видикор"</a></nobr><br>
Комментарии/просьбы/предложения: <a href="mailto:support@vidicor.ru">support@vidicor.ru</a>. Техподдержка: <u><b>8(800) 2000-314</b></u>
</font>
</center>

</body>
</html>
<!-- низ страницы end-->

