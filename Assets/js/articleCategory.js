$(function () {
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status === 0) {
                let htmlStr = template('.categoryList', res);
                $('body').html(htmlStr);
            }
        }
    })
})