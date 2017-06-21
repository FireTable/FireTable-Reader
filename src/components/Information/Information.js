import React from 'react';
import styles from './Information.css';
import { Popup,List, Button, InputItem,WingBlank,WhiteSpace,Flex,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import uploadIcon from './UploadIcon';

let username;
let password;

const Item = List.Item;

class PopupContent extends React.Component {
  //构造器
  constructor(props) {
    super(props);
    console.log('constructor');
    console.log(props);
  }

  render() {
    return (
      <div style={{textAlign:'center'}}>
        <WingBlank>
        <List renderHeader={() => `修改${this.props.type}`}>
            <InputItem  clear placeholder='必填'
              onChange={value => {}}>
              新{this.props.type}
            </InputItem>
        </List>
          <WhiteSpace size='md'/>
          <Button  size="small" type="primary"
            onClick={() => {
              console.log('ok');
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
  //构造器
  constructor(props) {
    super(props);
    console.log('constructor');
    console.log(props);
  }
  state = {
    value: 1,
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
      } else {
        Toast.info('账号或密码格式错误...', 1.5);
      }
    });
  }
  onReset = () => {
    this.props.form.resetFields();
  }
  validateUsername = (rule, value, callback) => {
    if (value && value.length > 5) {
      callback();
    } else {
      callback(new Error('帐号至少6个字符'));
    }
  }
  validatePassword = (rule, value, callback) => {
    if (value && value.length > 5) {
      callback();
    } else {
      callback(new Error('密码至少6个字符'));
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
          onClick={()=>this.onSubmit()}>登   录</Button>
          <WhiteSpace/>
        <Button className={styles.btnStyle} size="small" type="ghost"
          onClick={()=>console.log('register')}>注   册</Button>
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
        <img className={styles.icon} src="http://i2.muimg.com/1949/e1bd2462b1e4391a.jpg" alt="头像" onClick={uploadIcon} />
        <div onClick={(e)=>onClick(e,'昵称')}>Todos</div>
    </div>
  );
};


//显示内容的组件
function Information({userData}) {
  console.log('userData');
  console.log(userData);

  //决定展示的内容
  const ContentComponent = () => {
    if(userData.id!=null){
    return (
      <div>
        <UserComponent/>
        <WhiteSpace size='lg'/>
        <Button size='small'  onClick={() =>{} }>修改密码</Button>
        <WhiteSpace size='lg'/>
        <Button size='small' type="warning" onClick={() => outLogin()}>退出登录</Button>
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
