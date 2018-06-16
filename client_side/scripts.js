
  var oldW = -1;
  var oldH = -1;
  var oldNumber = -1;  
  var oldcolor = -1;
  var rmxf_Viewers = new Array();
  var DisconnentPreviewOnScroll = 0;
  var GeckoEng = (navigator.userAgent.indexOf ("Gecko") != -1 || navigator.userAgent.indexOf ("Opera") != -1);
  
  var vidRMXF  = null;
  var sndRMXF  = null;
  var OldNumber = -1;
  var ButtonPos = 0; //Флаг места размещения кнопок
  var bUseWatcher = 0;

  var CurrentInternetSpeed = 0;
  var AdministratorMode = 0;
  var AdminPostPage =    "../Server_side/admin_mode/admin_control.php";
  var AdminAuthPage =    "../Server_side/admin_mode/admin_check.php";
  var UserDownloadPage = "../Server_side/admin_mode/user_control.php";
 
  var MatrixMode = 0; //Флаг использования режима "наборной матрицы"
  var MatrixIndex = new Array(); //Массив для наборной матрицы

  var ServerUpdateTimeout = 2000; //Интервал получения новых данных с сервера

  $(document.body).bind('keyup', function(event) {
     if ((event.keyCode >= 48) && (event.keyCode <= 57)) // 48 - '0', 57 - '9'
    Move(event.keyCode - 48);
    }
   )

   
// ------------------------------------------------------------------------------------------------

  function UseWatcher()
  {
   bUseWatcher=!bUseWatcher;
  }


// ------------------------------------------------------------------------------------------------

  function UseMatrixMode()
  {
   MatrixMode = $("#cb_matrix").get(0).checked;
   MatrixIndex = new Array();
   Move(OldNumber);
  }

  
// ------------------------------------------------------------------------------------------------

  function ScanUserScript()
  {
   if (!AdministratorMode)
     $.getScript(UserDownloadPage, ScanTimeout);
   else ScanTimeout();
  }


// ------------------------------------------------------------------------------------------------

  function ScanTimeout() 
  {
    setTimeout ("ScanUserScript()", ServerUpdateTimeout); 
  }
  function SendAdminCommand(param)
  {
    $.post(AdminPostPage, { admin : param } );  
  }
 

// ------------------------------------------------------------------------------------------------

  function SendMoveCommand(param)
  {
    $.post(AdminPostPage, { cmd : param } );  
  }


// ------------------------------------------------------------------------------------------------

  function EnterAdministrator()
  {  
   AdministratorMode = !AdministratorMode;    
   $("#admin_mode").get(0).src = AdministratorMode ? "../img/admin_mode.png" : "../img/user_mode.png";
   SendAdminCommand(AdministratorMode*1);
  }

  
// ------------------------------------------------------------------------------------------------

  function MarkCurrent() //Выделение текущего элемента в превью
  {
    for (var i=0; i<sources.length; i++)
    $("#prev_table"+i).css("backgroundColor", ColorArray["deselected"]);
   
    //Помечаем участвующие в матрице элементы
    if (MatrixMode)
     {
      for (i=0; i<MatrixIndex.length; i++)
       $("#prev_table"+(MatrixIndex[i])).css("backgroundColor", ColorArray["inmatrix"]);       
     }   
    else
    $("#prev_table"+parseInt(oldNumber)).css("backgroundColor", ColorArray["selected"]);
    // Установка цветного фона на ячейку выбранной камеры
  }     


// ------------------------------------------------------------------------------------------------

  function ChangePreviewMode(mode) // аргумент встречается только 0 или 1
  {   
    mode = $("#PreviewModeBox").get(0).checked;
    ShowPreviews = mode;                  
    BuildPreview(); // После отмены не работает отмена видеопревью, выбор потоков и репликаторов, но всё заработало лучше!
    MarkCurrent();
    setCookie("ShowPreviews", ShowPreviews);
  }     


// ------------------------------------------------------------------------------------------------

  function ShowLayoutPanel()
  {
   
  }


// ------------------------------------------------------------------------------------------------

  function fPreview()
  {
   DisconnentPreviewOnScroll = !DisconnentPreviewOnScroll;
   setCookie("PreviewOnScroll", !DisconnentPreviewOnScroll);
  };  


// ------------------------------------------------------------------------------------------------

  function GetCoolButton(click_ev, id, index, text, title) // Вывод красивой кнопки --------------
// click_ev(index) -- куда переход по нажатию, id+index -- id для <a> кнопки, text -- надпись, title -- комментарий
  {
   return "<div class='buttonwrapper'><a class='ovalbutton' href='#1' id='"+id+index+"'title='"+title+"' onclick='"+
   click_ev+"("+index+");return false;'><span>"+text+"</span></a></div>";
  }


// ------------------------------------------------------------------------------------------------

  function BuildReflectorList(dividerStart, dividerEnd)
  {
     var html = '';     
    for(i=0; i<reflectors.length; i++)     
     html += dividerStart  +  (GetCoolButton('changeReflector', 'ref', i, reflectors[i].name , reflectors[i].title) + dividerEnd ) ; // Вывод кнопок выбора репликатора
     return html;
  }


// ------------------------------------------------------------------------------------------------

  function BuildSpeedList(dividerStart, dividerEnd)
  {
    var html = '';  
    for (var  i=0; i<Qualityes.length; i++)
     html += (dividerStart + GetCoolButton('Select_Speed', 'chan', Qualityes[i].index, Qualityes[i].name, Qualityes[i].title) + dividerEnd); // вывод кнопок выбора скорости
     return html;   
  }


// ------------------------------------------------------------------------------------------------

  function CheckDisconnentPreviewOnScroll(FocusOnMainVideo)
  {
   if (!DisconnentPreviewOnScroll) FocusOnMainVideo = 0;
   for (var i=1; i<rmxf_Viewers.length; i++)   
    if (rmxf_Viewers[i]) FocusOnMainVideo ? rmxf_Viewers[i].Disconnect() : rmxf_Viewers[i].Connect();   
  }
  

// ------------------------------------------------------------------------------------------------

  function MyScroller(el, duration)
  { 
    if (this.criticalSection) {
        return false;
    }
        
    this.stopX = 0;
    this.stopY = 0;
    do {
        this.stopX += el.offsetLeft;
        this.stopY += el.offsetTop;
    } while (el = el.offsetParent);
    
    this.startX = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
    this.startY = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    
    this.stopX = this.stopX - this.startX;
    this.stopY = this.stopY - this.startY;
    
    if ( (this.stopX == 0) && (this.stopY == 0) )
        return false;
    
    this.criticalSection = true;
    if (typeof duration == 'undefined')
        this.duration = 500;
    else
        this.duration = duration;
            
    var date = new Date();
    this.start = date.getTime();
    this.timer = setInterval(function () {    
        var date = new Date();
        var X = (date.getTime() - this.start) / this.duration;
        if (X > 1)
            X = 1;
        var Y = ((-Math.cos(X*Math.PI)/2) + 0.5);
        
        cX = Math.round(this.startX + this.stopX*Y);
        cY = Math.round(this.startY + this.stopY*Y);      
    //    document.documentElement.scrollLeft = cX;
        document.documentElement.scrollTop = cY;
     //   document.body.scrollLeft = cX;
        document.body.scrollTop = cY;
        
        if (X >= 1) {
            clearInterval(this.timer);
            this.criticalSection = false;
        }
    }, 10);
    return false;
}


// ------------------------------------------------------------------------------------------------

function ScrollToEl(elId)
{
   CheckDisconnentPreviewOnScroll(0);
   var el = document.getElementById(elId);
   if (el) MyScroller(el, ScrollTimeMs_Down);
}


// ------------------------------------------------------------------------------------------------

function AddRemoveFromMatrix(ind)
{
 if (ind ==0) return;
 var present = -1;
 for (var i=0; i<MatrixIndex.length; i++)
 if (MatrixIndex[i]==ind) present=i;
 
 if (present > -1) 
    MatrixIndex.splice(present, 1)
 else
    MatrixIndex.push(ind);

}


// ------------------------------------------------------------------------------------------------

function Move(i) // Переключение камер
{
 if (i>=sources.length) return;
 
 if (AdministratorMode > 0)  SendMoveCommand (i*1);

 if ((MatrixMode) && i>0) AddRemoveFromMatrix(i*1);
 
  oldNumber = i;    
  MarkCurrent(); 
  Build(i);

 setTimeout("ShowAudioPanel();", 10);

 return false;
}
  

// ------------------------------------------------------------------------------------------------

function BuildPreview() // Построение панели превью *************************************************************************
{
  var el = document.getElementById("previewContainer"); // Куда вставлять
  if (el)
  {
    var prevW_val = Math.round(eval(previewW));             // Ширина окна превью
    if (isNaN(prevW_val))
	prevW_val = 144;
    var prevH_val = Math.round(eval(previewH)); // Высота окна превью
    if (isNaN(prevH_val))
	prevH_val = 112;
//    var speaker = "<iframe src=\'" + FrameSrc2 + "\' width=100% height=100% align=center></iframe>";
//    var speaker = "<iframe src=\'" + FrameSrc2 +"\' width=" + (prevW_val) + " height=" + (prevH_val) + " align=center></iframe>";
    var speaker = "<img src='../img/zvuk.gif' Height=" + prevH_val + " Width=" + prevW_val + ">";

    var v='<table border="0" cellpadding="0" cellspacing="0"><tr align=center>';

    // --------------------------- Цикл по окнам превью -------------------------------
    for (var i=NotShowHelp; i<sources.length; i++) // NotShowHelp=0 -- с "Только звук" с инструкцией
      {
        if ( (parseInt((i-NotShowHelp)/NumPrev)*NumPrev == (i-NotShowHelp)) && (i-NotShowHelp != 0) )  // "перевод строки" для окон предпросмотра
        {
          v += '</tr>';
          v += '</table>';
          v += '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr align=center><td><hr></td></tr></table>';
          v += '<table border="0" cellpadding="0" cellspacing="0">';
          v += '<tr align=center>'
        };

        v+="<td align=center id='prev_table" + i + "'>";

        if (rmxf_Viewers[i])
        {
          rmxf_Viewers[i].Destroy();
          rmxf_Viewers[i] = null;
        }

        var styles = "style='cursor:hand;height:" + (prevH_val+3) + "px;width:" + (prevW_val+4) + "px'"; // Стили для видеоокон
        v += "<table border=0 cellpadding=5 cellspacing=0 style='display:inline'  width=" + (prevW_val+10) + "><tr><td>"; // Таблица, вмещающая 1 минивидеоокно с кнопкой
        v += "<table border=0 cellpadding=0 cellspacing=0 width=" + (prevW_val+10) + ">"; // Таблица, вмещающая 1 минивидеоокно с кнопкой

        if (ShowPreviews)
        {
          if (i == 0) v+= ("<tr><td align=center valign=middle " + styles + ">" + speaker + "</td></tr>");
          if (i != 0) v+= ("<tr><td align=center  valign=middle title='" + sources[i].ctl + "'><div id='preview_cell" + i + "' name='preview" + i + "' " + styles + " ></div></td></tr>"); // Контейнер для видео
//alert(sources[i].ctl);
        }   

        var cur_reflector = reflectors[defaultreflector].base;          

      // ------------------------------ Кнопки выбора камер ----------------------------------
          v += "<tr><td align=center style='cursor:hand;'><font color=black><small><small>";
//        v += GetCoolButton("Move", "move", i, sources[i].name, cur_reflector + sources[i].src + previewQuality + "&" + satRecvPrm + " ||| " + sources[i].ctl);
          v += GetCoolButton("Move", "move", i, sources[i].name, cur_reflector + sources[i].src + " ||| " + sources[i].ctl);
          v += "</small></small></font></td></tr>";

        v += "</td></tr></table>";
        v += "</td></tr></table>";

        v += "</td>";

      }  // end "for"

    v+="</tr></table>";
    el.innerHTML = v;


    if (oldcolor==-1) 
    {
       oldcolor=$("#prev_table"+0).css("backgroundColor"); 
       if (oldcolor)
       ColorArray["deselected"] = oldcolor;    
    }

    if (ShowPreviews)
    {
      for (i=0; i<sources.length; i++)
      {
      var m_cur_reflector =  reflectors[defaultreflector].base;
      var url = m_cur_reflector + sources[i].src + previewQuality + "&" + satRecvPrm;
      var container = document.getElementById("preview_cell"+i);
      
      if (typeof(sources[i].ratio)!="undefined")
      	prevW_val = prevH_val * sources[i].ratio;
      else
        prevW_val = Math.round(eval(previewW));             // Ширина окна превью
      
      if (container && (i != 0))
      {
       container.height = prevH_val;                         
       container.width = prevW_val;

       if (rmxf_Viewers[i] != null) rmxf_Viewers[i] = null;  
       if (typeof(sources[i].src)=="string" && ! (typeof(sources[i].previewpicture)!=='undefined'))
       rmxf_Viewers[i] = new RMXFViewer(
         url, container,
          { 
//            Height:prevH_val, 
//            Width:prevW_val, 
            Height:"100%", 
            Width:"100%", 
            SelectedVideoStream:9999, 
            EnableAudio:EnableAudioPreview, 
            EnableLimit:0,
            ShowControls:0,
            MaintainVideoAspectRatio:0,
            ResizeWindowOnStart:0,
            DisableFeatures: "context-menu;double-click",           
            Cursor: "pointer" 
          },
        { OnMouseClick :  new Function("x", "y", "down", "dbl",
         "{ if (down) setTimeout( function () { Move("+i+") }, 1); }") 
        }
      );
      else
          container.innerHTML = "<img src='" + (typeof(sources[i].previewpicture)=='undefined' ? "../img/quad.png" : sources[i].previewpicture) + "' style='height:" + prevH_val + "px;width:" + prevW_val + "px'>"; 
        }
      }
    }

  }
  
  MarkCurrent();
}


// ------------------------------------------------------------------------------------------------

function BuildSound() // Проигрыватель звука
 {
   var el2 = document.getElementById("SndContainer");
   if (el2)
    {
       var AddParam = SyncronizationBySound ? "Name="+SyncPoint : "";
       var cur_reflector =    reflectors[defaultreflector].base;          

       if (sndRMXF==null)
       {
         sndRMXF = new RMXFViewer( cur_reflector+SndSrc, el2, "Height=26pt", "Width=450pt", "SelectedVideoStream=255" ,"EnableVideo=0", "EnableAudio=1", "EnableLimit=0", "ShowControls=1","bufferMin=" + BufferAudio, "bufferMax=" + (BufferAudio+100), "DisableFeatures=context-menu;double-click", "Name=sync");
       }
    else
    {
        sndRMXF.Disconnect();
        if (sndRMXF.rmxfobj) {
             sndRMXF.rmxfobj.url = cur_reflector+SndSrc;
         sndRMXF.rmxfobj.name=SyncronizationBySound ? SyncPoint : "";
             sndRMXF.rmxfobj.EnableAudio =  (1-EnableAudio);
        };
        sndRMXF.Connect();
    }
    }
  }


// ------------------------------------------------------------------------------------------------

 function HideShowAfishaAx(bShowAx, Ax)
{
   var el = document.getElementById("MainContainer");
   var elAf=document.getElementById("AfishaContainer");
   if (bShowAx) 
    {
        el.style.display = "inline";
        el.style.overflow = "visible";
        elAf.style.display = "none";
    }
    else
    {
        el.style.height = 1; // Нужно выставить > 0 для отладки;
        el.style.overflow = "hidden";       
        el.style.display = "none";
        elAf.style.display = "inline";
        if (Ax) Ax.Disconnect();
    }

}


// ------------------------------------------------------------------------------------------------

function GetPluginHTML(url, h, w, envideo, enaudio, svstream)
{
   if (ShowStatusBar)
   h = h + c_statusBatHeigth;
   v = '<OBJECT CLASSID="CLSID:6540685D-ABC2-4dfb-BC97-D71C5951B226" codebase="http://download.vidicor.ru/VidicorPlugin.exe" WIDTH='+w+' HEIGHT='+h+'>';
   v += '<PARAM NAME="URL" VALUE="'+ url + '">';
   v += '<PARAM NAME="EnableVideo" VALUE="'+envideo+'"><PARAM NAME="EnableLimit" VALUE="0">';
   v += '<PARAM NAME="EnableAudio" VALUE="'+enaudio+'">';
   v += '<PARAM NAME="SelectedVideoStream" VALUE="'+svstream+'">';
   v += '<PARAM NAME="MulticastTimeout" VALUE="-1">';
   v += '<PARAM NAME="SyncSourceName" VALUE="sync">';
   v += '<PARAM NAME="maintainVideoAspectRatio" VALUE="0">';
   v += '<embed type="application/x-vidicor-plugin" pluginspage="http://download.vidicor.ru/VidicorPlugin.exe"';
   v += ' WIDTH="'+w+'" HEIGHT="'+h+'"';
   v += ' URL="'+ url +'"';
   v += ' EnableVideo="'+envideo+'" EnableLimit="0"';
   v += ' SelectedVideoStream="'+svstream+'" EnableAudio= "'+enaudio+'"';
   v += ' MulticastTimeout="-1"';
   v += ' maintainVideoAspectRatio="0"';
   v += ' SyncSourceName="sync">';
   v += ' </embed>';
   v += '</OBJECT>';
   return v;
}


// ------------------------------------------------------------------------------------------------

function FilterAddons(container, url, h, w, ReplProc) {
    if (typeof(url) != "string")
    {
     return 1;
    }
    
    var p_arr = url.split(":");
    var m_container = document.getElementById(container);

    if (p_arr[0] == "iframe") 
    {
    eval(ReplProc);
        $(m_container.parent).height(h);
        $(m_container.parent).width(w);
        $(m_container).height(h);
        $(m_container).width(w);
        var nsrc = "";
        for (i=1; i<p_arr.length-1; i++)
    nsrc += p_arr[i] + ":";
    nsrc += p_arr[p_arr.length-1];
        m_container.innerHTML = ("<iframe height='" + h + "' width='" + w + "' src='" + nsrc + "' slyle='overflow:hidden'></iframe>");
        return 1;
    } else
        if (p_arr[0] == "whiteboard") 
        {
     eval(ReplProc);
         m_container.innerHTML = ("<applet height='" + h + "' width='" + w + "' archive='http://" + p_arr[1] + "/whiteproject.jar' CODE='WhiteboardApplet.class'>" +
         "<param name='url' value='http://" + p_arr[1] + "/wbdata.php?id=0'>" +
         "<param name='readonly' value='false'>");
        return 1;
        }
    return 0;               
}


// ------------------------------------------------------------------------------------------------

function DestrpoyMainRecv() {
    if (vidRMXF != null ) { 
       vidRMXF.Disconnect();
       vidRMXF.Destroy();
    }
    vidRMXF = null;
};

//Создаем таблицу для матрицы из N элементов


// ------------------------------------------------------------------------------------------------

function CreateTableForMatrix(N, l_camsinrow)
{
           var m_cnt = N;
           var p = Math.ceil(Math.sqrt(m_cnt));
           var camsinrow = m_cnt > 1 ? p : 1;
	   if (l_camsinrow>0)
	   camsinrow = l_camsinrow;
           var row = Math.ceil(m_cnt/camsinrow);

           var mainW_val = eval(mainW);
           var mainH_val = eval(mainH);;
           
           var i_html = "<table border=0 cellpadding=0 cellspacing=0 style='offset:0;margin:0;padding:0' width='"+mainW_val+"px' height='"+mainH_val+"px'>"; v_tr = "";
            for (j=0; j<row; j++) 
                {
                 v_tr += "<tr>";
                  for (z=0; z<camsinrow; z++)
                  if ((j*camsinrow+z)*1<m_cnt) 
                  {
                   var cs="";
                   if (j*camsinrow+(z+1)*1 ==m_cnt && m_cnt % camsinrow==1)
                   cs=" colspan='2'"; 
                   v_tr +="<td align='center' "+cs+" style='offset:0;margin:0;padding:0' ><div id='v_id"+(j*camsinrow+z*1)*1+"' style='offset:0;margin:0;padding:0'></td>"
                  }
                  v_tr+="</tr>";
                }
                
                i_html = i_html + v_tr;
                i_html += "</table>";
                 
           return i_html;
}


// ------------------------------------------------------------------------------------------------

function Build(i) //Функция, переключаюшая основной просмотр
{
 i=i*1; 
 setCookie("InternetSpeed", CurrentInternetSpeed);

 var NeedReconnect = OldNumber != i;

 var el = document.getElementById("MainContainer");
 var elAf=document.getElementById('AfishaContainer');

   if (el)
   {
      if (i<0)
      {
        if(vidRMXF!=null) vidRMXF.Disconnect();
        OldNumber = -1;
        return;
      };
      var FirstTime = OldNumber == -1;

      OldNumber = i;
      var cur_reflector = reflectors[defaultreflector].base;    
      var url=cur_reflector+sources[i].src+HiQuality + "&"+satRecvPrm;
      var selectedSpeed = CurrentInternetSpeed;

 	localDeinterlaceInDecoder = DeinterlaceInDecoder;

      if (typeof(Qualityes[selectedSpeed-1])!=='undefined' && typeof(Qualityes[selectedSpeed-1].DeinterlaceInDecoder)!=='undefined')
	localDeinterlaceInDecoder = Qualityes[selectedSpeed-1].DeinterlaceInDecoder;

      if (typeof(sources[i].DeinterlaceInDecoder)!=='undefined')
	localDeinterlaceInDecoder = sources[i].DeinterlaceInDecoder;


      var EnableVideo = 1;

      var mainW_val = eval(mainW);
      var mainH_val = eval(mainH);

      if (mainW_val/mainH_val > sources[i].ratio)
             mainW_val = mainH_val * sources[i].ratio;
      else mainH_val = mainW_val / sources[i].ratio;
      
      $("#caminfo").html((typeof(sources[i].info)!=='undefined') ? sources[i].info : "");
        
      HideShowAfishaAx( i>0, vidRMXF); //Обработка 0-индекса

      if (i > 0) {
      var isMatrix = 0;
      var MatrixCount = 1;

       if (typeof(sources[i].followlink)!="undefined")  document.location.href=sources[i].info;
       
       if (typeof(sources[i].src)!="string")
       {
        isMatrix = 1;
        MatrixCount =  sources[i].src.length;
       }
       
       if (!isMatrix && !MatrixMode)
       {

           if (!FilterAddons(el.id, sources[i].src, (mainH_val)+"px", mainW_val+"px", "DestrpoyMainRecv();")) 
           {
               if (vidRMXF == null) {
                   var AddParam = SyncronizationBySound ? "SyncSourceName=" + SyncPoint : "";
                   el.innerHTML = "";
                   vidRMXF = new RMXFViewer(url, el, "Height=" + (mainH_val), "Width=" + mainW_val, "EnableVideo=" + EnableVideo, "EnableAudio=" + EnableAudio, "EnableLimit=0", "maintainVideoAspectRatio="+DefaultVideoAspectRatio, "DeinterlaceInDecoder=" + localDeinterlaceInDecoder, "SelectedVideoStream=" + selectedSpeed,
                    "bufferMin=" + BufferVideo, "bufferMax=" + (BufferVideo + 100), "ShowMessages=0", "ResizeWindowOnStart=0", AddParam);

               } // if
               else {
                   if (NeedReconnect && vidRMXF) {
                       vidRMXF.Disconnect();
                       if (vidRMXF.rmxfobj) {
                           if (bUseWatcher == false) {
                               vidRMXF.rmxfobj.url = url;
                               vidRMXF.rmxfobj.EnableVideo = EnableVideo;
			       if (CurrentInternetSpeed == 0) //UserDefault 
			       {
			        CurrentInternetSpeed = vidRMXF.rmxfobj.SelectedVideoStream;
				Select_Speed(CurrentInternetSpeed, 1);
			       }
                               vidRMXF.rmxfobj.SelectedVideoStream = selectedSpeed;
                               vidRMXF.rmxfobj.DeinterlaceInDecoder = localDeinterlaceInDecoder;
				                       //Test resize
			                         //if (sources[i].ratio !== sources[oldNumber].ratio)
			                         {
                              //  vidRMXF.rmxfobj.videoWidth = mainW_val;
                              //  vidRMXF.rmxfobj.videoHeight = mainH_val;            
                              //  vidRMXF.rmxfobj.setVideoSize(mainW_val, mainH_val);
                               }
                           }
                           else {
                               $("<IFRAME id='setupframe' style='display:none' src='about:blank'></IFRAME").appendTo("body");
                               $("#setupframe").contents().get(0).location.href = url;
                               vidRMXF.Disconnect();
                               return 0;
                           }

                       };
                       if (i > 0) vidRMXF.Connect(el);
                   }
               }
           }
    }
    else
    if (MatrixMode)
    {
       DestrpoyMainRecv();
       
       
      var mainW_val = eval(mainW);
      var mainH_val = eval(mainH);;
      if (typeof(sources[i].camsinrow)=="undefined" || sources[i].camsinrow==0) {
        sources[i].camsinrow = Math.ceil(Math.sqrt(MatrixIndex.length));
      }                      

      var camsinrow = sources[i].camsinrow;

      var row = Math.ceil(MatrixIndex.length/camsinrow);

      el.innerHTML = CreateTableForMatrix(MatrixIndex.length, camsinrow);                           
      
      /**
        Вычисляем параметры соотношения сторон для режима "матрицы" 
      */
      
      var miniW_val = eval(mainW) / camsinrow;
      var miniH_val = eval(mainH) / row;

      if (miniW_val/miniH_val > sources[i].ratio)
             miniW_val = miniH_val * sources[i].ratio;
      else miniH_val = miniW_val / sources[i].ratio;
            
      for (j=0; j<MatrixIndex.length; j++)
                {
                 url=cur_reflector+sources[MatrixIndex[j]].src+HiQuality + "&"+satRecvPrm;
                 m_container = document.getElementById("v_id"+j);
                 var m_AddParam = "";
                 if (!FilterAddons(m_container.id, sources[MatrixIndex[j]].src, miniH_val +"px",  miniW_val + "px", "DestrpoyMainRecv();"))
                   m_container.innerHTML = (GetPluginHTML(url, miniH_val, miniW_val, EnableVideo, EnableAudio, selectedSpeed, localDeinterlaceInDecoder));         
        }            
    }     
      else
      if (NeedReconnect) //Matrix Screen
      {
      DestrpoyMainRecv();


      if (typeof(sources[i].camsinrow)=="undefined" || sources[i].camsinrow==0) {
        sources[i].camsinrow = MatrixCount;
      }
    

      el.innerHTML = CreateTableForMatrix(MatrixCount, sources[i].camsinrow);                    


      var mainW_val = eval(mainW);
      var mainH_val = eval(mainH);;

      var p = Math.ceil(Math.sqrt(MatrixCount));
//      var camsinrow = MatrixCount > 1 ? p : 1;
      var camsinrow = sources[i].camsinrow;
      var row = Math.ceil(MatrixCount/camsinrow);
   
      var miniW_val = eval(mainW) / camsinrow;
      var miniH_val = eval(mainH) / row - 32;

      if (miniW_val/miniH_val > sources[i].ratio)
             miniW_val = miniH_val * sources[i].ratio;
      else miniH_val = miniW_val / sources[i].ratio;
   
                                 
                for (j=0; j<MatrixCount; j++)
                {
                 url=cur_reflector+sources[i].src[j]+HiQuality + "&"+satRecvPrm;
                 m_container = document.getElementById("v_id"+j);
                 var m_AddParam = "";
                 if (!FilterAddons(m_container.id, sources[i].src[j], miniH_val +"px",  miniW_val + "px", "DestrpoyMainRecv();"))     
                  m_container.innerHTML = (GetPluginHTML(url, miniH_val, miniW_val, EnableVideo, EnableAudio, selectedSpeed, localDeinterlaceInDecoder));                 
                }      
      }
   } // if (el)


    if (!FirstTime) 
    {
     CheckDisconnentPreviewOnScroll(1);
    }

}
}


// ------------------------------------------------------------------------------------------------

function Select_Speed(x, ret)
{
 if (x > 0)
 {
  for (var i=1; i<=Qualityes.length+1; i++)
   $('#chan'+i).removeClass("selectedbutton");
  $('#chan'+x).addClass("selectedbutton");
  CurrentInternetSpeed = x;
 }

   if (ret) return;

  if (OldNumber > 0)
  {
   OldNumber = OldNumber +1;
   Build(OldNumber - 1);
  }

}


// ------------------------------------------------------------------------------------------------

function swapPlace() {
     return;
 var t ='<table border="0" cellpadding="0" cellspacing="0"><tr>';
 var te = "</tr></table>"
 var t1 = ""; var t2="";
 
 if (ButtonPos==0)
 {
     //Перенос кнопок и ретрансляторов     
     $("#c_quality_title").html($("#speedTitle").html());
     $("#c_reflectors_title").html($("#reflectorTitle").html());
     
     $("#c_quality").html(t+BuildSpeedList("<td>","</td>")+te); 
     $("#c_reflectors").html(t+BuildReflectorList("<td>","</td>")+te); 
     $("#SpeedSelectDiv").html("");
     $("#reflectorDiv").html("");
     $("#c_SpeedSelectDiv").hide();
     $("#reflectorTable").hide();
     //Перенос ретрансляторов
        
     ButtonPos = 1;
  }
   else
 {
     //Перенос ретрансляторов обратно
     $("#SpeedSelectDiv").html(BuildSpeedList("","<br>"));
     $("#reflectorDiv").html(BuildReflectorList("","</br>"));
  
     $("#c_quality").html("");
     $("#c_reflectors").html("");
     
     $("#c_SpeedSelectDiv").show();
     $("#reflectorTable").show();      
          
     ButtonPos = 0;
  }
 
}


// ------------------------------------------------------------------------------------------------

function changeReflector(newrf, oldrf)
 {
   for (var i=0; i<=reflectors.length; i++)
   $('#ref'+i).removeClass("selectedbutton");
  $('#ref'+(newrf)).addClass("selectedbutton");
  defaultreflector = newrf;
  if (newrf != oldrf)
  {
    Select_Speed();
    BuildSound();
    BuildPreview();
  }
 }


// ------------------------------------------------------------------------------------------------

function SetAdminMode()
{
 EnterAdministrator();
 $('#AdminAuth').dialog("close");
}


// ------------------------------------------------------------------------------------------------

function RejectAdminMode()
{
 $("#AdminPass").val("");
 alert("Авторизация отклонена!"); 
 $('#AdminAuth').dialog("close");
}


// ------------------------------------------------------------------------------------------------

function TryAuth()
{
 var passData = $("#AdminPass").val(); 
 $.post(AdminPostPage, {check : passData } , function(data){eval(data);} );  
}


// ------------------------------------------------------------------------------------------------

function OpenAuthDialog()
{
 if ($("#AdminPass").val()=="")
 $('#AdminAuth').dialog("open");
 else
 TryAuth();
}


$(function() {
    $('#AdminAuth').dialog( {resizable:false, modal: true, autoOpen: false, width:'400', position:['right','top']} );            
    $('#AdminAuth').dialog( 'option', 'buttons', { "Авторизация": function() {TryAuth();},  "Отмена": function() { $(this).dialog("close"); } });                
 });


// ------------------------------------------------------------------------------------------------

function OnLoad()
{
 if (sources.length > 2) $("#PreviewWindowAnc").show();
 else
 ShowPreviews = 0;

 $("#PreviewModeBox").get(0).checked = ShowPreviews;
 $('#hideshowPrev').show('pulsate', {}, 300, '');

 $('.rounded').corners("10px");
 $('.rounded').corners("10px");
 if (GeckoEng) $("#button_HS").hide();
 if (UpPanelButtons) swapPlace();
 // hideShowPrClick(HidePreviewPanel);    
 ChangePreviewMode();       // В нём вызывается и BuildPreview()


 ScanTimeout(); // Запуск сканирования команд администрирования 
 Build(0);
 Select_Speed(Default_Speed); // Выбираем скорость подключения интернет

 changeReflector(defaultreflector,defaultreflector);
 BuildSound();
 Move(defSource-1);
 MakeAudioPanel(EnableSumAudio);
 $("#cb_audiopanel").get(0).checked = EnableSumAudio; // Выдаёт ошибку, что get(...) is null
 };


// ------------------------------------------------------------------------------------------------

function hideEffect(elName){
            var selectedEffect = "slide";
            var options = {};
            $("#"+elName).hide(selectedEffect,options,100,'');
};


// ------------------------------------------------------------------------------------------------

function hideShowPrClick(v) {            
            if (typeof(v)!=='undefined')
            HidePreviewPanel = v;
            if (HidePreviewPanel == 0)
            {                            
             ChangePreviewMode();
             HidePreviewPanel = 1;
             showEffect('previewTable');             
             $("#hideshowPrev").html("<small>Скрыть<br>панель<br>камер</small>");
            }
            else
            {            
             ChangePreviewMode();
             HidePreviewPanel = 0;
             hideEffect('previewTable');                         
             $("#hideshowPrev").html ("<small>Показать панель камер</small>");
            }
};

// Включени/отключение аудиопанели


// ------------------------------------------------------------------------------------------------

function ShowAudioPanel()
{
 MakeAudioPanel($("#cb_audiopanel").get(0).checked);
}


// ------------------------------------------------------------------------------------------------

function GetAuduioPanelUnitCode(i)
{  
  var v = '<OBJECT CLASSID="CLSID:6540685D-ABC2-4dfb-BC97-D71C5951B226" codebase="http://download.vidicor.ru/VidicorPlugin.exe" WIDTH="250" HEIGHT="26" borger=1>';
     v += '<PARAM NAME="URL" VALUE="'+ reflectors[defaultreflector].base+sources[i].src + '">';
     v += '<PARAM NAME="EnableVideo" VALUE="0"><PARAM NAME="EnableLimit" VALUE="0">';
     v += '<PARAM NAME="MulticastTimeout" VALUE="-1">';
     v += '<embed type="application/x-vidicor-plugin" pluginspage="http://download.vidicor.ru/VidicorPlugin.exe" WIDTH="250" HEIGHT="25"';
     v += ' URL="'+ reflectors[defaultreflector].base+sources[i].src + '"';
     v += ' EnableVideo="0" EnableLimit="0"';
     v += ' MulticastTimeout="-1">';
     v += '</embed>';
     v += '</OBJECT>';
     return v;
}


// ------------------------------------------------------------------------------------------------

function MakeAudioPanel(turn)
{
 var v = "";
 
 if ($('#AudioPanel').html()==null) return;
 
 if ($('#AudioPanel').html().length==0)
  {
   v += '<table width=100% border="0" bgcolor="#000000" cellpadding="0" cellspacing="0" ';
   v += 'title="Можно отключить звук он каких-то точек, регулировать громкость каждой точки, посмотреть параметры каждой из точек">';
   v += '<tr><td bgcolor=#555555 height=5></td></tr>';
   v += '<tr><td bgcolor=white height=1></td></tr>';
   v += '<tr><td height=3></td></tr>';
   v += '<tr><td align=center>';
   for (var i=1; i<sources.length; i++)     
     {
      v += '<table id="audiocelltitle'+i+'" border=0 style="display:inline"><tr><td align=right valign=middle width=80><font color=white> <small><small><small>' + sources[i].name + ': </small></small></small></font></td><td valign=middle >';
      v += '<div id="audiocell'+i+'"></div>';
      v += '</td></tr></table>';
     };     
    //

   v += '</small></small></small></font></td></tr>';
   v += '<tr><td height=3></td></tr>';
   v += '</table>';
   $('#AudioPanel').html(v);
  }
 
 
 var b_ShowPanel = ( turn==true || turn==1 );
 
 if (b_ShowPanel) 
   $('#AudioPanel').show();
 else
   $('#AudioPanel').hide();
   
  
   for (var i=1; i<sources.length; i++)     
   {
    var el = $("#audiocell"+i);
      if( typeof(sources[i].src)=="string"  )
      {
       if ((OldNumber != i) && b_ShowPanel)
       {
        if (el.html().length==0) el.html (GetAuduioPanelUnitCode(i));
        $("#audiocelltitle"+i).show();
       }
       else
       {
        $("#audiocelltitle"+i).hide();
        el.html ("");
       }
      }
      else
      el.html("");
  }
}

// ------------------------------------------------------------------------------------------------
