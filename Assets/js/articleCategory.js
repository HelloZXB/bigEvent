$(function () {
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success:function (res) {
            console.log(res);
        }
    })
})