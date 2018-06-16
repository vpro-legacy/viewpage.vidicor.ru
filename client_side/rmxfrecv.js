var UAisMSIE    = false;
var UAisFirefox = false;
var UAisOpera   = false;
var UAisChrome  = false;
var UAisSafari  = false;
var UAisUnknown = false;

if      (navigator.userAgent.indexOf("MSIE"   ) != -1) UAisMSIE    = true;
else if (navigator.userAgent.indexOf("Trident") != -1) UAisMSIE    = true;
else if (navigator.userAgent.indexOf("Firefox") != -1) UAisFirefox = true;
else if (navigator.userAgent.indexOf("Opera"  ) != -1) UAisOpera   = true;
else if (navigator.userAgent.indexOf("Chrome" ) != -1) UAisChrome  = true;
else if (navigator.userAgent.indexOf("Safari" ) != -1) UAisSafari  = true;
else                                                   UAisUnknown = true;

var UAisAlternative = UAisFirefox || UAisOpera || UAisChrome || UAisSafari;

//
// RMXF viewer object constructor
//
// Usage:
//
// 1. Old-style usage:
//     var viewer = new RMXFViewer("UrlToConnect",
//                                 tagToInsertViewerInto [ ,
//                                 ParameterPairString1 [ ,
//                                 ParameterPairString2, ...]]);
//
//    Example:
//     var viewer = new RMXFViewer("rmxvp://195.19.132.60/capture/LiveCam",
//                                 document.getElementById("ViewerTagId"),
//                                 "Width=400", "Height=300", "EnableLimit=0");
//
// 2. New-style usage:
//     var viewer = new RMXFViewer("UrlToConnect",
//                                 tagToInsertViewerInto [ ,
//                                 ParametersArrayOrHash [ ,
//                                 EventHandlersArrayOrHash ]]);
//
//    Examples:
//     var viewer = new RMXFViewer("rmxvp://195.19.132.60/capture/LiveCam",
//                                 document.getElementById("ViewerTagId"),
//                                 [ "Width=400", "Height=300", "EnableLimit=0" ]); // Parameters array
//
//     var viewer = new RMXFViewer("rmxvp://195.19.132.60/capture/LiveCam",
//                                 document.getElementById("ViewerTagId"),
//                                 { Width : 400, Height : 300, EnableLimit : 0 }); // Parameters hash
//
//     var viewer = new RMXFViewer("rmxvp://195.19.132.60/capture/LiveCam",
//                                 document.getElementById("ViewerTagId"),
//                                 { Width : 400, Height : 300, EnableLimit : 0 }, // Parameters hash
//                                 [ "MouseClicked=OnMouseClicked1(this, eventParams);" ]); // Event handlers array
//
//     var viewer = new RMXFViewer("rmxvp://195.19.132.60/capture/LiveCam",
//                                 document.getElementById("ViewerTagId"),
//                                 { Width : 400, Height : 300, EnableLimit : 0 }, // Parameters hash
//                                 [ "MouseClicked=alert('clicked object ' + this);" ]); // Event handlers array
//
//     var viewer = new RMXFViewer("rmxvp://195.19.132.60/capture/LiveCam",
//                                 document.getElementById("ViewerTagId"),
//                                 { Width : 400, Height : 300, EnableLimit : 0 }, // Parameters hash
//                                 { MouseClicked : OnMouseClicked2 }); // Event handlers hash
//
//     var viewer = new RMXFViewer("rmxvp://195.19.132.60/capture/LiveCam",
//                                 document.getElementById("ViewerTagId"),
//                                 { Width : 400, Height : 300, EnableLimit : 0 }, // Parameters hash
//                                 { MouseClicked : function (x, y, down, dbl) { var viewer = this; if (down) DoSomethig(); } }); // Event handlers hash
//
//     var viewer = new RMXFViewer("rmxvp://195.19.132.60/capture/LiveCam",
//                                 document.getElementById("ViewerTagId"),
//                                 { Width : 400, Height : 300, EnableLimit : 0 }, // Parameters hash
//                                 { MouseClicked : "alert('clicked object ' + this);" }); // Event handlers hash
//
//     function OnMouseClicked1(viewerObj, prm)
//     { var viewer = viewerObj; alert("x=" + prm[0] + " y=" + prm[1] + " down=" + prm[2] + " dbl=" + prm[3]); }
//
//     function OnMouseClicked2(x, y, down, dbl)
//     { var viewer = this; alert("x=" + x + " y=" + y + " down=" + down + " dbl=" + dbl); }
//
function RMXFViewer(url, tag)
{
  if (!url) return null;
  if (!tag) return null;

  this.rmxfidx = rmxfViewers.length;
  rmxfViewers[this.rmxfidx] = this;

  this.SetSize    = RMXFViewer_SetSize   ;
  this.Destroy    = RMXFViewer_Destroy   ;
  this.Connect    = RMXFViewer_Connect   ;
  this.Disconnect = RMXFViewer_Disconnect;
  this.Reconnect  = RMXFViewer_Reconnect ;
  this.SetParam   = RMXFViewer_SetParam  ;
  this.CallEventHandler = RMXFViewer_CallEventHandler;

  var defProto = "rmxvp";

  var UDPPort = parseInt("80");
  var TCPPort = parseInt("80");

  var UDPPortsList = ("80,443,9000").split(",");
  var TCPPortsList = ("80,443,9000").split(",");

  var urlRe = new RegExp("^([A-Za-z0-9]+://)?([^/:]+)(:\\d+)?(/[^#?]*)(\\?[^#]*)?(#.*)?$");
  var urlReRes = urlRe.exec(url);
  if (!urlReRes) return;

  var urlparse = new Object();
  urlparse.str_proto    = RegExp.$1;
  urlparse.str_host     = RegExp.$2;
  urlparse.str_port     = RegExp.$3;
  urlparse.str_channel  = RegExp.$4;
  urlparse.str_svrparam = RegExp.$5;
  urlparse.str_clnparam = RegExp.$6;
  urlparse.proto    = (urlparse.str_proto != "") ? urlparse.str_proto.substr(0, urlparse.str_proto.length - 3) : "";
  urlparse.host     = urlparse.str_host;
  urlparse.port     = (urlparse.str_port != "") ? parseInt(urlparse.str_port.substr(1)) : 80;
  urlparse.channel  = urlparse.str_channel;
  urlparse.svrparam = urlparse.str_svrparam;
  urlparse.clnparam = urlparse.str_clnparam;

  if (urlparse.proto == "")
    urlparse.proto = defProto;

  if ((urlparse.proto == "rmxsp") || (urlparse.proto == "rmxtp"))
  {
    var found = false;
    for (var i = 0; i < TCPPortsList.length; i++)
      if ((TCPPortsList[i] != 0) && (TCPPortsList[i] == urlparse.port))
      { found = true; break; }
    if (!found)
      urlparse.port = TCPPort;
  }
  else
//  if ((urlparse.proto == "rmxvp") || (urlparse.proto == "rmxdp"))
  {
    var found = false;
    for (var i = 0; i < UDPPortsList.length; i++)
      if ((UDPPortsList[i] != 0) && (UDPPortsList[i] == urlparse.port))
      { found = true; break; }
    if (!found)
      urlparse.port = UDPPort;
  }

  urlparse.str_proto = urlparse.proto + "://";
  urlparse.str_port = ":" + urlparse.port;
  urlparse.url = urlparse.str_proto + urlparse.str_host + urlparse.str_port +
                 urlparse.str_channel + urlparse.str_svrparam + urlparse.str_clnparam;

  this.rmxfhost = urlparse.host;
  this.rmxfport = urlparse.port;
  this.rmxfuri  = urlparse.str_channel + urlparse.str_svrparam + urlparse.str_clnparam;
  this.rmxfurl  = urlparse.url;
  this.rmxftag  = tag;
  this.rmxfobj  = null;
  this.rmxftag.rmxfviewer = this;
  this.reqW = 360;
  this.reqH = 288;
  this.passivemode = 0;
  this.showcontrols = 0;

  this.rmxfprm = new Array();
  this.rmxfprm[this.rmxfprm.length] = "ResizeWindowOnStart=1";

  this.rmxfevt = new Object();
  this.rmxfevt_attached = false;

  if (arguments.length > 2)
  {
    if ((arguments[2] instanceof String) ||
        (typeof(arguments[2]) == "string"))
    {
      for (var i = 2; i < arguments.length; i++)
        this.SetParam(arguments[i]);
    }
    else
    {
      if (arguments[2] instanceof Array)
      {
        var arr = arguments[2];
        for (var i = 0; i < arr.length; i++)
          this.SetParam(arr[i]);
      }
      else
      if (arguments[2] instanceof Object)
      {
        var obj = arguments[2];
        for (var k in obj)
          this.SetParam(k + "=" + obj[k]);
      }
      if (arguments.length > 3)
      {
        if (arguments[3] instanceof Array)
        {
          var arr = arguments[3];
          for (var i = 0; i < arr.length; i++)
          {
            var s = arr[i].split("=", 2);
            if (s.length == 2)
              this.rmxfevt[s[0]] = s[1];
          }
        }
        else
        if (arguments[3] instanceof Object)
          this.rmxfevt = arguments[3];
      }
    }
  }

  if (!UAisUnknown)
  {
    var recvhtml = "../client_side/rmxfrecv.html";
    var el = document.getElementById("recvjc");
    if (el)
      recvhtml = el.src.replace(".js", ".html");
    // Work-around bug in Firefox browser cache - disable caching
    recvhtml += "?rnd=" + Math.random();

    this.rmxftag.innerHTML =
      "<IFRAME" +
      "  frameborder=no border=0 scrolling=no" +
      "  width=" + this.reqW + " height=" + (parseInt(this.reqH) + ((this.showcontrols != 0) ? 25 : 0)) +
      "  src='" + recvhtml + "#" + this.rmxfidx + "/" + this.rmxfhost + ":"+ urlparse.port + 
      ((this.passivemode != 0) ? "/passive" : "") + "'>" +
      "</IFRAME>";
  }
  else
  {
    var instText1 = "This browser can't use Plugin component!<p>" +
                    "You can use <b><u>Vidicor Watcher</u></b> instead to view video:";
    var instText2 = "<b>Click this link</b> to install Vidicor Watcher application";
    var instText3 = "<br>(run the file and follow its instructions)";
    var instText4 = "<b>Click here</b> or <b>Press F5</b> since installation completed";
//    var instText5 = "Attention! This page requires additional component to work.\n" +
//                    "Press OK and follow the component installation instructions.";
    var instText6 = "<b>Click here</b> or <b>Press F5</b> since installation completed";

    if (lang == "ru")
    {
      instText1 = "Данный интернет-браузер не позволяет<br>использовать Plugin компонент просмотра!<p>" +
                  "Используйте для просмотра<br>приложение <b><u>Vidicor Watcher</u></b>";
      instText2 = "<b>Нажмите на эту ссылку</b>, чтобы установить Vidicor Watcher";
      instText3 = "<br>(запустите файл и следуйте его инструкциям)";
      instText4 = "После завершения установки <b>щелкните здесь</b> или <b>нажмите F5</b>";
//      instText5 =   "Внимание! Эта страница требует для работы установки дополнительного приложения.\n" +
//                    "Нажмите OK и следуйте появившимся инструкциям по установке приложения.";
      var instText6 = "После завершения установки <b>щелкните здесь</b> или <b>нажмите F5</b>";
    }

    var svrBase = '';
    if (this.passivemode == 0)
      svrBase = "http://" + this.rmxfhost + "/";
    this.rmxftag.innerHTML = "<TABLE id=instructions width=" + this.reqW + " height=" + this.reqH + " border=10 cellpadding=0 cellspacing=0 bgcolor=#ffffaa>" +
                "<TR><TD align=center valign=middle>" +
                "<FONT color=#ff00000 size=+2><b>" + instText1 + "</b></FONT><p>" +
                "<LI><A href='" + svrBase + "watcher_setup.exe?nocache="+Math.round(999999*Math.random())+".exe'><U>" + instText2 + "</U></A>" +
                "" + instText3 +
                "<LI><a href=''><u>" + instText4 + "</u></a>" +
                "</TD></TR></TABLE>";
    var el = document.getElementById('instructions');
    el.scrollIntoView(true);
    location.href = this.rmxfurl;
//    alert(instText5);
  }
}


function DoReload()
{
  document.location.reload();
  return false;
}


//
// RMXF viewer video size method
// Usage:
//   viewer.SetSize(360, 288);
// or
//   viewer.SetSize("360x288");
//
function RMXFViewer_SetSize()
{
  var text4ref = true;
  var instText1 = "You have to install<br>Vidicor Plugin component<p>";
  var instText2 = "<b>Click this link</b> to install the component.";
  var instText3 = "<br>(run the file downloaded then follow its instructions)";
  var instText4 = "<b>Click here</b> or <b>Press F5</b> since installation completed";
  if (UAisOpera)
  {
    instText4 = "Restart your browser since installation completed <br>and return to this page again";
    text4ref = false;
  }
//  var instText5 = "Attention! This page requires additional component to work.\n" +
//                  "Press OK and follow component installation instructions.";
  var instText6 = "Don't pay attention to a browser message on a yellow bar (if any) above this page";

  if (lang == "ru")
  {
    instText1 = "Вам необходимо установить<br>компонент просмотра видео Vidicor";
    instText2 = "<b>Нажмите на эту ссылку</b>, чтобы установить этот компонент";
    instText3 = "<br>(запустите этот файл и следуйте его инструкциям)";
    instText4 = "После завершения установки <b>щелкните здесь</b> или <b>нажмите F5</b>";
    if (UAisOpera)
    {
      instText4 = "После завершения установки перезапустите ваш браузер <br>и вернитесь на эту страницу снова";
      text4ref = false;
    }
//    instText5 = "Внимание! Эта страница требует для работы установки дополнительного компонента.\n" +
//                "Нажмите OK и следуйте появившимся инструкциям по установке компонента.";
    var instText6 = "Не обращайте внимания на сообщение браузера<br>на желтой полосе сверху этой страницы, если имеется";
  }

  var w = -1;
  var h = -1;
  if (arguments.length == 2)
  {
    w = parseInt(arguments[0]);
    h = parseInt(arguments[1]);
  }
  else
  if (arguments.length == 1)
  {
    var str = new String(arguments[0]);
    var xi = str.indexOf('x', 0);
    if (xi < 0) xi = str.indexOf('X', 0);
    if (xi < 0) xi = str.indexOf('*', 0);
    if (xi >= 0)
    {
      w = parseInt(str.substring(0, xi));
      h = parseInt(str.substring(xi + 1));
    }
  }
  else
  if (arguments.length == 0)
  {
    w = this.reqW;
    h = this.reqH;
  }

  if ((w >= 0) && (h >= 0))
  {
    this.reqW = w;
    this.reqH = h; 
    if (this.rmxfobj && (UAisAlternative || (this.rmxfobj.readyState >= 4)))
    {
      if (this.rmxfobj.URL != null)
      {
        window.setTimeout('RMXFCallSetVideoSize(' + this.rmxfidx + ', ' + w + ', ' + h + ')', 10);
      }
      else
      {
        var svrBase = '';
        if (this.passivemode == 0)
          svrBase = "http://" + this.rmxfhost + ((this.rmxfport != 0) ? (":" + this.rmxfport) : "") + "/";
        this.rmxftag.innerHTML = "<TABLE id=instructions width=" + this.reqW + " height=" + this.reqH + " border=10 cellpadding=0 cellspacing=0 bgcolor=#ffffaa>" +
                "<TR><TD align=center valign=middle>" +
                "<FONT color=#ff00000 size=+2><b>" + instText1 + "</b></FONT><p>" +
                "<LI><A target='_blank' href='" + svrBase + "activex_setup.exe?nocache=" + Math.round(999999 * Math.random()) + ".exe'><U>" + instText2 + "</U></A>" +
                instText3 + "<br>" +
                "<LI>" + (text4ref ? "<a href='#' onclick='return DoReload();'><U>" : "") + instText4 + (text4ref ? "</u></a>" : "") +
                "<p><FONT color=#ff00000 size=+1>" + instText6 + "</font>" + "<br>" +
                "</TD></TR></TABLE>";
        {
          var el = document.getElementById('instructions');
          if (el) el.scrollIntoView(true);
        }
      }
    }
  }
}

//
// RMXF viewer destroying method
// Usage:
//   viewer.Destroy();
//
function RMXFViewer_Destroy()
{
  rmxfViewers[this.rmxfidx] = null;
  this.rmxfobj = null;
  if (this.rmxftag)
  {
    this.rmxftag.innerHTML = "";
    this.rmxftag.rmxfviewer = null;
  }
  this.rmxftag = null;
}

//
// Destroy all constructed viewers
// Usage:
//   DestroyAllViewers();
//
function DestroyAllViewers()
{
  if (rmxfViewers)
    for (var i = 0; i < rmxfViewers.length; i++)
      if (rmxfViewers[i])
      {
        rmxfViewers[i].Disconnect();
        rmxfViewers[i].Destroy();
        rmxfViewers[i] = null;
      }
  rmxfViewers = null;
}

//
// Internal function. DO NOT CALL IT !!!
//
function RMXFCallSetVideoSize(idx, w, h)
{
  var va = rmxfViewers;
  if (!va) return;
  if (idx < 0) return;
  if (idx >= va.length) return;
  var vw = va[idx];
  if (!vw) return;
  var vo = vw.rmxfobj;
  if (!vo) return;
  vo.setVideoSize(w, h);
}

//
// RMXF viewer connect method
// Usage:
//   viewer.Connect();
//
function RMXFViewer_Connect()
{
  var vo = this.rmxfobj;
  if (!vo) return;
  vo.Connect();
}

//
// RMXF viewer disconnect method
// Usage:
//   viewer.Disconnect();
//
function RMXFViewer_Disconnect()
{
  var vo = this.rmxfobj;
  if (!vo) return;
  vo.Disconnect();
}

//
// RMXF viewer reconnect method
// Usage:
//   viewer.Reconnect();
//
function RMXFViewer_Reconnect()
{
  var vo = this.rmxfobj;
  if (!vo) return;
  vo.Reconnect();
}

//
// Internal function. DO NOT CALL IT !!!
//
function RMXFTagCallback(rmxfHash, tagProc)
{
  var s = unescape(rmxfHash).split("/", 2)
  var rmxfIdx = parseInt(s[0]);
  eval(unescape(tagProc));
  RMXF_TagProc(rmxfViewers[rmxfIdx]);
}

//
// Internal function. DO NOT CALL IT !!!
//
function RMXFViewer_SetParam(param)
{
  this.rmxfprm[this.rmxfprm.length] = param;
  var s = param.split("=", 2);
  if (s.length == 2)
  {
    var n = s[0];
    var v = s[1];
    if (n.toLowerCase() == "width" ) this.reqW = v;
    else
    if (n.toLowerCase() == "height") this.reqH = v;
    else
    if (n.toLowerCase() == "passivemode") this.passivemode = v;
    else
    if (n.toLowerCase() == "showcontrols") this.showcontrols = v;
  }
}

//
// Internal function. DO NOT CALL IT !!!
//
function RMXFViewer_CallEventHandler(eventName, eventParams)
{
  if (this.rmxfevt)
  {
    var handler = this.rmxfevt[eventName];
    if (handler)
    {
      if (handler instanceof Function)
        handler.apply(this, eventParams);
      else
        eval(handler.toString());
    }
  }
}

//
// RMXF viewers internal array. DO NOT USE IT!!!
//
var rmxfViewers = new Array();

//
// Load specified script file and execute it
//
function ExecuteScript(path, completion)
{
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.src = path;

  // Handle Script loading
  {
    var done = false;

    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function()
    {
      if (!done && (!this.readyState || (this.readyState == "loaded") || (this.readyState == "complete")))
      {
        done = true;
        if (completion) completion();
        head.removeChild(script);
      }
    };
  }

  head.appendChild(script);
}

//
// Load config file and execute it
//
function ExecuteConfig(path, completion)
{
  var loadbase = document.location.search.substr(1);
  ExecuteScript(((loadbase != "") ? ("http://" + loadbase + "/") : "") + path, completion);
}

//
// Array of scripts to execute after configs scripts loading
//
var PostConfigScripts = new Array();

//
// Is configs scripts loaded
//
var ConfigsLoaded = false;

//
// Register script to execute after configs loading
//
function AddPostConfigScript(func)
{
  if (ConfigsLoaded)
    func();
  else
    PostConfigScripts[PostConfigScripts.length] = func;
}

//
// Run all of registered scripts after configs loading
//
function OnLoadConfigs()
{
  for (var i = 0; i < PostConfigScripts.length; i++)
    PostConfigScripts[i]();
  ConfigsLoaded = true;
  PostConfigScripts = new Array();
}

//
// Detect user language
//
function DetectUserLanguage()
{
  var l = "";
  if (navigator.userLanguage)
    l = navigator.userLanguage.toLowerCase();
  else
  if (navigator.language)
    l = navigator.language.toLowerCase();
  var mp = l.indexOf("-");
  if (mp >= 0) l = l.substr(0, mp);
  return l;
}

//
// User language ("ru", "en" etc)
//
var lang = DetectUserLanguage();

//
// Set attribute of tag
//
function SetAttr(tagId, attr, value)
{
  var el = document.getElementById(tagId);
  if (el)
  {
    if (attr == "innerText")
    {
      if (el.textContent)
        el.textContent = value;
      else
        el.innerText = value;
    }
    else
      el[attr] = value;
  }
}

//
// Set attribute of tag if UI language is specified
//
function SetLangAttr(tagId, langId, attr, value)
{
  if ((langId == null) || (lang == langId))
    SetAttr(tagId, attr, value);
}

//
// Get URL protocol from form protocol
//
function GetURLProto(formproto, userproto)
{
  if (formproto == 'VDP')
    return 'rmxvp://';
  if (formproto == 'UDP')
    return 'rmxdp://';
  if (formproto == 'UDPU')
    return 'rmxdp://';
  if (formproto == 'UDPM')
    return 'rmxdp://';

  if (formproto == 'VCP')
    return 'rmxsp://';
  if (formproto == 'TCP')
    return 'rmxtp://';

  if ((userproto != null) && (userproto != ""))
    return userproto;

  return 'rmxvp://';
}

//
// Is form protocol UDP
//
function IsProtoUDP(formproto)
{
  var urlproto = GetURLProto(formproto);
  if (urlproto == 'rmxvp://') return true;
  if (urlproto == 'rmxdp://') return true;
  return false;
}

//
// Is form protocol TCP
//
function IsProtoTCP(formproto)
{
  var urlproto = GetURLProto(formproto);
  if (urlproto == 'rmxsp://') return true;
  if (urlproto == 'rmxtp://') return true;
  return false;
}

//
// Is form protocol multicast UDP
//
function IsProtoMulticastUDP(formproto)
{
  return (formproto == 'UDPM');
}

//
// Get default URL to view
//
function GetDefautURL()
{
  var params = "";
  var hash = document.location.hash;
  if ((hash.length > 0) && (hash.charAt(0) == "#"))
    params = hash.substr(1);

  var par_array = new Array();
  if (params.length > 0)
  {
    params = params.split("&");
    for (var i = 0; i < params.length; i++)
    {
      var v = params[i].split("=", 2);
      par_array[v[0]] = v[1];
    }
  }

  var channel = "capture/LiveCam";
  if (par_array["channel"])
    channel = par_array["channel"];
  if ((channel.length > 0) && (channel.charAt(0) == "/"))
    channel = channel.substr(1);

  var hostport = document.location.host;
  var idx = hostport.indexOf(':');
  var lochost = (idx >= 0) ? hostport.substr(0, idx) : hostport;
  var port = 80;
  if (defPort && !isNaN(parseInt(defPort))) port = defPort;
  var locport = parseInt((idx >= 0) ? hostport.substr(idx + 1) : port);

  return urlprotocol + lochost + ":" + locport + "/" + channel;
}

