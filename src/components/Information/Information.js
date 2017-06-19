import React from 'react';
import styles from './Information.css';
import { Popup, List, Button, InputItem,WingBlank,WhiteSpace,Tag } from 'antd-mobile';

import uploadIcon from './UploadIcon';

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

const ContentComponent = () => {
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
        <WhiteSpace size='lg'/>
        <WhiteSpace size='lg'/>
        <img className={styles.icon} src="http://i2.muimg.com/1949/e1bd2462b1e4391a.jpg" alt="头像" onClick={uploadIcon} />
        <div onClick={(e)=>onClick(e,'昵称')}>Todos</div>
        <WhiteSpace size='lg'/>
    </div>
  );
};


function Information() {
  return (
    <div className={styles.normal}>
      <ContentComponent/>
      <WhiteSpace size='lg'/>
      <Button size='small'  onClick={() =>{} }>修改密码</Button>
      <WhiteSpace size='md'/>
      <Button size='small' type="warning" onClick={() => outLogin()}>退出登录</Button>
    </div>
  );
}

export default Information;
