$(function () {
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            console.log(res);
            if (res.status === 0) { // 使用模板渲染到页面
                let htmlStr = template('categoryList', res);
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
                    let htmlStr = template('articleList', res);
                    $('tbody').html(htmlStr);
                    renderPage(res);
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

    // 启用分页
    let laypage = layui.laypage;

    function renderPage(res) { // 执行一个laypage实例
        laypage.render({
            elem: 'test1', // 这里的test是id
            count: res.total, // 数据总数, 来自服务端
            limit: params.pagesize, // 每页显示的条数
            curr: params.pagenum, // 最新页码值
            limits: [2, 3, 5, 10],
            groups: 3,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                if (!first) {
                    params.pagenum = obj.curr; // 获取最新的页码值
                    params.pagesize = obj.limit; // 当前页显示的条数
                    renderList();
                }
            }
        })
    }

    // 删除文章
    $('tbody').on('click', '.btn-del', function () {
        let count = $('tbody .btn-del').length; // 获取当前页面的文章条数
        let id = $(this).data('id'); // 获取删除按钮的id
        layer.confirm('是否要删除此条数据?', {icon: 3, title: '提示'}, function (index) {
            $.ajax({
                type: 'get',
                url: `/my/article/delete/${id}`,
                success: function (res) {
                    if (res.status !== 0) {
                        layer.msg('删除文章失败');
                    } else { // 重新渲染列表
                        if (count === 1) {
                            params.pagenum = params.pagenum === 1 ? 1 : params.pagenum - 1;
                        }
                        renderList(); // 根据最新页码发送请求获取数据渲染页面
                    }
                }
            })
        })
    })
})