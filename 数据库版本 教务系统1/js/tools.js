
// 当前页  最后一页
function createPage(pageIndex,endPage){
	var msg="";
	msg+="<a href='#' v=1>1</a> ";
	if(endPage<=13){
		msg+=createContent(2,endPage);
	}else if(pageIndex<=7){
		msg+=createContent(2,13);
		msg+=" ... ";
	}else if(pageIndex>(endPage-7)){
		msg+=" ... ";
		msg+=createContent(endPage-11,endPage);
	}else{
		msg+=" ... ";
		msg+=createContent(pageIndex-5,pageIndex+6);
		msg+=" ... ";
	}
	msg+="<a href='#' v="+endPage+">"+endPage+"</a>";
	return msg;
}

function createContent(begin,end){
	var msg="";
	for(var i=begin;i<end;i++){
		msg+="<a href='#' v="+i+">"+i+"</a> ";
	}
	return msg;
}