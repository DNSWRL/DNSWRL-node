var express = require('express'); //导包 处理网络请求
var path = require('path');//访问文件路径
var bodyParser = require('body-parser');//给网络请求传参
// var jieba = require('nodejieba');//分词
 
from_submit();

var result=function(){
    this.status = 0;
    this.otherSymptoms;
    this.otherExamination;

}

function analys(status,input) {
    anwser = new result();

    console.log(input);
    // jieba.load({
    //     userDict: __dirname + '/data/disease.utf8',
    // });

    // console.log(jieba.cutSmall(input,3));
    // console.log(jieba.cut(input));
    // console.log(jieba.extract(input,5));

    console.log(input);
    if(status==1){
        if(input.indexOf("感冒")>0){
            anwser.res = "可能病症：流感，风热感冒，禽流感，流感嗜血杆菌感染，风寒感冒";
        }
    }else{
        if((input.indexOf("怕冷")>0) && (input.indexOf("头痛")>0)){
            anwser.res = "流感";
        }else if((input.indexOf("发烧")>0) && (input.indexOf("咽痛")>0) && (input.indexOf("头痛")>0)){
            anwser.res = "风热感冒";
        }else if((input.indexOf("头痛")>0) && (input.indexOf("肚子痛")>0)){
            anwser.res = "禽流感";
        }else if((input.indexOf("发烧")>0) && (input.indexOf("咽痛")>0) && (input.indexOf("痉挛性咳嗽")>0)){
            anwser.res = "流感嗜血杆菌感染";
        }else if((input.indexOf("头痛")>0) && (input.indexOf("怕冷")>0)){
            anwser.res = "风寒感冒";
        }else{
            anwser.res = "别担心，普通感冒，回去喝点板蓝根";
        };
    }
    anwser.status = 1;
    return anwser;
    
}

function from_submit() {
    var app = express();

    var urlencodedParser = bodyParser.urlencoded({extended:false}); //创建编码解析
    app.use(express.static(path.join(__dirname, './'))); //添加本地文件到服务器中
    app.post('/analysis', urlencodedParser, function(req,res){
        if(req.body.status=="1"){
            console.log(req.body.status)
            input0 = req.body.input0;
            
            ans = analys(1, input0);
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8088');
            res.send({
                res1:ans.res,
                status:ans.status,
                otherSymptoms:'<h3>其它症状</h3>体征表现：<input type="radio" name="input1" value="怕冷">怕冷<input type="radio" name="input1" value="正常">正常<br>头痛：<input type="radio" name="input2" value="头痛">是<input type="radio" name="input2" value="否">否<br>肚子痛：<input type="radio" name="input3" value="肚子痛">是<input type="radio" name="input3" value="否">否<br>流鼻涕：<input type="radio" name="input4" value="流鼻涕">是<input type="radio" name="input4" value="否">否<br>发烧：<input type="radio" name="input5" value="发烧">是<input type="radio" name="input5" value="否">否<br>',
                otherExamination:'<h3>相关检查</h3>咽喉科：<input type="radio" name="input6" value="牙关紧闭">牙关紧闭<input type="radio" name="input6" value="正常">正常<input type="radio" name="input6" value="咽痛">咽红<br>眼科：<input type="radio" name="input7" value="正常">正常<input type="radio" name="input7" value="角弓反张">角弓反张<input type="radio" name="input7" value="眼睛水肿">水肿<br><br><input class="coForm" type="submit" value="确定" >'
            });
        }
        else if(req.body.status=="2"){
            input1 = req.body.input1;
            input2 = req.body.input2;
            input3 = req.body.input3;
            input4 = req.body.input4;
            input5 = req.body.input5;
            input6 = req.body.input6;
            input7 = req.body.input7;

            input = input1+","+input2+","+input3+","+input4+","+input5+","+input6+","+input7;
            inputAll = input0+":"+input;
            ans2 = analys(req.body.status, input);
            console.log(ans2);
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8088');
            res.send({
                inputAll:inputAll,
                result:ans2.res

            });
        }
        
    
        
    })

    var server = app.listen(8088, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("looking://%s:%s", host, port);
    })
}
