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
    verifyCode: hostUrl + '/account/account/reset_password/send/verify_code', //获取手机验证码
    checkValiCode: hostUrl + '/account/account/reset_password/verify_code',//校验忘记密码验证码
    checkRegisterCode: hostUrl + '/account/account/verify_code',//校验注册验证码
    registerVerifyCode: hostUrl + '/account/account/send/verify_code',//获取注册验证码
    addUser: hostUrl + '/account/account/add',//注册用户
    registerOrg: hostUrl + '/account/org/register',//注册公司
    validateCompany: hostUrl + '/account/org/validate_unique',//校验公司名称
    getSelfInfo: hostUrl + '/person/person/self/info',//获取人员信息
    resetPassword: hostUrl + '/account/account/reset_password', //重置密码
    freightList: hostUrl + '/freight/freight/list', //货源列表
    
}

export default serviceUrl;


