$(function () {

    var defaultAreaValue = "我来说两句......";

    //输入框；
    $("textarea").focus(function () {
        if ($(this).val() == defaultAreaValue) {
            $(this).val("");
            $(".text-num span").text(140);
        }
    });
    $("textarea").blur(function () {
        if ($(this).val() == 0) {
            $(this).val(defaultAreaValue);
            $(".text-num span").text(140);
        }
    });
    var max_len = 140;
    $("textarea").keydown(function () {
        var textarea = $("#text_val");
        var text = $("#text_val").val();
        var text_len = text.length;
        if (text_len >= max_len) {
            text = text.substr(0, max_len - 1);
            text_len = max_len;
        }
        textarea.val(text);
        $(".text-num span").text(140 - text_len);
    });
    //发布评论；
    $("#submit").on("click", function () {

        var obj = isLogin();
        if (!obj.login) {
            // showLogin();
            //alert(window.parent.document.getElementById('normal_login').innerHTML);
            $('.tag i', parent.document).html('登录新英');
            $('.login_el,#bg_div', parent.document).show();
            $('#normal_login', parent.document).show();
            return;
        }

        var userId = $.cookie('userId');

        var text_val = $("textarea").val();
        var val_len = text_val.length;
        if (val_len > 0 && (text_val != defaultAreaValue)) {
            var new_text = text_val;
            var reqData = {
                content: new_text,
                articleId: 11,
                userId: userId
            };

            $.ajax({
                type: 'POST',
                url: '/nodejs/comment/save',
                data: reqData,
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        var tip = $('#ban_info');
                        if (data.code == 200) {
                            //楼层数；
                            var floor_num = parseInt($(".comment-list ul li").first().find(".floor span").html()) + 1;
                            var html = '<li class="commemt-list-box">';
                            html += '<div class="user">' + data.data.nick + '</div>';
                            html += '<div class="time">刚刚</div>';
                            html += '<div class="clear">&nbsp;</div>';
                            html += '<div class="text">' + data.data.content + '</div>';
                            html += '</li>';
                            $(".comment-list ul").prepend(html);
                            $("#text_val").text("");
                            //config the total
                            var commentTotalCount=$("#comment_total_count");
                            var totalText = commentTotalCount.text();
                            var total=Number(totalText);
                            if(!isNaN(total)){
                                commentTotalCount.text(total+1);
                            }
                            tip.text('发表成功！');
                            tip.show();
                        } else if (data.code == 10100) {
                            //too frequent
                            tip.text('刚刚评论过，休息一下再来吧');
                            tip.show();
                        } else if (data.code == 10000) {
                            //baninfo
                            tip.text('您已被禁言，详情可咨询客服');
                            tip.show();
                        } else {
                            tip.text('发表失败，请稍后再试试');
                            tip.show();
                        }
                    } else {
                        tip.text('发表失败，请稍后再试试');
                        tip.show();
                    }
                    setTimeout(function () {
                        $('#ban_info').hide();
                    }, 3000);
                },
                error: function (a) {
                    //
                }
            });
        }
    });
    //删除评论；
    $(".delete").on("click", function () {
        $(this).parent().remove();
    });

    function isLogin(){
        var obj = new Object();
        var userId = $.cookie('userId');
        if(userId != 'undefined' && (userId != '' && userId != null)){
            obj.login = true;
            obj.userName = decodeURI($.cookie('userName'));;
            return obj;
        }
        obj.login = false;
        return obj;
    }

    //分页
    function paging(pageNum, pageSize, total, between) {

        var url = "";

        var span = between + 1;
        var maxPageNum = Math.ceil(total / pageSize);
        if (pageNum < 1) {
            pageNum = 1;
        }
        if (pageNum > maxPageNum) {
            pageNum = maxPageNum;
        }
        var html = '';

        if (pageNum == 1) {
            html += '<a href="" class="prevPage disabled"><上一页</a>';
        } else {
            url = "/nodejs/page/comment/" + articleId + "/" + (pageNum - 1);
            html += '<a href="' + url + '" class="prevPage"><上一页</a>';
        }
        html += '<ul>';

        //全部显示
        if (maxPageNum <= 7) {
            for (var from = 1; from <= maxPageNum; from++) {
                url = "/nodejs/page/comment/" + articleId + "/" + from;
                if (pageNum == from) {
                    html += '<li><span class="on">' + from + '</span></li>';
                } else {
                    html += '<li><a href="' + url + '">' + from + '</a></li>';
                }
            }
            html += '</ul>';
            if (pageNum == maxPageNum) {
                html += '<a href="" class="nextPage disabled">下一页></a>';
            } else {
                url = "/nodejs/page/comment/" + articleId + "/" + (pageNum + 1);
                html += '<a href="' + url + '" class="nextPage">下一页></a>';
            }
            return html;
        }

        //特殊处理，如果页数小于等于3
        if (pageNum <= 4) {
            var end = 1 + 3;
            if (end > maxPageNum) {
                end = maxPageNum;
            }
            //开头5页
            for (var from = 1; from <= end; from++) {
                url = "/nodejs/page/comment/" + articleId + "/" + from;
                if (pageNum == from) {
                    html += '<li><span class="on">' + from + '</span></li>';
                } else {
                    html += '<li><a href="' + url + '">' + from + '</a></li>';
                }

            }

            if (end < maxPageNum) {
                url = "/nodejs/page/comment/" + articleId + "/" + 5;
                html += '<li><a href="' + url + '">' + from + '</a></li>';
                //。。。。。
                html += '<li><a href="" class="disabled">...</a></li>';
                //最后一页
                url = "/nodejs/page/comment/" + articleId + "/" + maxPageNum;
                html += '<li><a href="' + url + '">' + maxPageNum + '</a></li>';
            }
            html += '</ul>';
            if (pageNum == maxPageNum) {
                html += '<a href="" class="nextPage disabled">下一页></a>';
            } else {
                url = "/nodejs/page/comment/" + articleId + "/" + (pageNum + 1);
                html += '<a href="' + url + '" class="nextPage">下一页></a>';
            }
            return html;
        }

        if (pageNum >= maxPageNum - 3) {

            //第一页
            url = "/nodejs/page/comment/" + articleId + "/" + 1;
            html += '<li><a href="' + url + '">' + 1 + '</a></li>';
            //。。。。。
            html += '<li><a href="" class="disabled">...</a></li>';
            //最后的5页
            var start = maxPageNum - 3;
            if (start < 1) {
                start = 1;
            }
            url = "/nodejs/page/comment/" + articleId + "/" + (start - 1);
            html += '<li><a href="' + url + '">' + (start - 1) + '</a></li>';
            for (var from = start; from <= maxPageNum; from++) {
                url = "/nodejs/page/comment/" + articleId + "/" + from;
                if (pageNum == from) {
                    html += '<li><span class="on">' + from + '</span></li>';
                } else {
                    html += '<li><a href="' + url + '">' + from + '</a></li>';
                }

            }

            html += '</ul>';
            if (pageNum == maxPageNum) {
                html += '<a href="" class="nextPage disabled">下一页></a>';
            } else {
                url = "/nodejs/page/comment/" + articleId + "/" + (pageNum + 1);
                html += '<a href="' + url + '" class="nextPage">下一页></a>';
            }

            return html;
        }

        //the num before pagenum
        if (pageNum - span <= 1) {
            //无...
            for (var from = 1; from < pageNum; from++) {
                url = "/nodejs/page/comment/" + articleId + "/" + from;
                html += '<li><a href="' + url + '">' + from + '</a></li>';
            }
        } else {
            //需要。。。
            url = "/nodejs/page/comment/" + articleId + "/1";
            html += '<li><a href="' + url + '">1</a></li>';
            html += '<li><a href="" class="disabled">...</a></li>';
            for (var from = pageNum - between; from < pageNum; from++) {
                url = "/nodejs/page/comment/" + articleId + "/" + from;
                html += '<li><a href="' + url + '">' + from + '</a></li>';
            }
        }

        //now the pageNum
        html += '<li><span class="on">' + pageNum + '</span></li>';

        //the page after pagenum
        if (maxPageNum - span <= pageNum) {
            //无...
            for (var from = pageNum + 1; from <= maxPageNum; from++) {
                url = "/nodejs/page/comment/" + articleId + "/" + from;
                html += '<li><a href="' + url + '">' + from + '</a></li>';
            }
        } else {
            //需要。。。
            for (var from = pageNum + 1; from <= pageNum + between; from++) {
                url = "/nodejs/page/comment/" + articleId + "/" + from;
                html += '<li><a href="' + url + '">' + from + '</a></li>';
            }
            html += '<li><a href="" class="disabled">...</a></li>';
            url = "/nodejs/page/comment/" + articleId + "/" + maxPageNum;
            html += '<li><a href="' + url + '">' + maxPageNum + '</a></li>';
        }

        html += '</ul>';
        if (pageNum == maxPageNum) {
            html += '<a href="" class="nextPage disabled">下一页></a>';
        } else {
            url = "/nodejs/page/comment/" + articleId + "/" + (pageNum + 1);
            html += '<a href="' + url + '" class="nextPage">下一页></a>';
        }
        return html;
    }

    var html = paging(pageNum, pageSize, total, 1);

    var toInsert = $('.tcdPageCode');
    toInsert.append(html);
});
