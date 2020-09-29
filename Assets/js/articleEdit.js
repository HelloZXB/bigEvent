$(function () {
    initEditor(); // 启用富文本编辑器
    let options = { // 裁切功能
        aspectRatio: 400 / 200, // 裁剪比例
        preview: '.img-preview' // 预览位置
    }
    $('#image').cropper(options);

    // 文章发布页面中的文章分类数据渲染
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status === 0) {
                let htmlStr = template('.categoryList', res);
                $('#category').html(htmlStr);
            }
        }
    })
})