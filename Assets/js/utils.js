$.ajaxPrefilter(function (options) {
    // 在ajax之前请求的函数
    // options是个对象, 里面存储了所有的ajax函数中的参数内容
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    // 统一设置token
    if (options.url.includes('/my')) {
        options.headers = {
            Authorization: window.localStorage.getItem('token')
        }
    }

    // 统一开启权限验证
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败!') {
            localStorage.removeItem('token'); // 删除本地中无效的token
            location.href = 'login.html';
        }
    }
})