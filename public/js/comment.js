$(function(){

    //输入框；
    $("textarea").focus(function(){
    	if($(this).val() == "我来说两句......"){
    		$(this).val("");
    		$(".text-num span").text(140);
    	}
    });
    $("textarea").blur(function(){
    	if($(this).val() == 0){
    		$(this).val("我来说两句......");
    		$(".text-num span").text(140);
    	}
    });
    $("textarea").keydown(function(){
    	var text_val = document.getElementById("text_val").value.length;
		$(".text-num span").text(140-text_val);
	});
	//发布评论；
	$("#submit").on("click",function(){
		var text_val = document.getElementById("text_val").value.length;
		if(text_val > 0){
			var new_text = document.getElementById("text_val").value;
			console.log(new_text);
//			$(".comment-list ul").prepend('<li class="commemt-list-box">'+new_text+'</li>');
//			var html = ''
			var reqData={content:new_text,
				articleId:11,
				userId:11
						};

			$.ajax({
				type: 'POST',
				url: '/comment/save' ,
				data: reqData ,
				dataType: 'json',
				success: function(data){
					if(data && data.code==200){
						//楼层数；
						var floor_num = parseInt($(".comment-list ul li").first().find(".floor span").html())+1;
						var html = '<li class="commemt-list-box">';
						html += '<div class="user">data.uid_comment</div>';
						html += '<div class="time">data.create_time</div>';
						html += '<div class="clear">&nbsp;</div>';
						html += '<div class="text">'+data.content+'</div>';
						html += '</li>';
						$(".comment-list ul").prepend(html);
					}else{
						$("#ban_info").display();
					}

				},
				error:function(a){

				}
			});

		}
	});
	//删除评论；
	$(".delete").on("click",function(){
		$(this).parent().remove();
	})
})
