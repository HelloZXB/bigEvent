$(function () {
    getUserInfo();

    function getUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            headers: {
                Authorization: window.localStorage.getItem('token') // 生成token
            },
            success: function (res) {
                if (res.status === 0) {
                    $('.userInfo .welcome').html(`欢迎&nbsp;&nbsp;${res.data.username}`); // 替换欢迎语
                    if (res.data.user_pic) {
                        $('.userInfo .layui-nav-img').show().attr('src', res.data.user_pic); // 显示头像
                        $('.layui-header .layui-nav-img').show().attr('src', res.data.user_pic); // 显示顶部头像
                        $('.userInfo .text-avatar,.layui-header .text-avatar').hide(); // 头像字母隐藏
                    } else {
                        $('.userInfo .text-avatar').text(res.data.username.slice(0, 1).toUpperCase()); // 第一次登录user_pic是null
                        $('.layui-header .text-avatar').text(res.data.username.slice(0, 1).toUpperCase()); // 顶部右侧字母头像显示
                    }
                }
            }
        })
    }

    window.getUserInfo = getUserInfo; // 向外暴露
    $('.layui-header .logout').on('click', function () {
        layer.confirm('温馨提示', {icon: 3, title: '提示'}, function (index) {
            window.localStorage.removeItem('token'); // 删除本地存储中的token
            layer.close(index); // 关闭弹出层
            location.href = './login.html';
        })
    })
})