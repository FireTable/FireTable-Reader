import React from 'react';
import styles from './Information.css';
import { Popup,List, Button, InputItem,WingBlank,WhiteSpace,Flex,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import uploadIcon from './UploadIcon';

let username = '';
let password = '';
let nickname = '';
let icon = '';

let dispatch;

const LENGTH = 2;

const Item = List.Item;

class PopupContent extends React.Component {
  //更新资料
  update(nickname){
    const newData = {'nickname':nickname};
    dispatch({
      type: 'user/update',
      payload: {
        ...newData
      }
    });
  }
  render() {
    return (
      <div style={{textAlign:'center'}}>
        <WingBlank>
        <List renderHeader={() => `修改${this.props.type}`}>
            <InputItem  clear placeholder='必填'
              onChange={value => nickname = value}>
              新{this.props.type}
            </InputItem>
        </List>
          <WhiteSpace size='md'/>
          <Button  size="small" type="primary"
            onClick={() => {
              this.update(nickname);
              Popup.hide();
            }}>确定</Button>
          <WhiteSpace size='sm'/>
          <Button  size="small" type="ghost" onClick={() => Popup.hide()}>取   消</Button>
          <WhiteSpace size='md'/>
          </WingBlank>
        </div>
    );
  }
}

//表单验证的输入框
class InputForm extends React.Component {
  //注册
  register = (newData) =>{
    console.log('register');
    console.log(newData);
    dispatch({
      type: 'user/create',
      payload:newData
   });
  }
  //登录
  login = (newData) =>{
    console.log('login');
    console.log(newData);
    dispatch({
      type: 'user/query',
      payload:newData
   });
  }
  //点击按钮时候的表单验证
  onSubmit = (type) => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const newData = this.props.form.getFieldsValue()
        console.log('newData');
        console.log(newData);
        if(type == 'register'){
          this.register(newData);
        }else{
          this.login(newData);
        }
      } else {
        Toast.info('账号或密码格式错误...', 1.5);
      }
    });
  }
  //重置表单
  onReset = () => {
    this.props.form.resetFields();
  }
  //验证用户名
  validateUsername = (rule, value, callback) => {
    if (value && value.length >= LENGTH) {
      callback();
    } else {
      callback(new Error(`账号至少${LENGTH}个字符`));
    }
  }
  //验证密码
  validatePassword = (rule, value, callback) => {
    if (value && value.length >= LENGTH) {
      callback();
    } else {
      callback(new Error(`密码至少${LENGTH}个字符`));
    }
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
      <form>
      <List  renderFooter={() =>
         getFieldError('username') && getFieldError('username').join(',')
      || getFieldError('password') && getFieldError('password').join(',')
      || `\\("▔□▔)/✿\\(▔^▔")/`}>
        <InputItem
          {...getFieldProps('username', {
            rules: [
              { required: true, message: '请输入帐号' },
              { validator: this.validateUsername },
            ],
          })}
          clear
          error={!!getFieldError('username')}
          onErrorClick={() => {
            Toast.info(getFieldError('username').join('、'), 1.5);
          }}
          placeholder="请输入账号"
        >帐号</InputItem>
        <InputItem {...getFieldProps('password', {
          rules: [
            { required: true, message: '请输入密码' },
            { validator: this.validatePassword },
          ],
        })}
        clear
        error={!!getFieldError('password')}
        onErrorClick={() => {
          Toast.info(getFieldError('password').join('、'), 1.5);
        }} placeholder="请输入密码" type="password">
          密码
        </InputItem>
      </List>
      <Flex direction="column" key='demo2'>
        <Button className={styles.btnStyle} size="small" type="primary"
          onClick={()=>this.onSubmit('login')}>登   录</Button>
          <WhiteSpace/>
        <Button className={styles.btnStyle} size="small" type="ghost"
          onClick={()=>this.onSubmit('register')}>注   册</Button>
      </Flex>
    </form>
    </div>
    );
  }
}

//展示用户信息的组件
const UserComponent = () => {
  const onMaskClose = () => {
    console.log('onMaskClose');
  };
  //点击弹出弹出层
  const onClick = (e,type) => {
    console.log(e);
    console.log(type);
    e.preventDefault(); // 修复 Android 上点击穿透
    Popup.show(<PopupContent onClose={() => Popup.hide()} type={type}/>, { onMaskClose });
  };
  return (
    <div>
        <img className={styles.icon} src={icon}  onClick={()=>uploadIcon(dispatch)} />
        <div onClick={(e)=>onClick(e,'昵称')}>{nickname}</div>
    </div>
  );
};


//显示内容的组件
function Information({userData}) {
  console.log('userData');
  console.log(userData);
  nickname = userData.nickname;
  password = userData.password;
  username = userData.username;
  icon = userData.icon;
  dispatch = userData.dispatch;
  //退出登录
  function outLogin(){
    console.log('Login');
    dispatch({
      type: 'user/outLogin',
      payload:{}
   });
  }

  //决定展示的内容
  const ContentComponent = () => {
    if(userData.id!=null){
    return (
      <div>
        <UserComponent/>
        <WhiteSpace size='lg'/>
        {/* <Button size='small'  onClick={() =>{} }>修改密码</Button> */}
        <WhiteSpace size='lg'/>
        <WhiteSpace size='lg'/>
        <Button  size='small' type="warning" onClick={() => outLogin()}>退出登录</Button>
      </div>
    );
  }else{
    return (
      <div>
        <WhiteSpace size='lg'/>
        <WhiteSpace size='lg'/>
        <WhiteSpace size='lg'/>
        <Login_RegisterComponent/>
      </div>
    );
  }
  };

  return (
    <div className={styles.normal}>
      <WhiteSpace size='lg'/>
      <WhiteSpace size='lg'/>
      <ContentComponent/>
      <WhiteSpace size='lg'/>
    </div>
  );
}

const Login_RegisterComponent = createForm()(InputForm);

export default Information;
