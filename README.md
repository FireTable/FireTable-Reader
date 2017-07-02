# FireTable-Reader
##### FireTable-Reader前端 (就是这个项目)  
##### FireTable-Reader后台 [戳我进入](https://github.com/FireTable/FireTable_Reader_php)

## 在线版
http://村村.top/reader/   

在线版由于服务器问题，可能会导致请求后台过于缓慢，加载时间较长

手机扫码：  
![](/src/assets/show/qrcode.png)


## 使用
```
前端

git clone https://github.com/FireTable/FireTable-Reader.git

cd FireTable-Reader

npm install

# 开发环境
npm start
浏览器会自动打开页面

# 打包
npm run build

```

## 效果

  * ##### 初次加载流量少,400kb都不到,后续加载几乎不需要流量  
  ![](/src/assets/show/加载.png)  

  ***
  * ##### 功能概览
  ![](/src/assets/show/reader.gif)


## 功能
* ##### 已实现
  用户、书架、阅读器配置的CRUD功能  
  自动换源功能  
  书本搜索功能  
  章节跳跃功能  
  基本的阅读器功能    

* ##### TodosList
  章节列表优化，用ListView  
  自动换源优化  
  章节缓存
  书源等内容添加本地缓存  
  加入ant-Motion  


## 技术栈
* [dva](https://github.com/dvajs/dva)：基于 redux、redux-saga 和 react-router@2.x 的轻量级前端框架。
* [antd-mobile](https://mobile.ant.design/index-cn)：阿里的移动UI库。
* .roadhog：dva自带的配置文件，json配置超级好用。

## 第三方库
* qiniu4js：用于上传头像到七牛云。
* lodash：相当于JQuery的工具库。
* touchjs：百度的手势库。
* storejs：本地存储库。
* dva-loading：通过hook来自动改变loading状态。  
……

## API
感谢 [nReader项目](https://github.com/zimplexing/vue-nReader) 封装好的API   
[具体API文档](https://github.com/zimplexing/vue-nReader/blob/master/doc/zhuishushenqi.md)
