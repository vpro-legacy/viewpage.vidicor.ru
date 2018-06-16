//Файл с необязательными настройками

DefaultVideoAspectRatio = 0;

// Базы для URL источников
var servIP = "reflector3.vidicor.ru";
var TitleBase = "";
var rec_prefix = "";
var r_suffix = "";

// -------------------------- Репликаторы -------------------------- //

var TitleReflectors = 'Источник<br>(репликатор):';

// -------------------------- Качество (скорость) -------------------------- //

var TitleQuality = 'Качество<br>видео: ';

var Qualityes = new Array(
 {
     index: 1,
     name: "Высокая",
     title: "Принимать видеопоток высокого качества. Скорость потока видео и звука -- до 5 Мбит/c"
 }, {
     index: 2,
     name: "Cредняя",
     title: "Принимать видеопоток среднего качества. Скорость потока видео и звука -- до 2 Мбит/c"
 }, {
     index: 3,
     name: "Низкая",
     title: "Принимать видеопоток низкого качества. Скорость потока видео и звука -- до 1 Мбит/c"
 }, {
     index: 4,
     name: "Слайды",
     title: "Принимать слайды. Скорость потока видео и звука -- до 500 Кбит/c"
     // }, {
     //  index: 5,
     //  name: "Сверхвысокая",
     //  title: "Принимать видеопоток очень высокого качества. Скорость потока видео и звука -- до 16 Мбит/c"
 }
);

var Default_Speed = 1;

var BufferAudio = 700; 	// Буфер звука
var BufferVideo = 700; 	// Буфер изображения

//8 pix - border
var mainW = "$(window).width()-28"; //"0.98 * window.document.body.clientWidth";
var mainH = "$(window).height()-28"; //"0.98 * window.document.body.clientHeight * 9/16";

var NumPrev = 20; // Количество превью-окон в строке панели (Определяет (1) ширину окна превью и (2) где делать "перевод строки"

var previewW = "(window.document.body.clientWidth-100)/NumPrev-20"; // Ширина preview ячейки 10 -- зазор между ячейками, 120 -- надписи *****
var previewH = "previewW * 9/16"; // Пропорции всех окон превью -- одинаковые

NotShowHelp = 1; // =1 -- не сопосавлять первому месту превью выдачу инструкции и "только звук" // *****

// var FrameContent = "<table width=100% heigth=100%><tr><td align=center bgcolor=brown><font color=white><b>А Ф И Ш А</b></td><td align=center bgcolor=brown><font color=white><b>О Б Ъ Я В Л Е Н И Я</b></td></tr><tr><td><iframe src='" + FrameSrc1 + "' width=" + (eval(mainW)/2-20) + " height=" + (eval(mainH)-550) + " align=center></iframe></td><td><iframe src='" + FrameSrc2 + "' width=" + (eval(mainW)-20) + " height=" + (eval(mainH)-50) + " align=center></iframe></td></tr></table>";

var ScrollTimeMs_Down = 600;
var ScrollTimeMs_Up   = 1000;

var previewQuality = "#selectedVideoStream=9999";
var HiQuality = "#selectedVideoStream=1";

var satRecvPrm = ""; 	//"RequestRetryTimeoutMs=2500&EnableConnectionDetection=0";

var DeinterlaceInDecoder = 0; // Включить деинтерлейс в приёмнике
var HeightDecrease = 57; // Уменьшение высоты видеоокна в ущерб пропорциям -- напр., для вывода в полный экран со строкой состояния (она 32pt)
var HideHeader = 0; 	// Скрыть заголовок страницы

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
//var UpPanelButtons = 1; // кнопки выбора скорости/репликатора сверху или по бюокам
var ShowHidePreviewPanel = 0;
var HidePreviewPanel = 0;
var ShowPreviews = 1;

var SyncronizationBySound = 0; //Включение/выключение синхронизации
var SyncPoint = "sync"; //Имя точки синхронизации

var MCastTimeOut = 0;   // 0 -- запрет на multicast, 
// иначе -- время ожидания получения multicast-потока в секундах;
// затем -- попытка unicast

var EnableAudio = 1; 	// Режим вывода звука: 1 -- звук от окна видео, 0 -- звук от спец. окна звука
var EnableAudioMatrix = 0; // Режим вывода звука при матрице: 1 -- звук от окна видео, 0 -- звук только от спец. окна звука
var EnableSumAudio = 0; 	// Вывод панелей звука от всех точек
var EnableAudioPreview = 0; // Выдавать ли звук от превью окон
var ShowStatusBar = 1; //Выдавать статус бар
var c_statusBatHeigth = 32;

var ColorArray =
  { 
   deselected: "#555555",
   selected:   "#dddddd",
   inmatrix:   "#ffcccc"  
  };

var ChatSite = "";
var ChatShow = 1; //Показывать чат - 1 или нет - 0