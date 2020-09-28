$(function () {
    // 初始化富文本编辑器
    initEditor();

    // 启用裁切功能
    let options = {
        aspectRatio: 400 / 280, // 裁剪比例
        preview: '.img-preview', // 预览
    }
    $('#image').cropper(options);

    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status === 0) {
                let htmlStr = template('categoryList', res);
                $('#category').html(htmlStr);
                layui.form.render();
            }
        }
    })

    // 裁切图片预览功能
    $('.btn-upload').on('click', function (e) {
        e.preventDefault(); // 阻止默认行为
        $('#avatar').click();
    })

    // 图片本地预览功能
    $('#avatar').on('change', function () {
        let file = this.files[0];
        let imgUrl = URL.createObjectURL(file); // 生成图片的链接
        $('#image').cropper('destroy').attr('src', imgUrl).cropper(options); // 销毁旧的裁剪区域.重新设置图片的路径.重新初始化裁剪区域
    })
})