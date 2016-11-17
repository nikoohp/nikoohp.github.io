// 使用原生js 封装ajax
// 兼容xhr对象
function createXHR(){
  if (typeof XMLHttpRequest != "undefined") { // 非IE6浏览器
    return new XMLHttpRequest();
  } else {
    throw new Error("您的系统或浏览器不支持XHR对象！");
  }
}
// 转义字符
function params(data){
  var arr = [];
  for(var i in data){
    arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
  }
  return arr.join("&");
}
// 封装ajax
function ajax(obj){
  var xhr = createXHR();
  obj.url = obj.url //+ "?" + Math.random(); // 清除缓存
  obj.data = params(obj.data);      // 转义字符串
  if(obj.method === "get"){      // 判断使用的是否是get方式发送
    obj.url += obj.url.indexOf("?") == "-1" ? "?" + obj.data : "&" + obj.data;
  }
  // 异步
  if(obj.async === true){
    // 异步的时候需要触发onreadystatechange事件
    xhr.onreadystatechange = function(){
      // 执行完成
      if(xhr.readyState == 4){
        callBack();
      }
    }
  }
  xhr.open(obj.method,obj.url,obj.async);  // false是同步 true是异步 // "demo.php?rand="+Math.random()+"&name=ga&ga",
  if(obj.method === "post"){
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(obj.data);
  }else{
    xhr.send(null);
  }
  // xhr.abort(); // 取消异步请求
  // 同步
  if(obj.async === false){
    callBack();
  }
  // 返回数据
  function callBack(){
    // 判断是否返回正确
    if(xhr.status == 200){
      obj.success(xhr.responseText);
    }else{
      obj.Error("获取数据失败，错误代号为："+xhr.status+"错误信息为："+xhr.statusText);
    }
  }
}
