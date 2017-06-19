import React from 'react';
import styles from './MainLayout.css';
import {TabBar,Icon,WhiteSpace,InputItem,WingBlank,Toast} from 'antd-mobile';

let nowTabContent;

class MainLayout extends React.Component {
  //构造器
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selectedTab: 'leftTab',
      hidden: false,
      title:'书架',
      display:'',
    };
  }

    // state ={
    //     averageListData:this.props.averageListData,
    //   }

  //决定展示的内容
  decideContent(){
    //内容展示初始化
    const leftTabContent = React.Children.only(this.props.children[0]);
    const rightTabContent = React.Children.only(this.props.children[1]);
    switch(this.state.selectedTab){
      case 'leftTab':
        nowTabContent = leftTabContent;
        break;
      case 'rightTab':
        nowTabContent = rightTabContent;
        break;
    }
  }

  renderContent(pageText) {
    //决定展示内容
    this.decideContent();
    return (
        <div>
          {nowTabContent}
        </div>
    );
  }

  renderIcon(url) {
    return (
      <div style={{
        width: '0.6rem',
        height: '0.6rem',
        background: `url(${url}) center center /  0.58rem 0.58rem no-repeat` }}
      />
    );
  }

  render() {
    return (
      <div className={styles.normal}>
      {this.renderContent()}
      <WhiteSpace size='lg'/>
      <WhiteSpace size='lg'/>
      <WhiteSpace size='lg'/>
      <WhiteSpace size='lg'/>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
      >
      <TabBar.Item
          title="书架"
          key="书架"
          icon={this.renderIcon('https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg')}
          selectedIcon={this.renderIcon('https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg')}
          // 判断如果是该tab返回ture
          selected={this.state.selectedTab === 'leftTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'leftTab',
              title:'书架',
              display:'',
            });
          }}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={this.renderIcon('https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg')}
          selectedIcon={this.renderIcon('https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg')}
          title="我"
          key="我"
          selected={this.state.selectedTab === 'rightTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'rightTab',
              title:'我',
              display:'none',
            });
          }}
        >
        </TabBar.Item>
      </TabBar>
    </div>
    );
  }
}

export default MainLayout;
