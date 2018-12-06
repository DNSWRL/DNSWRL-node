var iconv = require('iconv-lite');
// 加载http模块
var http = require('http');
// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询
var cheerio = require('cheerio');

// var url = 'http://jbk.39.net/bw/'; // 爬取疾病列表
var url = 'http://jbk.39.net/bw/key=%E6%84%9F%E5%86%92'; // 爬取感冒列表



http.get(url, function(res) {
    var html = '';
    // 获取页面数据
    res.on('data', function(data) {
        html += iconv.decode(data,'gb2312');
    });
    // 数据获取结束
    res.on('end', function() {
        // 通过过滤页面信息获取实际需求的轮播图信息
        var slideListData = filterSlideList(html);
        // 打印信息
        printInfo(slideListData);
    });
}).on('error', function() {
    console.log('获取数据出错！');
});

/* 过滤页面信息 */
function filterSlideList(html) {
    if (html) {
        // console.log(html);
        // 沿用JQuery风格，定义$
        var $ = cheerio.load(html);
        // 根据id获取轮播图列表信息
        var slideList = $('.res_list');

        // 轮播图数据
        var slideListData = [];

        slideList.each(function(item) {
            var pic = $(this);
            var pic_href = pic.find('h3').find('a').attr('href');
            var pic_src = pic.find('h3').find('a').text();
            var pic_dd = pic.find('dd').text().trim();
            // 向数组插入数据
            slideListData.push({
                pic_href : pic_href,
                pic_dd : pic_dd,
                pic_src : pic_src
            });
        });
        return slideListData;
    } else {
        console.log('无数据传入！');
    }
}

/* 打印信息 */
function printInfo(slideListData) {
    // 计数
    var count = 0;
    // 遍历信息列表
    slideListData.forEach(function(item) {
        // 获取图片
        var pic_src = item.pic_src;
        // 获取图片对应的链接地址
        var pic_href = item.pic_href;
        // 获取图片信息
        var pic_dd = item.pic_dd;
        // 打印信息
        console.log(pic_src+'\n');
        console.log('['+pic_href+']'+'\n');
        console.log(pic_dd);
        console.log('\n');

        count++;
    });
    console.log("共爬取到"+count+"条数据");
}
