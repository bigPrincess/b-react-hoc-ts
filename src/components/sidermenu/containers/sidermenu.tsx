import { compose, withHandlers, lifecycle, withState } from "recompose";
import { IProps } from '../constants/sidermenu';
import pathToRegexp from 'path-to-regexp'; //匹配路由路径

export const hoc = compose<IProps, any>(
    withState("openKeys","setOpenKeys",null),
    withHandlers({
        getSelectedMenuKeys:(props:IProps)=>{
            return (path) => {
                const flatMenuKeys = this.getFlatMenuKeys(this.menus);
                return flatMenuKeys.filter((item) => {
                return pathToRegexp(`/${item}`).test(path);
                });
            }
        },
        handleOpenChange:(props:IProps)=>{
            return (openKeys) => {
                const lastOpenKey = openKeys[openKeys.length - 1];
                const isMainMenu = this.menus.some(
                  item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
                );
                this.props.setOpenKeys(isMainMenu ? [lastOpenKey] : [...openKeys]);
        }},
        getDefaultCollapsedSubMenus:(props:IProps)=> {
            return ()=>{
                const { location: { pathname } } = props || this.props;
                let snippets = pathname.split('/');
                snippets.pop();
                snippets.shift();
                snippets = snippets.map((item, index) => {
                    if (index > 0) {
                        return snippets.slice(0, index + 1).join('/');
                    }
                    return item;
                });
                snippets = snippets.map((item) => {
                    return this.getSelectedMenuKeys(`/${item}`)[0];
                });
                return snippets;
            }
        },
        // conversion Path
        // 转化路径
        conversionPath:(prosp:IProps)=>{
            return (path) => {
            if (path && path.indexOf('http') === 0) {
            return path;
            } else {
            return `/${path || ''}`.replace(/\/+/g, '/');
            }
        }
    }
    }),
    lifecycle({
        componentDidMount:function(){
            this.props.getDefaultCollapsedSubMenus();
        },
        componentWillReceiveProps:function(nextProps){
            if (nextProps.location.pathname !== this.props.location.pathname) {
                this.setState({
                  openKeys: this.props.getDefaultCollapsedSubMenus(nextProps),
                });
              }
        }
    })
);