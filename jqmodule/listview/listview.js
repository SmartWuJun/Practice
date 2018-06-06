// (function($) {

var ListView = function(opt) {
    // console.log(this.attr);
    this.attr = $.extend({}, this.default, opt);

    this.o_wraper = $(this.attr.wraper);
    this.init();

    return this;
}

ListView.prototype = {
    constructor: ListView,
    default: {
        wraper: '',
        id: '',
        content: 'hello'
    },
    init: function() {
        this.renderDom();
        this.initEvent();
    },
    initEvent: function() {

        this.o_btn.on('click', '.btn', function() {
            $(this).html($(this).html() + 1);
        })
    },
    renderDom: function() {
        var str = '';
        str += '<tr><td class="btn">' + this.attr.content + '</td></tr>';
        this.o_btn = $(str).appendTo(this.o_wraper);
    },
    getContent: function() {
        console.log(this.attr.content);
    }
};

// })(jQuery)Z