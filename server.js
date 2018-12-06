var express = require('express'); //导包 处理网络请求
var path = require('path');//访问文件路径
var bodyParser = require('body-parser');//给网络请求传参
var jieba = require('nodejieba');//分词
 
from_submit();

var response=function(){
    this.more
}

function analys(input) {
    jieba.load({
        userDict: __dirname + '/data/disease.utf8',
    });
    var topN = 4;
    jieba.insertWord("男默女泪");
    // console.log(jieba.cutSmall(input,3));
    console.log(jieba.cut(input));
    // console.log(jieba.extract(input,5));
    
}

function from_submit() {
    var app = express();
    var input1;
    var urlencodedParser = bodyParser.urlencoded({extended:false}); //创建编码解析
    app.use(express.static(path.join(__dirname, './'))); //添加本地文件到服务器中
    app.post('/analysis', urlencodedParser, function(req,res){
        input1 = req.body.input1;
        analys(input1);
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
        res.send({
            status:'1',
            otherSymptoms:'<h3>其它症状</h3>说话带鼻音：<input type="radio" name="touteng" value="yes">是<input type="radio" name="touteng" value="no">否<br>持续咳嗽：<input type="radio" name="exercise" value="yes">是<input type="radio" name="exercise" value="no">否<br>发烧：<input type="radio" name="ate" value="yes">是<input type="radio" name="ate" value="no">否<br>斑丘疹：<input type="radio" name="zhen" value="yes">是<input type="radio" name="zhen" value="no">否<br>头痛：<input type="radio" name="tou" value="yes">是<input type="radio" name="tou" value="no">否<br>',
            otherExamination:'<h3>相关检查</h3>耳鼻喉科：<input type="radio" name="inflammation" value="yes">鼻堵塞<input type="radio" name="inflammation" value="no">正常<input type="radio" name="inflammation" value="maybe">鼻发干<br>眼科：<input type="radio" name="temp" value="yes">发红<input type="radio" name="temp" value="no">含泪<input type="radio" name="temp" value="no">水肿<br><br><input class="coForm" type="submit" value="确定" >'
        });
        
    })

    var server = app.listen(8081, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("looking://%s:%s", host, port);
    })
}
