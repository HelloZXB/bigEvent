$(function () {
    let dataForm; // 获取当前用户信息渲染到页面
    renderForm();

    function renderForm() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status === 0) {
                    layui.form.val('myForm', res.data);
                    dataForm = res.data;
                }
            }
        })
    }

    // 提交或更新基本资料数据
    $('.myForm').on('submit', function (e) {
        e.preventDefault(); // 阻止默认行为
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(), // 表单序列化
            success: function (res) {
                layer.msg(res.message);
            }
        })
    })

    // 基本资料重置
    $('.myForm .reset').on('click', function (e) {
        e.preventDefault(); // 阻止默认行为
        layui.form.val('myForm', dataForm); // 重新显示原来的数据
    })
})