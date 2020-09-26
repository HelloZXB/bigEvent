$(function () {
    let form = layui.form;
    form.verify({
        repass: function (value, item) { // value: 获取确认密码框中的值 item: 确认密码标签对象
            let passVal = $('.myForm input[name = newPwd]').val();
            if (passVal !== value) { // 判断两次密码是否一样
                $('.myForm .pass,.myForm .repass').val('');
                return '两次输入的密码有误';
            }
        },
        pass: [/^[\d]{6,12}$/, '密码必须6到2位, 且不能出现空格'] // 正则校验
    })

    $('.myForm').on('submit', function (e) {
        e.preventDefault(); // 阻止默认行为
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(), // 表单序列化
            success: function (res) {
                layer.msg(res.message); // 成功之后进行提示
                $('.myForm')[0].reset(); // 清空表单
            }
        })
    })
})