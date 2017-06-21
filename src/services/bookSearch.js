// request 是我们封装的一个网络请求库
import request from '../utils/request';

//``使用连接字符串,request的url
const url ='http://novel.juhe.im/';

//查询关键字
export async function queryKeyword(params) {
  console.log('queryKeyword_service');
  console.log(params);
  const data =request(`${url}search?keyword=${params.keyword}`,
  {
    method: 'GET'
  });
  return data;
}

//查询id
export async function queryId(params) {
  console.log('queryId_service');
  console.log(params);
  const data =request(`${url}book-info/${params.id}`,
  {
    method: 'GET'
  });
  return data;
}

//创建
export async function create(params) {
  //post需要用formData来传输值,fetch中并没有内置,需要自己创建
  //这里我用了个params转换为formdata的自写方法
  const  formData = paramsTOformData(params);
  const data =request(`${url}/register`,
  {
    method: 'POST',
    body:formData
  });

  return data;
}

//删除
export async function _delete(params) {
  const data =request(`${url}/delete/${params.id}`,
  {
    method: 'DELETE'
  });

  return data;
}

//更新,patch提交的是json
export async function update(params) {
  console.log(params);
  const data =request(`${url}/update/${params.id}`,
  {
    method: 'PATCH',//PUT对资源完全替换,PATCH局部替换
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(params)
  });

  return data;
}



//查询参与者
export async function queryActor(params) {
  console.log('ddd');
  console.log(params);
  const data =request(`${url}/queryActor/${params.actor_id}`,
  {
    method: 'GET'
  });

  return data;
}

//登录查询
export async function login(params) {
  const data =request(`${url}/login/${params.username}/${params.password}`,
  {
    method: 'GET' //必须添加POST/GET请求,否则发送的会是OPTIONS请求,PHP无法获得数据,FETCH的特性
  });

  return data;
}
