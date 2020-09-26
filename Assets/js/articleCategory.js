$(function () {
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status === 0) {
                let htmlStr = template('categoryList', res)
                $('tbody').html(htmlStr);
            }
        }
    })
    $('.layui-card-header .btn-add').on('click', function () {
        window.addIndex = layer.open({
            type: 1, // 去掉右下角的确定按钮
            title: '添加文章分类', // 添加弹出层的标题
            area: '520px', // 设置弹出层宽高
            content: $('#addCteTmp').html()
        })
    })
    let form = layui.form;
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }
    })
})