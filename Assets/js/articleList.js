$(function () {
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            console.log(res);
            if (res.status === 0) { // 使用模板渲染到页面
                let htmlStr = template('.categoryList', res);
                $('#category').html(htmlStr);
                layui.form.render(); // layui下拉菜单
            }
        }
    })

    let params = {
        pagenum: 1,
        pagesize: 2,
        cate_id: $('#category').val(),
        state: $('#state').val()
    }

    renderList();

    function renderList() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: params,
            success: function (res) {
                if (res.status === 0) {
                    let htmlStr = template('.articleList', res);
                    $('tbody').html(htmlStr);
                }
            }
        })
    }

    // 实现筛选案例
    $('.myForm').on('submit', function (e) {
        e.preventDefault(); // 阻止默认行为
        params.cate_id = $('#category').val();
        params.state = $('#state').val();
        renderList(); // 用上面新的数据发发欧诺个ajax请求
    })
})