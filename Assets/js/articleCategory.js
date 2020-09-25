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
})