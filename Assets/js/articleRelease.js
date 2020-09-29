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

    // 文章发布
    $('.myForm').on('click', '.btn', function (e) {
        e.preventDefault(); // 阻止默认行为
        let data = new FormData($('.myForm')[0]); // 准备数据
        if ($(e.target).hasClass('btn-release')) { // 确定发布 ? 存为草稿
            data.append('state', '已发布'); // 发布
        } else {
            data.append('state', '草稿'); // 草稿
        }
        $('#image').cropper('getCroppedCanvas', { // 裁剪图片的二进制形式
            width: 400, height: 280
        }).toBlob(function (blod) {
            data.append('cover_img', blod); // blod中存储了裁剪图片的二进制形式
            data.append('content', tinyMCE.activeEditor.getContent());
            $.ajax({
                type: 'post',
                url: '/my/article/add',
                data: data,
                contentType: false, // 不需要设置请示头
                processData: false, // 内部不在需要转换成字符串
                success: function (res) {
                    if (res.status === 0) {
                        location.href = 'articleList.html'
                    }
                }
            })
        })
    })
})