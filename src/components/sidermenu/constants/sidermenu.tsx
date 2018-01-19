export interface IProps{
    getSelectedMenuKeys ?: (path:string)=>any;
    getDefaultCollapsedSubMenus?:()=>void;
    handleOpenChange?:(openKeys: string[]) => void;
    getNavMenuItems?:(menudata:any)=>any;
    menuData?:any;
    onCollapse?:any;
    openKeys?: string[];
    location?:any;
    collapsed?:any;
    logo?:any;
    conversionPath?:any;
}