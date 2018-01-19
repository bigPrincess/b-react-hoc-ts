import * as React from 'react';
import { hoc } from '../containers/home';
import { IProps } from '../constants/home';
import { BasicLayout } from '../../../layouts/componts/basiclayout';
import '../styles/home.scss';

export class HomeComponent extends React.Component<IProps, any> {
    render() {
        return (
            <div className="">
               <BasicLayout {...this.props}/>
            </div>
        );
    }
}

export const HomeComponentWithHoc = hoc(HomeComponent);