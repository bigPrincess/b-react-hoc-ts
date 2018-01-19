import * as React from 'react';
import { hoc } from '../containers/basiclayout';
import { IProps } from '../constants/basiclayout';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import classNames from 'classnames';
import { getMenuData } from '../../routers/menus';
import '../styles/basiclayout.scss';
import { LayoutWithHoc as LayoutComponent } from './layout';

const query = {
    'screen-xs': {
      maxWidth: 575,
    },
    'screen-sm': {
      minWidth: 576,
      maxWidth: 767,
    },
    'screen-md': {
      minWidth: 768,
      maxWidth: 991,
    },
    'screen-lg': {
      minWidth: 992,
      maxWidth: 1199,
    },
    'screen-xl': {
      minWidth: 1200,
    },
  };
export class BasicLayout extends React.Component<IProps, any> {
    //设置标题
    getPageTitle() {
        // const {  location } = this.props;
        const routerData = getMenuData();
        const { pathname } = location;
        let title = 'bigprincess';
        if (routerData[pathname] && routerData[pathname].name) {
          title = `${routerData[pathname].name} -bigprincess`;
        }
        return title;
    }
    render() {
        const {location} = this.props;
        return (
            <div className="ui-baselayouts">
            <DocumentTitle title={this.getPageTitle()}>
                <ContainerQuery query={query}>
                {params => 
                    <div className={classNames(params)}>
                        {<LayoutComponent  location={location}/>}
                    </div>}
                </ContainerQuery>
            </DocumentTitle>
            </div>
        );
    }
}

export const BasicLayoutWithHoc = hoc(BasicLayout);