$(function () {
    renderTable();

    function renderTable() {
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
    }

    // 弹出添加数据时的弹出层
    $('.layui-card-header .btn-add').on('click', function () {
        window.addIndex = layer.open({
            type: 1, // 去掉右下角的确定按钮
            title: '添加文章分类', // 添加弹出层的标题
            area: '520px', // 设置弹出层宽高
            content: $('#addCteTmp').html()
        })
    })

    // 数据校验
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

    // 添加文章分类
    $('body').on('submit', '.addForm', function (e) { // 事件委托
        e.preventDefault(); // 阻止默认行为
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(), // 表单序列化
            success: function (res) {
                if (res.status === 0) {
                    layer.close(window.addIndex); // 关闭弹出层
                    renderTable();
                }
            }
        })
    })

    // 删除文章分类
    $('tbody').on('click', '.btn-del', function () {
        let id = $(this).data('id'); // data()方法获取标签中的自定义属性存储的数据
        layer.confirm('确定删除此分类?', {icon: 3, title: '提示'}, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status === 0) {
                        layer.close(index);
                        renderTable(); // 删除成功之后重新渲染页面
                    }
                }
            })
        })
    })

    // 编辑文章分类数据回显
    $('tbody').on('click', '.btn-edit', function () {
        var categoryId = $(this).data('id')
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + categoryId,
            success: function (res) {
                console.log(res)
                if (res.status === 0) {
                    window.editIndex = layer.open({ // 弹出模态框
                        type: 1,
                        title: '更新文章分类',
                        content: $('#editCteTmp').html(),
                        area: '520px'
                    })
                    layui.form.val("myForm", res.data); // 将数据渲染到页面
                }
            }
        })
    })

    // 更新文章分类数据
    $('body').on('submit', '.editForm', function (e) {
        e.preventDefault(); // 阻止默认行为
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(), // 表单序列化
            success: function (res) {
                if (res.status === 0) {
                    layer.close(window.editIndex);
                    renderTable();
                }
            }
        })
    })
})