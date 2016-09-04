$(function(){
		
	var arr_week=new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
	var nowDate = new Date();
	var this_year = nowDate.getFullYear();//获取当前年份
	var this_month = nowDate.getMonth() + 1;//获取当前月份
	var this_data = nowDate.getDate();//获取当前几号			 
	var this_first = new Date(this_year,this_month-1,1); //获取本月第一天
	var next_first = new Date(this_year,this_month,1); //获取下月中的第一天
	var next_year = next_first.getFullYear();//获取当前下月年份
	var next_month = next_first.getMonth() + 1;//获取下月月份
	var manx_first = new Date(this_year,this_month+1,1); //获取下下月中的第一天
	var this_last=new Date(next_first.getTime()-1000*60*60*24);//获取本月最后一天
	var next_last=new Date(manx_first.getTime()-1000*60*60*24);//获取下月最后一天
	var this_first_week = this_first.getDay();//当月第一天是星期几
	var next_first_week = next_first.getDay();//下月第一天是星期几
	var this_last_data = this_last.getDate();//获取本月最后一天几号
	var next_last_data = next_last.getDate();//获取下月最后一天几号
	var manx_year = manx_first.getFullYear();//获取下下月年份
	var manx_month = manx_first.getMonth() + 1;//获取下下月月份
	var manx_first_week = manx_first.getDay();//下下月第一天是星期几	
	var manx_next_first = new Date(this_year,this_month+2,1); //获取下下月中的第一天
	var manx_next_year = manx_next_first.getFullYear();//获取当前下下月年份
	var manx_next_month = manx_next_first.getMonth() + 1;//获取下下月月份	

	
	//三个月以后的信息

	//存储系统当前时间	
	var today_y=this_year;
	var today_m=this_month;	
	var today_d=this_data;
	var today_all;
	var manx_next_all;
	function compare_basic(compare_y,compare_m,compare_d){
		if(compare_m<10){
			if(compare_d<10){
				compare_all=compare_y+'-0'+compare_m+'-0'+compare_d;
			}else{
				compare_all=compare_y+'-0'+compare_m+'-'+compare_d;
			}
		}else{
			if(compare_d<10){
				compare_all=compare_y+'-'+compare_m+'-0'+compare_d;
			}else{
				compare_all=compare_y+'-'+compare_m+'-'+compare_d;
			}			
		}
		return compare_all;
	}
	today_all=compare_basic(this_year,this_month,this_data);
	manx_next_all=compare_basic(manx_next_year,manx_next_month,this_data);

	function change_year(year_num)//变年份
	{
		this_year = this_year + year_num;		 
		var this_first = new Date(this_year,this_month-1,1); //获取本月第一天
		var next_first = new Date(this_year,this_month,1); //获取下月中的第一天
		var next_year = next_first.getFullYear();//获取当前下月年份
		var next_month = next_first.getMonth() + 1;//获取下月月份
		var manx_first = new Date(this_year,this_month+1,1); //获取下下月中的第一天
		var this_last=new Date(next_first.getTime()-1000*60*60*24);//获取本月最后一天
		var next_last=new Date(manx_first.getTime()-1000*60*60*24);//获取下月最后一天
		var this_first_week = this_first.getDay();//当月第一天是星期几
		var next_first_week = next_first.getDay();//下月第一天是星期几
		var this_last_data = this_last.getDate();//获取本月最后一天几号
		var next_last_data = next_last.getDate();//获取下月最后一天几
		var manx_year = manx_first.getFullYear();//获取下下月年份
		var manx_month = manx_first.getMonth() + 1;//获取下下月月份
		var manx_first_week = manx_first.getDay();//下下月第一天是星期几				
		create_data(this_year,this_month,this_first_week,this_last_data,next_year,next_month,next_first_week,next_last_data,manx_year,manx_month,manx_first_week);
	}		
	
	function change_month(month_num)//变月份
	{
		this_month = this_month + month_num;
		if(this_month < 1)
		{
			this_month = 12;
			change_year(-1);
		}
		else if(this_month > 12)
		{
			this_month = 1;
			change_year(1);
		}		 
		var this_first = new Date(this_year,this_month-1,1); //获取本月第一天
		var next_first = new Date(this_year,this_month,1); //获取下月中的第一天
		var next_year = next_first.getFullYear();//获取当前下月年份
		var next_month = next_first.getMonth() + 1;//获取下月月份
		var manx_first = new Date(this_year,this_month+1,1); //获取下下月中的第一天
		var this_last=new Date(next_first.getTime()-1000*60*60*24);//获取本月最后一天
		var next_last=new Date(manx_first.getTime()-1000*60*60*24);//获取下月最后一天
		var this_first_week = this_first.getDay();//当月第一天是星期几
		var next_first_week = next_first.getDay();//下月第一天是星期几
		var this_last_data = this_last.getDate();//获取本月最后一天几号
		var next_last_data = next_last.getDate();//获取下月最后一天几
		var manx_year = manx_first.getFullYear();//获取下下月年份
		var manx_month = manx_first.getMonth() + 1;//获取下下月月份
		var manx_first_week = manx_first.getDay();//下下月第一天是星期几								
		create_data(this_year,this_month,this_first_week,this_last_data,next_year,next_month,next_first_week,next_last_data,manx_year,manx_month,manx_first_week);
	}			
	
	function create_data(this_year,this_month,this_first_week,this_last_data,next_year,next_month,next_first_week,next_last_data,manx_year,manx_month,manx_first_week){
		//日期列表赋值
		var left_data = '';
		for(i=1;i<=this_last_data;i++){//生成左边日历		
			if(i<10){
                if (this_month < 10) {
                    left_data = left_data + '<a trq="'+this_year+'-0'+this_month+'-0'+i+'" txq="'+arr_week[(this_first_week+(i-1))%7]+'">'+i+'</a>';	
                }
                else {
                    left_data = left_data + '<a trq="'+this_year+'-'+this_month+'-0'+i+'" txq="'+arr_week[(this_first_week+(i-1))%7]+'">'+i+'</a>';	
                }					
			}else if(i==this_last_data){
                if (this_month < 10) {
					if (next_month < 10) {
						left_data = left_data + '<a class="dd_alast" trq="'+this_year+'-0'+this_month+'-'+this_last_data+'" txq="'+arr_week[(this_first_week+(i-1))%7]+'" trql="'+next_year+'-0'+next_month+'-0'+1+'" txql="'+arr_week[next_first_week]+'">'+this_last_data+'</a>';
					}
					else {
						left_data = left_data + '<a class="dd_alast" trq="'+this_year+'-0'+this_month+'-'+this_last_data+'" txq="'+arr_week[(this_first_week+(i-1))%7]+'" trql="'+next_year+'-'+next_month+'-0'+1+'" txql="'+arr_week[next_first_week]+'">'+this_last_data+'</a>';
					}						                    
                }
                else{
					if (next_month < 10) {
						left_data = left_data + '<a class="dd_alast" trq="'+this_year+'-'+this_month+'-'+this_last_data+'" txq="'+arr_week[(this_first_week+(i-1))%7]+'" trql="'+next_year+'-0'+next_month+'-0'+1+'" txql="'+arr_week[next_first_week]+'">'+this_last_data+'</a>';
					}
					else {
						left_data = left_data + '<a class="dd_alast" trq="'+this_year+'-'+this_month+'-'+this_last_data+'" txq="'+arr_week[(this_first_week+(i-1))%7]+'" trql="'+next_year+'-'+next_month+'-0'+1+'" txql="'+arr_week[next_first_week]+'">'+this_last_data+'</a>';
					}		
                } 					               	
			}else{
                if (this_month < 10) {
                    left_data = left_data + '<a trq="'+this_year+'-0'+this_month+'-'+i+'" txq="'+arr_week[(this_first_week+(i-1))%7]+'">'+i+'</a>';	
                }
                else {
                    left_data = left_data + '<a trq="'+this_year+'-'+this_month+'-'+i+'" txq="'+arr_week[(this_first_week+(i-1))%7]+'">'+i+'</a>';	
                }						
			}
			
		}	
		var right_data = '';
		for(j=1;j<=next_last_data;j++){//生成右边日历		
			if(j<10){
                if (next_month < 10) {
                    right_data = right_data + '<a trq="'+next_year+'-0'+next_month+'-0'+j+'" txq="'+arr_week[(next_first_week+(j-1))%7]+'">'+j+'</a>';	
                }
                else {
                    right_data = right_data + '<a trq="'+next_year+'-'+next_month+'-0'+j+'" txq="'+arr_week[(next_first_week+(j-1))%7]+'">'+j+'</a>';	
                }					
			}else if(j==next_last_data){
                if (next_month < 10) {
					if (manx_month < 10) {
						right_data = right_data + '<a class="dd_alast" trq="'+next_year+'-0'+next_month+'-'+next_last_data+'" txq="'+arr_week[(next_first_week+(j-1))%7]+'" trql="'+manx_year+'-0'+manx_month+'-0'+1+'" txql="'+arr_week[manx_first_week]+'">'+next_last_data+'</a>';
					}
					else {
						right_data = right_data + '<a class="dd_alast" trq="'+next_year+'-0'+next_month+'-'+next_last_data+'" txq="'+arr_week[(next_first_week+(j-1))%7]+'" trql="'+manx_year+'-'+manx_month+'-0'+1+'" txql="'+arr_week[manx_first_week]+'">'+next_last_data+'</a>';
					}						                    
                }
                else{
					if (manx_month < 10) {
						right_data = right_data + '<a class="dd_alast" trq="'+next_year+'-'+next_month+'-'+next_last_data+'" txq="'+arr_week[(next_first_week+(j-1))%7]+'" trql="'+manx_year+'-0'+manx_month+'-0'+1+'" txql="'+arr_week[manx_first_week]+'">'+next_last_data+'</a>';
					}
					else {
						right_data = right_data + '<a class="dd_alast" trq="'+next_year+'-'+next_month+'-'+next_last_data+'" txq="'+arr_week[(next_first_week+(j-1))%7]+'" trql="'+manx_year+'-'+manx_month+'-0'+1+'" txql="'+arr_week[manx_first_week]+'">'+next_last_data+'</a>';
					}		
                } 					               	
			}else{
                if (next_month < 10) {
                    right_data = right_data + '<a trq="'+next_year+'-0'+next_month+'-'+j+'" txq="'+arr_week[(next_first_week+(j-1))%7]+'">'+j+'</a>';	
                }
                else {
                    right_data = right_data + '<a trq="'+next_year+'-'+next_month+'-'+j+'" txq="'+arr_week[(next_first_week+(j-1))%7]+'">'+j+'</a>';	
                }						
			}
			
		}			
		 
		$("#time_first dl dd").html(left_data);
		$("#time_first dl dd a").eq(0).css("margin-left",this_first_week*27+5);	
		$("#time_first .date_top").children("code").html(''+this_year+'');	
		$("#time_first .date_top").children("label").html(''+this_month+'');	
		$("#time_second dl dd").html(right_data);	
		$("#time_second dl dd a").eq(0).css("margin-left",next_first_week*27+5);	 			 
		$("#time_second .date_top").children("code").html(''+next_year+'');	
		$("#time_second .date_top").children("label").html(''+next_month+'');			 
		 		
	}
	create_data(this_year,this_month,this_first_week,this_last_data,next_year,next_month,next_first_week,next_last_data,manx_year,manx_month,manx_first_week);
	
	$("#time_first dd a").each(function(i){//小于今天的日期加灰
		check_today(today_all,$(this).attr("trq"),i,"time_first");	
		check_manx_next(manx_next_all,$(this).attr("trq"),i,"time_first")   
	});
	$("#time_second dd a").each(function(i){//小于今天的日期加灰
		check_today(today_all,$(this).attr("trq"),i,"time_second");	 
		check_manx_next(manx_next_all,$(this).attr("trq"),i,"time_second")  
	}); 	 		
	
	function check_today(today_basic,today_com,today_comnum,today_id){  
		var today_start=new Date(today_basic.replace("-", "/").replace("-", "/"));  
		var today_end=new Date(today_com.replace("-", "/").replace("-", "/"));  
		if(today_end<today_start){ 
			today_id=="time_first"?	$("#time_first dd a").eq(today_comnum).addClass("date_ddhui"):$("#time_second dd a").eq(today_comnum).addClass("date_ddhui");
		}else{
			today_id=="time_first"?	$("#time_first dd a").eq(today_comnum).removeClass("date_ddhui"):$("#time_second dd a").eq(today_comnum).removeClass("date_ddhui");
		}
	}  
	function check_todayt(today_basic,today_com,today_comnum,today_id){  
		var today_start=new Date(today_basic.replace("-", "/").replace("-", "/"));  
		var today_end=new Date(today_com.replace("-", "/").replace("-", "/"));  
		if(today_end<=today_start){ 
			today_id=="time_first"?	$("#time_first dd a").eq(today_comnum).addClass("date_ddhui"):$("#time_second dd a").eq(today_comnum).addClass("date_ddhui");
		}else{
			today_id=="time_first"?	$("#time_first dd a").eq(today_comnum).removeClass("date_ddhui"):$("#time_second dd a").eq(today_comnum).removeClass("date_ddhui");
		}
	}  	
	function check_manx_next(manx_next_basic,manx_next_com,manx_next_comnum,manx_next_id){  
		var manx_next_start=new Date(manx_next_basic.replace("-", "/").replace("-", "/"));  
		var manx_next_end=new Date(manx_next_com.replace("-", "/").replace("-", "/"));  
		if(manx_next_end>manx_next_start){  
			manx_next_id=="time_first"?	$("#time_first dd a").eq(manx_next_comnum).addClass("date_ddhui"):$("#time_second dd a").eq(manx_next_comnum).addClass("date_ddhui");			
		}
	}  	
	
	//月份+
	$(".date_right_j").click(function(){
		change_month(1);
		if($(".date_input_on").hasClass("end_data")){
			var time_grval;
			$(".start_data").each(function(){
				if($(this).attr("time_group")==$(".date_input_on").attr("time_group")){
					time_grval=$(this).val();
				}					
			});	
			$("#time_first dd a").each(function(i){
				check_todayt(time_grval,$(this).attr("trq"),i,"time_first"); 					
				check_manx_next(manx_next_all,$(this).attr("trq"),i,"time_first");   
			});
			$("#time_second dd a").each(function(i){
				check_todayt(time_grval,$(this).attr("trq"),i,"time_second");
				check_manx_next(manx_next_all,$(this).attr("trq"),i,"time_second");  	 
			}); 					
		}else{
			$("#time_first dd a").each(function(i){
				check_today(today_all,$(this).attr("trq"),i,"time_first");
				check_manx_next(manx_next_all,$(this).attr("trq"),i,"time_first");   
			});
			$("#time_second dd a").each(function(i){
				check_today(today_all,$(this).attr("trq"),i,"time_second");	 
				check_manx_next(manx_next_all,$(this).attr("trq"),i,"time_second");  
		}); 							
							
		}						
	});
	//月份-
	$(".date_left_j").click(function(){
		change_month(-1);					
		if($(".date_input_on").hasClass("end_data")){			
			var time_grval;
			$(".start_data").each(function(){
				if($(this).attr("time_group")==$(".date_input_on").attr("time_group")){
					time_grval=$(this).val();
				}					
			});	
			$("#time_first dd a").each(function(i){
				check_todayt(time_grval,$(this).attr("trq"),i,"time_first"); 					
				check_manx_next(manx_next_all,$(this).attr("trq"),i,"time_first");   
			});
			$("#time_second dd a").each(function(i){
				check_todayt(time_grval,$(this).attr("trq"),i,"time_second");
				check_manx_next(manx_next_all,$(this).attr("trq"),i,"time_second");  	 
			}); 							
		}else{
			$("#time_first dd a").each(function(i){
				check_today(today_all,$(this).attr("trq"),i,"time_first");
				check_manx_next(manx_next_all,$(this).attr("trq"),i,"time_first");   
			});
			$("#time_second dd a").each(function(i){
				check_today(today_all,$(this).attr("trq"),i,"time_second");	 
				check_manx_next(manx_next_all,$(this).attr("trq"),i,"time_second");  
			}); 					
		}							
				
	});	
	
	$(".date_dl dd a").hover(function(){//鼠标移动上去高亮
		$(".date_dl dd a").removeClass("date_ddon");
		$(this).addClass("date_ddon");	
	});
	
	$(".date_close").click(function(){//关闭日历
		$(".date_box").hide();
		$(".home_order_form_input").removeClass("home_order_form_inputon");
		$(".home_banner_order_time").removeClass("home_order_form_inputon");
	});

$(".date_input").click(function (event) {//日期文本框点击

		$(".date_box").show().css({"left":$(this).offset().left-11,"top":$(this).offset().top+31});
		$(".date_input").removeClass("date_input_on");
		$(this).addClass("date_input_on");
		$(".home_order_form_input").removeClass("home_order_form_inputon");
		$(".home_banner_order_time").removeClass("home_order_form_inputon");
		$(this).parent().addClass("home_order_form_inputon");	
		if($(this).hasClass("start_data")){
			$("#time_first dd a").each(function(i){
				check_today(today_all,$(this).attr("trq"),i,"time_first");
				check_manx_next(manx_next_all,$(this).attr("trq"),i,"time_first");   
			});
			$("#time_second dd a").each(function(i){
				check_today(today_all,$(this).attr("trq"),i,"time_second");	 
				check_manx_next(manx_next_all,$(this).attr("trq"),i,"time_second");  
			}); 
		}else{			
			var time_grval;
			$(".start_data").each(function(){
				if($(this).attr("time_group")==$(".date_input_on").attr("time_group")){
					time_grval=$(this).val();
				}					
			});
			$("#time_first dd a").each(function(i){
				check_todayt(time_grval,$(this).attr("trq"),i,"time_first");  
			});
			$("#time_second dd a").each(function(i){
				check_todayt(time_grval,$(this).attr("trq"),i,"time_second");	 
			}); 								
		}				
		event.stopPropagation();
		if ($(window).scrollTop() < 150) {
		    $("html, body").animate({ scrollTop: 150 }, "slow");
		} else {
		    return;
		}
	});	
	
	$(".date_time_icon").click(function(event){
	  $(this).siblings(".date_input").trigger("click");
	  event.stopPropagation();
	});		
	
	$(".date_dl dd a").live("click",function(){//日期点击赋值
		var datapa_z=$(this).attr("trq");
		if($(this).hasClass("dd_alast")){
			datapa_znext=$(this).attr("trql");
		}else{			
			datapa_znext=$(this).next().attr("trq");			
		}
		if($(this).hasClass("date_ddhui")){//灰色按钮不允许点击
			return;
		}else{											
			$(".date_input_on").val(datapa_z);
			$(".date_input_on").parent().removeClass("home_order_form_inputon");	
			$(".date_box").hide();	
			if($(".date_input_on").hasClass("start_data")){				
				$(".end_data").each(function(){
					if($(this).attr("time_group")==$(".date_input_on").attr("time_group")){					
						$(this).val(datapa_znext);
					}							
				});							
			}				
		}
	});		
							
		
});

$(document).click(function(event){		
	if(event.target.className=="date_input"||event.target.className=="date_time_icon"||event.target.className=="date_left_j"||event.target.className=="date_right_j"||event.target.className=="date_box"||event.target.className=="date_top"||event.target.className=="date_fix"||event.target.className=="date_float"||event.target.className=="date_dl"||event.target.className=="date_dd"){	//时间失去焦点事件
		$(".date_box").show();		
	}else{
		$(".date_box").hide();		
		$(".home_banner_order_time").removeClass("home_banner_order_timeon");
		$(".home_banner_order_time").removeClass("home_order_form_inputon");		
			
	}					
})