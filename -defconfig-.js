//���� � ��������������� �����������

DefaultVideoAspectRatio = 0;

// ���� ��� URL ����������
var servIP = "reflector3.vidicor.ru";
var TitleBase = "";
var rec_prefix = "";
var r_suffix = "";

// -------------------------- ����������� -------------------------- //

var TitleReflectors = '��������<br>(����������):';

// -------------------------- �������� (��������) -------------------------- //

var TitleQuality = '��������<br>�����: ';

var Qualityes = new Array(
 {
     index: 1,
     name: "�������",
     title: "��������� ���������� �������� ��������. �������� ������ ����� � ����� -- �� 5 ����/c"
 }, {
     index: 2,
     name: "C������",
     title: "��������� ���������� �������� ��������. �������� ������ ����� � ����� -- �� 2 ����/c"
 }, {
     index: 3,
     name: "������",
     title: "��������� ���������� ������� ��������. �������� ������ ����� � ����� -- �� 1 ����/c"
 }, {
     index: 4,
     name: "������",
     title: "��������� ������. �������� ������ ����� � ����� -- �� 500 ����/c"
     // }, {
     //  index: 5,
     //  name: "������������",
     //  title: "��������� ���������� ����� �������� ��������. �������� ������ ����� � ����� -- �� 16 ����/c"
 }
);

var Default_Speed = 1;

var BufferAudio = 700; 	// ����� �����
var BufferVideo = 700; 	// ����� �����������

//8 pix - border
var mainW = "$(window).width()-28"; //"0.98 * window.document.body.clientWidth";
var mainH = "$(window).height()-28"; //"0.98 * window.document.body.clientHeight * 9/16";

var NumPrev = 20; // ���������� ������-���� � ������ ������ (���������� (1) ������ ���� ������ � (2) ��� ������ "������� ������"

var previewW = "(window.document.body.clientWidth-100)/NumPrev-20"; // ������ preview ������ 10 -- ����� ����� ��������, 120 -- ������� *****
var previewH = "previewW * 9/16"; // ��������� ���� ���� ������ -- ����������

NotShowHelp = 1; // =1 -- �� ����������� ������� ����� ������ ������ ���������� � "������ ����" // *****

// var FrameContent = "<table width=100% heigth=100%><tr><td align=center bgcolor=brown><font color=white><b>� � � � �</b></td><td align=center bgcolor=brown><font color=white><b>� � � � � � � � � �</b></td></tr><tr><td><iframe src='" + FrameSrc1 + "' width=" + (eval(mainW)/2-20) + " height=" + (eval(mainH)-550) + " align=center></iframe></td><td><iframe src='" + FrameSrc2 + "' width=" + (eval(mainW)-20) + " height=" + (eval(mainH)-50) + " align=center></iframe></td></tr></table>";

var ScrollTimeMs_Down = 600;
var ScrollTimeMs_Up   = 1000;

var previewQuality = "#selectedVideoStream=9999";
var HiQuality = "#selectedVideoStream=1";

var satRecvPrm = ""; 	//"RequestRetryTimeoutMs=2500&EnableConnectionDetection=0";

var DeinterlaceInDecoder = 0; // �������� ����������� � ��������
var HeightDecrease = 57; // ���������� ������ ��������� � ����� ���������� -- ����., ��� ������ � ������ ����� �� ������� ��������� (��� 32pt)
var HideHeader = 0; 	// ������ ��������� ��������

var doScrollDown = 1;

var ColorSensor = "#3399FF";
var ColorSensor1 = "#33BBFF";
var ColorPreviewBg = "#999999";
var ColorPrefiewFont = "#Black";
var ColorSpeedBg = "";
var ColorSpeedFont = "Black";
var ColorFlashBg = "LightYellow";
var ColorFlashFont = "Black";
var Button = "img/button.gif";
var ButtonPush = "img/button1.gif";

//Button on up Panel
//var UpPanelButtons = 1; // ������ ������ ��������/����������� ������ ��� �� ������
var ShowHidePreviewPanel = 0;
var HidePreviewPanel = 0;
var ShowPreviews = 1;

var SyncronizationBySound = 0; //���������/���������� �������������
var SyncPoint = "sync"; //��� ����� �������������

var MCastTimeOut = 0;   // 0 -- ������ �� multicast, 
// ����� -- ����� �������� ��������� multicast-������ � ��������;
// ����� -- ������� unicast

var EnableAudio = 1; 	// ����� ������ �����: 1 -- ���� �� ���� �����, 0 -- ���� �� ����. ���� �����
var EnableAudioMatrix = 0; // ����� ������ ����� ��� �������: 1 -- ���� �� ���� �����, 0 -- ���� ������ �� ����. ���� �����
var EnableSumAudio = 0; 	// ����� ������� ����� �� ���� �����
var EnableAudioPreview = 0; // �������� �� ���� �� ������ ����
var ShowStatusBar = 1; //�������� ������ ���
var c_statusBatHeigth = 32;

var ColorArray =
  { 
   deselected: "#555555",
   selected:   "#dddddd",
   inmatrix:   "#ffcccc"  
  };

var ChatSite = "";
var ChatShow = 1; //���������� ��� - 1 ��� ��� - 0