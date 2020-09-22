$.ajaxPrefilter(function (options) {
    // 在ajax之前请求的函数
    // options是个对象, 里面存储了所有的ajax函数中的参数内容
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})