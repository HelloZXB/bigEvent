$(function () {
    // 1. 登录与注册结构的切换
    $('.login .myForm a').on('click', function () {
        $('.login').hide().next().show();
    })
    $('.registered .myForm a').on('click', function () {
        $('.login').hide().prev().show();
    })

    // 2. 表单验证
    let form = layui.form;
    form.verify({
        username: function (value, item) { //value: 表单的值、item: 表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
        },
        repass: function (value, item) { // value: 获取确认密码框中的值、确认密码框标签对象
            let passVal = $('.registered .myForm input[name = password]').val();
            if (passVal !== value) {
                $('.registered .myForm .pass,.registered .myForm .repass').val(''); // 清空value值
                return '两次输入的密码不一样';
            }
        },
        pass: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ]
    });
})