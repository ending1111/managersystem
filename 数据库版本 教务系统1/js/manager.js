var pageIndex=1;
//每页现实多少条记录
var pageSize=10;
//尾页
$(function(){
	initData()
	$(window).scroll(function(){
		if($(window).scrollTop() >= ($(document).height()-$(window).height())-1){
			pageSize+=4
			initData()
		}
		console.log($(window).scrollTop())
		console.log(($(document).height()-$(window).height()))
	})
	$(window).scrollTop(0)
})
//{"pageIndex":pageIndex,"pageSize":pageSize}
function initData(){
	$.getJSON("http://localhost:8080/javaeeproject004/StudentServlet?type=GetStudentAll",{"pageIndex":pageIndex,"pageSize":pageSize},function(data){
		slist=data.data
		loadTable()
	},"json")
}
// 给表格加载数据
function loadTable(){
	numEnd=Math.ceil(slist.length/pageSize);
	console.log(numEnd+","+slist.length)
	var tbody=document.querySelector("table>tbody")
	var msg="";
	for(var i=(pageIndex-1)*pageSize;i<(pageIndex*pageSize<slist.length?pageIndex*pageSize:slist.length);i++){
		msg+="<tr>";
		msg+="<td>"+slist[i].id+"</td>"
		msg+="<td>"+slist[i].name+"</td>"
		msg+="<td>"+slist[i].pwd+"</td>"
		msg+="<td>"+slist[i].address+"</td>"
		msg+="<td>"+slist[i].sex+"</td>"
		msg+="<td>"+slist[i].tel+"</td>"
		// msg+="<td><img src='http://localhost:8080/ImgServer/img/"+slist[i].img+".jpg' width='80px' height='40px'/></td>"
		msg+="<td><img src='http://47.102.158.74/img/"+slist[i].img+".jpg' width='80px' height='40px'/></td>"
		
		msg+="<td>"+slist[i].cinfo.cname+"</td>"
		msg+="<td><a href='javascript:deleteStudentById("+slist[i].id+")'>删除</a> <a href='javascript:updateStudent("+i+")'>编辑</a></td>"
		msg+="</tr>";
	}
	tbody.innerHTML=msg
}
// 添加学生
function addStudent(){
	if($("#btn1").val()=="添加"){
	$.post("http://localhost:8080/javaeeproject004/StudentServlet?type=addStudent",$("#addStudent1").serialize(),function(number){
		
		initData()
		closeWin()
	},"json")
}else if($("#btn1").val()=="保存"){
		//添加到服务器
		$.post("http://localhost:8080/javaeeproject004/StudentServlet?type=updateStudent",$("#addStudent1").serialize(),function(data){
			// alert(1)
			// if(data.data){
				initData()
				closeWin()
			// }
		},"json")
	}
}
// 删除数据
function deleteStudentById(id){
	if(confirm("是否删除?")){
		$.getJSON("http://localhost:8080/javaeeproject004/StudentServlet?type=DeleteStudentById",{"id":id},function(data){
			alert(id)
			if(data.status>0){
				confirm("删除成功！")
				initData()
			}
		})
	}
}
// 编辑所有数据
function updateStudent(index){
	add();
	$("#id").val(slist[index].id)
	$("#name").val(slist[index].name)
	$("#pwd").val(slist[index].pwd)
	$("#address").val(slist[index].address)
	$("#tel").val(slist[index].tel)
	$("#sex").val(slist[index].sex)
	$("#img").val(slist[index].img)
	$("#classid").val(clist[slist[index].classid])
	$("#btn1").val("保存")
	// alert(1)
}

// 添加时弹出
 function add(){
	 show()
	 var div1=document.querySelector("#add")
	 div1.style.display="block"
	 div1.style.position="absolute"
	 // 让弹出的窗口到上面一层来
	 div1.style.zIndex=2
	 div1.style.left="50%"
	 div1.style.top="50%"
	 div1.style.backgroundColor="aqua"
	
	 $("#btn1").val("添加")
	 
 }
 // 开启模式化窗口
 function show(){
	 var div0=document.querySelector("#div0")
	  div0.style.display="block"
	 div0.style.width="100%"
	 div0.style.height="100%"
	 div0.style.position="absolute"
	 div0.style.left="0px"
	 div0.style.top="0px"
	 div0.style.zIndex=1
	 div0.style.backgroundColor="bisque"
	 div0.style.filter="opacity(30%)"
 }
 // 关闭窗口
 function closeWin(){
	 var div1=document.querySelector("#add")
	 var div0=document.querySelector("#div0")
	 // 不显示
	 div1.style.display="none"
	 div0.style.display="none"
 }

function getValueById(tid){
	return document.getElementById(tid).value
}
function beginPage(){
	pageIndex=1;
	loadTable()
}

function endPage(){
	pageIndex=numEnd;
	loadTable()
}

function upPage(){
	pageIndex=pageIndex==1?1:pageIndex-1;
	loadTable()
}

function downPage(){
	pageIndex=pageIndex==numEnd?numEnd:pageIndex+1;
	loadTable()
} 
function createPageContent(){
	$("#pagin").html(createPage(pageIndex,numEnd))
	$("a[v="+pageIndex+"]").addClass("current")
	$("#pagin").on("click",function(){
	if(parseInt($(event.target).html())){
		// 转换成整形
		 pageIndex=parseInt($(event.target).html())
			$("#pagin").html(createPage(pageIndex,numEnd))	
			$("a[v="+pageIndex+"]").addClass("current")
			loadTable()
			}
	})
}