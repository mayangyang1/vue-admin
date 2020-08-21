import { hostUrl } from '../config/config.js';

const serviceUrl = {
    orgInfo : hostUrl  + '/org/org/self', //组织信息
    publicKey: hostUrl + '/account/account/public/key',//获取公钥
    login: hostUrl + '/account/login', //账号登录
    webappInfo: hostUrl + '/platform/platform/core/config/webapp',//获取权限配置
    otheInfo: hostUrl + '/platform/platform/core/config/other',//获取权限配置
    logisticsList: hostUrl + '/logistics/logistics/list?page=1&size=10',//订单列表
    logOut: hostUrl + '/account/logout',//退出登录
    menuList: hostUrl + '/permission/permission/user/resource/list/self',//菜单列表
}

export default serviceUrl;


