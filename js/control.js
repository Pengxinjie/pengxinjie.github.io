//动态读取学生名单
var arrs;
var timerss = setInterval(function() {    
  if($('#stu_names').val() != '') {
    clearInterval(timerss);
  }
}, 500);

//开始点名
function startName(time){
  let arr = $("#student_name ul").find("li");	
  for(var i = 0;i < arr.length; i++){
    $("#student_name ul").children()[i].style.background='';
  };
	var peoples= arr.length;
  //监视按钮的状态
  if($("#start_name").html()==="开始点名"){
      //定时针
      var aa = 0;
      time_unavailable();
      $('#start_name')[0].disabled=false;
      $('#start_name').removeClass('time_unavailable');
      timeId=setInterval(function () {
          //清空所有层的颜色
          for(var i = 0;i < arr.length; i++){
              $("#student_name ul").children()[i].style.background='';
          };
          //留下当前层的颜色
          $("#student_name ul").children()[aa].style.background='#009688';

          //语音播报
          var ttsDiv = document.getElementById('bdtts_div_id');
          var ttsAudio = document.getElementById('tts_autio_id');
          var ttsText = $("#student_name ul li").eq(aa).find("span").html();
		  console.log(ttsText)
          ttsDiv.removeChild(ttsAudio);
          var au1 = '<audio id="tts_autio_id" autoplay="autoplay">';
          var sss = '<source id="tts_source_id" src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=4&text='+ttsText+'" type="audio/mpeg">';
          var eee = '<embed id="tts_embed_id" height="0" width="0" src="">';
          var au2 = '</audio>';
          ttsDiv.innerHTML = au1 + sss + eee + au2;
          ttsAudio = document.getElementById('tts_autio_id');
          ttsAudio.play();

          aa++;
          if(aa == arr.length){
              clearInterval(timeId);
              // IE
              if(document.all) {
                  $("#start_name").click();
              }
              // 其它浏览器
              else {
                  var e = document.createEvent("MouseEvents");
                  e.initEvent("click", true, true);
                  $("#start_name").dispatchEvent(e);
              }
          }
      },(time*1000));
      $("#start_name").text("停止点名");
    }else{
        //清除计时器
        clearInterval(timeId);
        $("#start_name").text("开始点名");
        //清空所有层的颜色
        for(var i = 0;i < arr.length; i++){
          $("#student_name ul").children()[i].style.background='';
        };
        time_available();
    };
}

//随机点名
function answerName(){
  if($("#answer_name").html()==="点人答题"){
	  let arr = $("#student_name ul").find("li");
      //定时针
      time_unavailable();
      $('#answer_name').removeClass('time_unavailable');
      timeIds=setInterval(function () {
        //清空所有层的颜色
        for(var i = 0;i < arr.length; i++){
          $("#student_name ul").children()[i].style.background='';
        };
        //留下当前层的颜色
        rand = Math.floor(Math.random()*arr.length);
        $("#student_name ul").children()[rand].style.background='red';
      },300);
      $("#answer_name").text("会是谁?");
    }else{
        //清除计时器
        clearInterval(timeIds);
        $("#answer_name").text("点人答题");
        time_available();
    };
}

//开始点名后时间按钮以及下拉框不可用
function time_unavailable(){
  $('.btn_L')[0].disabled=true;
  $('.btn_C')[0].disabled=true; 
  $('.btn_R')[0].disabled=true;
  $('.select_voice').attr("disabled",true);
}

//停止点名后时间按钮以及下拉框可用
function time_available(){
  $('.btn_L')[0].disabled=false;
  $('.btn_C')[0].disabled=false; 
  $('.btn_R')[0].disabled=false;
  $('.select_voice').attr("disabled",false);
}

//定时器时间加
$('.btn_L').click(function(){
  var time_l = parseInt($('.btn_C').text());
  if(time_l < 10){
    time_l += 1;
    $('.btn_C').text(time_l);
  }
});

//定时器时间减
$('.btn_R').click(function(){
  var time_R = parseInt($('.btn_C').text());
  if(time_R > 1){
    time_R -= 1;
    $('.btn_C').text(time_R);
  }
});

//遍历缺勤名单，寻找重复值
function isInB(b,value){
    for(var i = 0; i < b.length; i++){
      if(value === b[i].innerHTML){
        return true;
      }
    }
    return false;
}

//遍历缺勤名单，寻找相应待删除值
function isValue(b,value){
    for(var i = 0; i < b.length; i++){
      if(value === b[i].innerHTML){
        return i;
      }
    }
}

var a = b = c = 0;
function lis() {
  $('.lists li').click(function(){
    $(this).toggleClass("que");
    var index_val = isValue($('#absence b'),$(this).html())
    if(isInB($('#absence b'),$(this).html())){
      $('#absence b')[index_val].remove()
      $('#tableExcel td')[index_val].remove()
    }else{
      $('#absence').append("<b>"+ $(this).html() +"</b>")
      $('#tableExcel').append("<td>"+ $(this).html() +"</td>")
    }
  })
}

document.onkeydown=function(event){
  var e = event || window.event || arguments.callee.caller.arguments[0];    
  if(e && event.keyCode == 13){ // enter 键
     $("#start_name").click();
  }
}; 

if(document.all){
    document.onselectstart= function(){return false;}; //for ie
}else{
    document.onmousedown= function(){return false;};
    document.onmouseup= function(){return true;};
}

//获取时间的函数
getTime();
setInterval(getTime,1000)
function getTime(){
    var day = new Date();
    var year = day.getFullYear();//年
    var month = day.getMonth()+1;//月
    var dat = day.getDate() <10 ? "0" + day.getDate(): day.getDate();//日
    var hour = day.getHours() <10 ? "0" + day.getHours(): day.getHours();//小时
    var minitue = day.getMinutes() <10 ? "0" + day.getMinutes(): day.getMinutes();//分钟
    var second = day.getSeconds()<10 ? "0" + day.getSeconds(): day.getSeconds();//
    $("#timers").text("当前时间: " + year+"-"+month+"-"+dat+" "+hour+":"+minitue+":"+second)
}


