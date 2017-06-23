//七牛上传头像的方法
import {Toast} from 'antd-mobile';
import {UploaderBuilder, uploader} from 'qiniu4js';

let dispatch;

let Iconuploader = new UploaderBuilder().debug(false) //开启debug，默认false
// .button('button')//指定上传按钮
  .domain({http: "http://upload-z2.qiniu.com", https: "https://upload-z2.qbox.me"}) //默认为{http: "http://upload.qiniu.com", https: "https://up.qbox.me"}
//.scheme("https")//默认从 window.location.protocol 获取，可以通过指定域名为 "http://img.yourdomain.com" 来忽略域名选择。
  .retry(0). //设置重传次数，默认0，不重传
compress(0.5). //默认为1,范围0-1
scale([200, 0]). //第一个参数是宽度，第二个是高度,[200,0],限定高度，宽度等比缩放.[0,100]限定宽度,高度等比缩放.[200,100]固定长宽
size(1024 * 1024). //分片大小，最多为4MB,单位为字节,默认1MB
chunk(true). //是否分块上传，默认true，当chunk=true并且文件大于4MB才会进行分块上传
auto(true). //选中文件后立即上传，默认true
multiple(true) //是否支持多文件选中，默认true
//.accept(['video/*'])//过滤文件，默认无，详细配置见http://www.w3schools.com/tags/att_input_accept.asp

// 在一次上传队列中，是否分享token，如果为false每上传一个文件都需要请求一次token，默认true。
//
// 如果saveKey中有需要在客户端解析的变量，则忽略该值。
  .tokenShare(true)

// 设置token获取函数，token获取完成后，必须调用`setToken(token);`不然上传任务不会执行。
//
// 覆盖tokenUrl的设置。
  .tokenFunc(function(setToken, task) {
  setTimeout(function() {
    setToken("");
  }, 1000);
})

// 设置token获取URL：客户端向该地址发送HTTP GET请求, 若成功，服务器端返回{"uptoken": 'i-am-token'}。
//
// 覆盖tokenFunc的设置。
  .tokenUrl('http://localhost/FireTable_Reader_php/token')

// 设置token获取过程是否使用了saveKey，默认false。
//
// 若为true，则listener中的onTaskGetKey不会被调用。
  .saveKey(true)

// 设置tokenUrl请求中的saveKey参数和七牛上传策略中的saveKey字段。
//
// 客户端解析变量（七牛不支持在saveKey中使用这些变量）：
// * $(uuid)
// * $(imageInfo.width) $(imageInfo.height)
//
// 如参数中有需要在客户端解析的变量，则忽略tokenShare的设置。
//
// 若设置了，则listener中的onTaskGetKey不会被调用。
//
// 关于saveKey，见https://developer.qiniu.com/kodo/manual/vars
  .saveKey('dir1/dir2/$(uuid)_$(imageInfo.width)x$(imageInfo.height)$(ext)')

//任务拦截器
  .interceptor({
  //拦截任务,返回true，任务将会从任务队列中剔除，不会被上传
  onIntercept: function(task) {
    return task.file.size > 1024 * 1024;
  },
  //中断任务，返回true，任务队列将会在这里中断，不会执行上传操作。
  onInterrupt: function(task) {
    if (this.onIntercept(task)) {
      Toast.info('头像必须小于1M...', 1.3);
      return true;
    } else {
      return false;
    }
  }
})
//你可以添加多个任务拦截器
// .interceptor({...})
  .listener({
  onReady(tasks) {
    //该回调函数在图片处理前执行,也就是说task.file中的图片都是没有处理过的
    //选择上传文件确定后,该生命周期函数会被回调。
    Toast.info('上传头像中...', 1.3);

  },
  onStart(tasks) {
    //所有内部图片任务处理后执行
    //开始上传

  },
  onTaskGetKey(task) {
    //为每一个上传的文件指定key,如果不指定则由七牛服务器自行处理
    return "test.png";

  },
  onTaskProgress: function(task) {
    //每一个任务的上传进度,通过`task.progress`获取
    console.log(task.progress);

  },
  onTaskSuccess(task) {
    //一个任务上传成功后回调
    console.log(task.result.key); //文件的key
    const icon = `http://opzvozftr.bkt.clouddn.com/${task.result.key}`;
    const newData = {'icon':icon};
    console.log("icon");
    console.log(newData);
    dispatch({
      type: 'user/update',
      payload: {
        ...newData
      }
    });

    console.log(task.result.hash); //文件hash
  },
  onTaskFail(task) {
    //一个任务在经历重传后依然失败后回调此函数
  },
  onTaskRetry(task) {
    //开始重传
  },
  onFinish(tasks) {
    //所有任务结束后回调，注意，结束不等于都成功，该函数会在所有HTTP上传请求响应后回调(包括重传请求)。
  }
}).build();

//如果auto设置为false,则需要手动启动上传。
//uploader.start();

//上传头像
function uploadIcon(userDataDispatch) {
  dispatch = userDataDispatch;
  Iconuploader.chooseFile();
}

export default uploadIcon;
