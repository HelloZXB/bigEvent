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
                layui.form.render(); // 重新调用方法进行渲染
                getArticleDataById(); // 调用函数进行数据回显
            }
        }
    })

    // 根据id获取待编辑的文章数据
    let id = location.search.slice(4);

    function getArticleDataById() {
        $.ajax({
            type: 'get',
            url: '/my/article/' + id,
            success: function (res) {
                if (res.status === 0) {
                    layui.form.val('myForm', {
                        Id: res.data.Id,
                        title: res.data.title,
                        cate_id: res.data.cate_id
                    })
                    tinyMCE.activeEditor.setContent(res.data.content);
                    // 销毁旧的裁剪区域.重新设置图片的路径.重新初始化裁剪区域
                    $('#image').cropper('destroy').attr('src', 'http://ajax.frontend.itheima.net' + res.data.cover_img).cropper(options);
                }
            }
        })
    }
})