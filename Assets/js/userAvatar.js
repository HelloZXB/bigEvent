$(function () {
    let $image = $('#image');
    let options = {
        aspectRatio: 1, // 设置纵横比
        preview: '.img-preview', // 指定预览区域
    }

    $image.cropper(options); // 创建裁剪区域

    $('.btn-upload').on('click', function () {
        $('#avatar').click(); // 弹出上传文件窗口
    })

    // 实现图片本地预览
    $('#avatar').on('change', function () {
        let file = this.files[0]; // 获取带上传的图片
        let imgUrl = URL.createObjectURL(file); // 生成图片链接
        $image.cropper('destroy').attr('src', imgUrl).cropper(options); // 销毁旧的裁剪区域, 重新设置图片路径, 重新初始化裁剪区域
    })

    // 上传头像
    $('.btn-sure').on('click', function () {
        let dataURL = $image.cropper('getCroppedCanvas',{ // 创建一个Canvas画布
            width: 100,
            height: 100
        }).toDataURL('image/png') // 将Canvas画布上的内容转换为base64格式化字符串
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status === 0){
                    window.parent.getUserInfo(); // get UserInfo()是父页面index中的函数
                }
            }
        })
    })
})