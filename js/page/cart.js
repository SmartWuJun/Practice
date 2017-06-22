$(function() {

    var Index = {};

    Index.init = function() {
        var self = this;
        self.initEvent();
        self.counter('.J_counter');
    };

    Index.initEvent = function() {
        var self = this;
        console.log(2);

        //点击页面其他地方 修改隐藏
        $(document).on('click', function(e) {

            self.hideEdit();
        });
        //防止点击span 触发 hideEdit
        $(document).on('click', '.J_edit span', function(e) {
            e.stopPropagation();
        });
        //获取修改数据
        $(document).on('blur', '.J_edit span', function() {
            console.log($(this).text());
        });
        //点击修改
        $(document).on('click', '.J_edit em', function(e) {
            self.hideEdit();
            e.stopPropagation();
            var cur = $(this).parents('.J_edit');
            $(this).addClass('none');
            cur.find('span').attr('contenteditable', true).focus();
        });


        //删除
        $(document).on('click', '.J_delete', function() {
            var id = $(this).attr('data-id');
            console.log(id);
        });

    };

    Index.hideEdit = function(e) {

        $('.J_edit span').attr('contenteditable', false);
        $('.J_edit em').removeClass('none');
    };

    Index.counter = function(obj) {
        var container = $(obj);
        //加的效果
        container.find('.add').click(function() {
            var n = $(this).prev().val();
            var num = parseInt(n) + 1;
            if (num < 0) {
                $(this).prev().val(0);
                return;
            }
            $(this).prev().val(num);
        });


        //减的效果
        container.find('.jian').click(function() {
            var n = $(this).next().val();
            var num = parseInt(n) - 1;
            if (num < 0) {
                $(this).next().val(0);
                return
            }
            $(this).next().val(num);
        });

    }



    Index.init();
});