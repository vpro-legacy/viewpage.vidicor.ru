<html>

 <head>

 <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
 <meta	http-equiv="Content-Type"	content="text/html; charset=windows-1251" />
 <meta http-equiv="X-UA-Compatible" content="requiresActiveX=true"/>

 <link	rel="shortcut icon"		type=image/x-icon	href="../favicon.ico" /> 
 <LINK	REL="stylesheet"		TYPE="text/css"		HREF="../styles/style.css" >


<link type="text/css" rel="stylesheet" href="../client_side/jquery/jquery-ui.css" >	
<script language='JavaScript' src="../client_side/jquery/jquery.js"></script>
<script language='JavaScript' src="../client_side/jquery/jquery-ui.js"></script>
<script language='JavaScript' src="../client_side/cookies.js"></script>

<script language="JavaScript">

//Consts//

var add_url_param = "?ref=http://pilot.vidicor.ru&";
var c_viewSite = "server_side/site.php"+add_url_param;
var c_viewFlash = "../flash/flash.php";
var c_pluginName = "Vidicor Gecko Plugin DLL";
var link = "http://download.vidicor.ru/VidicorPlugin.exe?"+Math.random()+".exe";
//End Consts//

 $.ui.dialog.defaults.bgiframe = true;
 
 $(function() {
	$("#RejectActiveX").dialog({ modal: true, resizable:true, autoOpen: false, width:'800'});
	$("#Step2").dialog({ modal: true, resizable:true, autoOpen: false, width:'800'});
	$("#OsDialog").dialog({ modal: true, resizable:true, autoOpen: false, width:'800'});
    $('#RejectActiveX').dialog('option', 'buttons', { "������": function() { GoToSite(); $(this).dialog("close"); window.setTimeout("window.close()", 1) },   
"����������": function() { RunSetup(); $(this).dialog("close"); $("#Step2").dialog("open"); } });        
    $('#OsDialog').dialog('option', 'buttons', { "�������": function() { $(this).dialog("close"); GotoFlash(); } });        
 });
 
		
var AxObj = null;

var GeckoEng = (navigator.userAgent.indexOf ("Gecko") != -1 || navigator.userAgent.indexOf ("Opera") != -1);

var isFireFox = navigator.userAgent.indexOf ("Firefox") != -1;
var isSafari = navigator.userAgent.indexOf ("Safari") != -1;
var isOpera = navigator.userAgent.indexOf ("Opera") != -1;

var isIE = window.navigator.userAgent.indexOf("MSIE") != -1;

function TestGecko()
{ 
 for(var i=0; i<navigator.plugins.length; i++)
   if(navigator.plugins[i].name==c_pluginName) return true;
 return false;
}

function IsWindows()
{
  //�� Microsoft
  return (navigator.userAgent.indexOf('Win') != -1);
}

function RunSetup()
{
 setCookie("SetupAX", 1);
 $("#load_table").hide();
 $("<IFRAME id='setupframe' style='display:none' src='about:blank'></IFRAME").appendTo("body");
 $("#setupframe").contents().get(0).location.href = link;
 $("#AutoLink").html("<a href='"+link+"' style='color:red'>�����</a>");
 if (isFireFox) $('.br_firefox').show();
 if (isSafari) $('.br_safari').show();
 if (isIE) $('.br_IE').show();
 if (isOpera) $('.br_Opera').show();
}

function GoToSite() { document.location.replace(c_viewSite); }

function GotoFlash() { document.location.replace(c_viewFlash); }

function RunFlashClock(n)
{
 if (n>0) 
  {
   $("#ClockId").html(n--);
   setTimeout("RunFlashClock("+n+")", 1000);
  }
  else
  GotoFlash();
}

function loadImages ()
{
 $("#setup2").get(0).src="../client_side/setup2.jpg";
 $("#operasave").get(0).src="../client_side/opera_save.jpg";
 $("#filerun").get(0).src="../client_side/file_run.jpg";
 $("#mozillasave").get(0).src="../client_side/mozilla_save.jpg";
 $("#mozillaloaded").get(0).src="../client_side/mozilla_loaded.jpg";
 $("#filerun2").get(0).src="../client_side/file_run.jpg"; 
 $("#applesave").get(0).src="../client_side/apple_save.jpg"; 
 $("#filerun3").get(0).src="../client_side/file_run.jpg"; 
 $("#setup22").get(0).src="../client_side/setup2.jpg"; 
 testAx();
}

function testAx()  {
    if (IsWindows())
    {
      var el = document.getElementById('testSpan');
      var elAX = document.getElementById('testContainer');

      if (1)      
        GoToSite(); //ActiveX ��������      
      else
      {//ActiveX �� ��������       
         $("#RejectActiveX").dialog('open');              
         if (isIE) $('#IEsec').show();
         var relLink = '<a href="#" style="color:blue" onclick="javascript:document.location.reload();return false;">�����</a>';
         $("#GeckoIETitle").html(GeckoEng ? "�������� ������� � �������� �������� �����" : "������� "+relLink+" ��� F5 ����� �������� ��������");    
      }
    }
    else
    {
     $("#OsDialog").dialog('open');                  
    }

if (isIE)  
if (getCookie("SetupAX")==1)
{
 $("#SetupAX2").show();
 $("#SetupAX").hide();
}

}
</script>
</head>


<body  bgcolor="gray" onload="loadImages();">
<noscript>
 <table>
  <tr>
    <td><img src='Img/warning.png' alt='Your browser does not support JavaScript!'></td>
    <td align='center'>
        <font color='red'>Processing of JavaScript is disabled! Please enable JavaScript processing or add the site to "Trusted".
        ��������� ��������� JavaScript! ��������� � ���������� ��������� JavaScript ��� �������� ���� ���� � "����������"!
	</font>
	<br>
	<img src="img/javascript/step1.jpg"><br>
	<img src="img/javascript/step2.jpg"><br>
	<img src="img/javascript/step3.jpg"><br>
	<img src="img/javascript/step4.jpg">
	
    </td>
   </tr>
 </table>
</noscript>

<OBJECT height="1" width="1" id="testContainer" CLASSID="CLSID:6540685D-ABC2-4dfb-BC97-D71C5951B226" codebase='http://download.vidicor.ru/VidicorPlugin.exe'>
<SPAN id="testSpan"> </SPAN>
</OBJECT>
    
<object  id="obj1" TYPE="application/x-vidicor-plugin" ALIGN=CENTER WIDTH=1 HEIGHT=1 pluginspage='http://download.vidicor.ru/VidicorPlugin.exe'>
 <embed TYPE="application/x-vidicor-plugin" pluginspage='http://download.vidicor.ru/VidicorPlugin.exe' WIDTH=1 HEIGHT=1> </embed>
</object>


<table width="100%" id="load_table">
  <tr>
    <td align='center'>
	<h2>�������� ��������� �������... </h2><br>
	<img src="../client_side/loading.gif">
	</td>
  </tr>
</table>


<div id="RejectActiveX" style="display:none" title="��������� ������� �������� �����. ��� 1">
<table><tr><td align=center>

<span id="SetupAX2" style="display:none">
 <font size='2'>
  ���� �� ��� ������� � ���������� ������ � �� �������� ��������� ������ ��������� ����� ������ -- �������� �� ��� ����� � ��������� ������������� ���������� �� ���� ���-����� ��� ��� ������� ��� ����:
 <br/><br/>
 <img id="setup2">
 </font>
 <br>
 ���� ���-�� �� ���������� -- ������� "����������", ����� ��������� ��������� � ������.
</span>

<span id="SetupAX">
<font size="4">��� ��������� ����� ���������� ���������� ������. ������� "����������", ����� ������ ������� ���������. ��������� ���� � �������� ��� �����������.<br />   
������� "������", ����� ������� ��������.
</font>
</td></tr>
</table> 
</div>
<span>

<div id="Step2" style="display:none" title="��������� ������� �������� �����. ��� 2">
<table><tr><td align=center>
<font size="4">
���� ���������� �� �������� �������������, ������� <span id="AutoLink"></span><br /><br />
</td></tr>
<tr><td>

<span class="br_Opera" style="display:none">
 <table>
  <tr><td align=center><img id="operasave"></td><td>1. ������� "���������". ����� �������� ����������� ������� ���������.</td></tr>  
 </table>
</span>

<span class="br_IE" style="display:none">
 <table>
  <tr><td align=center><img id="filerun"></td><td>1. ���� ������� ������������ �� �������� ���, ������� "���������". ����� �������� ����������� ������� ���������.</td></tr>  
 </table>
</span>

<span class="br_firefox" style="display:none">
 <table>
  <tr><td align=center><img id="mozillasave" ></td><td>1. ������� "��������� ����";</td></tr>
  <tr><td align=center><img id="mozillaloaded" ></td><td>2. ����� ���� ����������, ��������� ���������, ������ ������� ����� �� ����������� �����;<td></td></tr>
  <tr><td align=center><img id="filerun2" ></td><td>3. ���� ������� ������������ �� �������� ���, ������� "���������". ����� �������� ����������� ������� ���������.</td></tr>  
 </table>
</span>

<span class="br_safari" style="display:none">
 <table>
  <tr><td align=center><img id="applesave"></td><td>1. ������� "���������";</td></tr>
  <tr><td align=center><img id="filerun3"></td><td>2. ���� ������� ������������ �� �������� ���, ������� "���������". ����� �������� ����������� ������� ���������.</td></tr>  
 </table>
</span>


<span id="IEsec" style="display:none">
<br />
 <font size='2'>
 ���� �� �������� ��������� ������ �������� ����� ������ -- �������� �� ��� ����� � ��������� ������������� ���������� ��� ������� ��� ����:
 <br>
 <img id="setup22">
 </font>
</span>


<font size="4">
����� ���������� ��������� ������ ��������� ����� - <span id="GeckoIETitle"></span>.
</font>


</td></tr>
</table> 
</div>


<div id="OsDialog" style="display:none" title="������������ �������">
<table><tr><td align=center>
<font size="4">
������������ ������ ���������� �������� �� ������� ������ ��� �� Windows<br /> 
</font>
</td></tr>
</table> 
</div>


</body>
</html>

 
 
