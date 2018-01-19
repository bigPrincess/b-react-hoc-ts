import * as React from 'react';
import { hoc } from '../containers/basiclayout';
import { IProps } from '../constants/basiclayout';
import { getMenuData } from '../../routers/menus';
import { Layout, Icon } from 'antd';
import { SiderMenuHoc as SiderMenu} from '../../components/sidermenu/compontents/sidermenu';
// import SiderMenu from '../components/SiderMenu';
// import logo from '../../../assets/logo.svg';

const { Content } = Layout;
export class LayoutComponent extends React.Component<IProps, any> {
       
    render() {
        const {location} = this.props;
        return (
            <Layout>
                <SiderMenu
                    // logo={logo}
                    // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
                    // If you do not have the Authorized parameter
                    // you will be forced to jump to the 403 interface without permission
                    // Authorized={Authorized}
                    // menuData={getMenuData()}
                    // collapsed={collapsed}
                    location={location}
                    // isMobile={this.state.isMobile}
                    // onCollapse={this.handleMenuCollapse}
                />
                <Layout>
                    <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                    lalal
                    </Content>
            </Layout>
        </Layout>
        );
    }
}

export const LayoutWithHoc = hoc(LayoutComponent);