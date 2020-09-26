(function () {
    // 表单拖拽
    let login = document.querySelector('.login');
    let title = document.querySelector('.login .title');
    title.addEventListener('mousedown', function (e) {
        let x = e.pageX - login.offsetLeft;
        let y = e.pageY - login.offsetTop;
        document.addEventListener('mousemove', move);

        function move(e) {
            login.style.left = e.pageX - x + 'px';
            login.style.top = e.pageY - y + 'px';
        }

        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', move);
        })
    })
    document.onselectstart = function () {
        event.returnValue = false; // 禁止选中元素
    }
})();

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

    // 3. 注册功能
    $('.registered .myForm').on('submit', function (e) {
        e.preventDefault(); // 阻止表单的默认提交行为
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: $(this).serialize(), // 数据序列化
            success: function (res) {
                console.log(res);
                if (res.status === 0) {
                    $('.login').show().next().hide();
                } else {
                    layer.open({
                        title: '温馨提示',
                        content: res.message,
                        time: 2000
                    });
                }
            }
        })
    });

    // 4. 登录功能
    $('.logIn .myForm').on('submit', function (e) {
        e.preventDefault(); // 阻止默认提交行为
        $.ajax({ // 发送Ajax请求
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(), // 数据序列化
            success: function (res) {
                if (res.status === 0) {
                    window.localStorage.setItem('token', res.token);
                    location.href = 'index.html';
                } else {
                    layer.open({
                        title: '温馨提示',
                        content: res.message,
                        time: 2000
                    });
                }
            }
        })
    })
});