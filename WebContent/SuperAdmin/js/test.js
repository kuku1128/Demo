//定义全局变量

var myChart; // 定义全局变量echarts
var borderWidth = 2, fontsize = 3;
; // 定义标线的宽度,提示框字体大小
var content;

var geocoords = { // 设置标注坐标
    '远程文件系统': [0, 200],
    '数据归档管理服务器': [600, 200],
    '数据处理集群': [1200, 200],
    '数据库服务器': [300, 730],
    '文件系统磁盘阵列': [900, 730]
};

var data1 = [ // 第一组标线数据（宽波段数据）
    [{
        geoCoord: [50, 140],
        smoothness: 0,
        name: "MWI",
        effect: effectLine(false, '#fff', 30),
        itemStyle: itemStyleSet(borderWidth, '#4169E1', 'dashed')
    }, {
        geoCoord: [550, 200]
    }], [{
        geoCoord: [670, 250],
        smoothness: 0,
        name: "MWI",
        effect: effectLine(false, '#fff', 30),
        itemStyle: itemStyleSet(borderWidth, '#4169E1', 'dashed')
    }, {
        geoCoord: [350, 700]
    }], [{
        geoCoord: [670, 250],
        smoothness: 0,
        name: "MWI",
        effect: effectLine(false, '#fff', 30),
        itemStyle: itemStyleSet(borderWidth, '#4169E1', 'dashed')
    }, {
        geoCoord: [850, 700]
    }]];

var data2 = [ // 第二组标线数据（紫外数据）
    [{
        geoCoord: [60, 220],
        smoothness: 0,
        name: "ZW",
        effect: effectLine(false, '#fff', 30),
        itemStyle: itemStyleSet(borderWidth, '#FF00FF', 'dashed')
    }, {
        geoCoord: [550, 200]
    }], [{
        geoCoord: [570, 245],
        smoothness: 0,
        name: "ZW",
        effect: effectLine(false, '#fff', 30),
        itemStyle: itemStyleSet(borderWidth, '#FF00FF', 'dashed')
    }, {
        geoCoord: [350, 700]
    }], [{
        geoCoord: [570, 250],
        smoothness: 0,
        name: "ZW",
        effect: effectLine(false, '#fff', 30),
        itemStyle: itemStyleSet(borderWidth, '#FF00FF', 'dashed')
    }, {
        geoCoord: [850, 700]
    }]];

var data3 = [ // 第三组标线数据（高度计数据）
    [{
        geoCoord: [65, 180],
        smoothness: 0,
        name: "IALT",
        effect: effectLine(false, '#fff', 30),
        itemStyle: itemStyleSet(borderWidth, '#FF6100', 'dashed')
    }, {
        geoCoord: [550, 200]
    }], [{
        geoCoord: [620, 250],
        smoothness: 0,
        name: "IALT",
        effect: effectLine(false, '#fff', 30),
        itemStyle: itemStyleSet(borderWidth, '#FF6100', 'dashed')
    }, {
        geoCoord: [350, 700]
    }], [{
        geoCoord: [620, 250],
        smoothness: 0,
        name: "IALT",
        effect: effectLine(false, '#fff', 30),
        itemStyle: itemStyleSet(borderWidth, '#FF6100', 'dashed')
    }, {
        geoCoord: [850, 700]
    }]];

var data4 = [[{
    geoCoord: [660, 200],
    smoothness: 0.3,
    name: "L0",
    effect: effectLine(false, '#fff', 30),
    itemStyle: itemStyleSet(borderWidth, '#385E0F', 'dashed')
}, {
    geoCoord: [1150, 200]
}]];

var data5 = [[{
    geoCoord: [1150, 200],
    smoothness: 0.1,
    name: "L1",
    effect: effectLine(false, '#fff', 30),
    itemStyle: itemStyleSet(borderWidth, '#7FFFD4', 'dashed')
}, {
    geoCoord: [660, 200]
}]];

var data6 = [[{
    geoCoord: [1150, 200],
    smoothness: 0.2,
    name: "L2",
    effect: effectLine(false, '#fff', 30),
    itemStyle: itemStyleSet(borderWidth, '#40E0D0', 'dashed')
}, {
    geoCoord: [660, 200]
}]];

var data7 = [[{
    geoCoord: [1150, 200],
    smoothness: 0.3,
    name: "L3",
    effect: effectLine(false, '#fff', 30),
    itemStyle: itemStyleSet(borderWidth, '#00FF00', 'dashed')
}, {
    geoCoord: [660, 200]
}]];

var data8 = [[{
    geoCoord: [1150, 200],
    smoothness: 0.4,
    name: "L4",
    effect: effectLine(false, '#fff', 30),
    itemStyle: itemStyleSet(borderWidth, '#7FFF00', 'dashed')
}, {
    geoCoord: [660, 200]
}]];

var data9 = [[{
    geoCoord: [1150, 200],
    smoothness: 0.5,
    name: "专题",
    effect: effectLine(false, '#fff', 30),
    itemStyle: itemStyleSet(borderWidth, '#3D9140', 'dashed')
}, {
    geoCoord: [660, 200]
}]];

function PointAttr(name, url) { // 设置标注的属性（名称、形状图片）
    var attr = {
        name: name,
        symbol: 'image://' + url,
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: "#fff"
                    },
                    formatter: function (params) {
                        return params.name;
                    }
                }
            }
        }
    }
    return attr;
}
function CreatePoint() { // 创建标注
    var objMarkP = {
        symbolSize: [50, 50],
        selectedMode: 'multiple',
        effect: {
            show: true,
            period: 10,
            bounceDistance: 5,
            type: 'bounce'
        },
        data: [PointAttr('远程文件系统', './img/cloud.png'),
            PointAttr('数据归档管理服务器', './img/store.png'),
            PointAttr('数据处理集群', './img/servers.png'),
            PointAttr('数据库服务器', './img/DB.png'),
            PointAttr('文件系统磁盘阵列', './img/file.png')]
    };
    return objMarkP;
}
function CreateLine(data) { // 创建标线
    var objMarkL = {
        smooth: true,
        selectedMode: 'single',
        symbol: ['none'],
        data: data
    }
    return objMarkL;
}

function CreateSeriesData(name, data) { // 创建系列
    var seriesData = {
        name: name,
        type: 'map',
        mapType: 'baiduBuilding',
        data: [],
        selectedMode: 'single',
        markLine: CreateLine(data)
    }
    return seriesData;
}

function effectLine(flag, color, period) { // 线的发光属性设置
    var effects = {
        show: flag,
        scaleSize: 1, // 光体大小
        period: period,
        color: color, // 发光颜色
        shadowBlur: 10
        // 阴影大小
    };
    return effects;
}

function itemStyleSet(borderWidth, color, type) { // 线属性设置
    var itemStyles = {
        normal: {
            borderWidth: borderWidth,
            lineStyle: {
                color: color,
                type: type,
                shadowBlur: 10
            }
        }
    };
    return itemStyles;
}

var option = { // 定义全局option
    backgroundColor: 'transparent',
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            if (params.seriesIndex == 0) {
                ContentView(params.dataIndex);
                return content;
            } else
                return params.name;
        }
    },
    color: ['#4169E1', '#FF00FF', '#FF6100', '#385E0F', '#7FFFD4', '#40E0D0',
        '#00FF00', '#7FFF00', '#3D9140'],
    legend: {
        orient: 'vertical',
        x: 0,
        y: 20,
        textStyle: {
            color: "#fff",
            fontSize: 14
        },
        data: ['宽波段成像仪数据产品', '紫外临边成像仪数据产品', '微波高度计数据产品', 'L0级', 'L1级', 'L2级',
            'L3级', 'L4级', '专题']
    },
    toolbox: {
        show: true,
        feature: {
            restore: {
                show: true,
                title: "刷新"
            },
            saveAsImage: {
                show: true,
                title: "保存图片"
            }
        }
    },
    series: [{
        name: '节点',
        type: 'map',
        mapType: 'baiduBuilding',
        data: [],
        selectedMode: 'single',
        geoCoord: geocoords,
        markPoint: CreatePoint()
    }, CreateSeriesData('宽波段成像仪数据产品', data1),
        CreateSeriesData('紫外临边成像仪数据产品', data2),
        CreateSeriesData('微波高度计数据产品', data3),
        CreateSeriesData('L0级', data4), CreateSeriesData('L1级', data5),
        CreateSeriesData('L2级', data6), CreateSeriesData('L3级', data7),
        CreateSeriesData('L4级', data8), CreateSeriesData('专题', data9)]
};

var seriesIndex = 1;
var dataIndex = 0;
var status = 0; // 0未传输,1正在传输,2成功,3失败
var speed = 30;

function ContentView(period) {       //显示信息内容
    var data = asyncFetchNodeInfo(period + 1);
    if (period == 2) {
        content = "L1级：<font size=" + fontsize + ">" + data[0]
            + "</font>个<br/>" + "L2级：<font size=" + fontsize + ">"
            + data[1] + "</font>个<br/>" + "L3级：<font size=" + fontsize
            + ">" + data[2] + "</font>个<br/>" + "L4级：<font size="
            + fontsize + ">" + data[3] + "</font>个<br/>" + "专题：<font size="
            + fontsize + ">" + data[4] + "</font>个";
    } else {
        var dw;
        if (period == 4)var dw = "MB";
        else dw = "个";
        content = "&nbsp;&nbsp;&nbsp;&nbsp;宽波段成像仪：<font size="
            + fontsize
            + ">"
            + data[0]
            + "</font>" + dw + "<br/>"
            + "紫外临边成像仪：<font size="
            + fontsize
            + ">"
            + data[1]
            + "</font>" + dw + "<br/>"
            + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;微波高度计：<font size="
            + fontsize + ">" + data[2] + "</font>" + dw + "<br/>";
    }
}

function displayMessage(period, xPos, param) { // period表示阶段,共五个阶段,双击显示信息框
    ContentView(period);
    $("#divFrame" + period).css("left", xPos);
    if ($("#divFrame" + period).css("display") == "none") {
        $("#divFrame" + period).css("display", "block");
        $("#divTitle" + period).html(param.name);
        $("#divContent" + period).html(
            "<span style='text-align:left'>" + content + "</span>");
    } else
        $("#divFrame" + period).css("display", "none");
}

function setColor(seriesIndex, dataIndex, status) {
    if (status != -1) {
        option.series[seriesIndex]
            .markLine.data[dataIndex][0]
            .itemStyle.normal
            .lineStyle
            .color = option.color[seriesIndex - 1];
    }
}

function SetAttr(status, speed) {
    //console.log(seriesIndex + " " + dataIndex + " " + status);
    setColor(seriesIndex, dataIndex, status);
    if (status == 0) {
        option.series[seriesIndex]
            .markLine.data[dataIndex][0]
            .itemStyle.normal
            .lineStyle
            .type = 'dashed';
        option.series[seriesIndex]
            .markLine.data[dataIndex][0]
            .effect
            .show = false;
    }
    if (status == 1) {
        option.series[seriesIndex]
            .markLine.data[dataIndex][0]
            .itemStyle.normal
            .lineStyle
            .type = 'solid';
        option.series[seriesIndex]
            .markLine.data[dataIndex][0]
            .effect
            .show = true;
        option.series[seriesIndex]
            .markLine.data[dataIndex][0]
            .effect
            .period = speed;
    }
    if (status == 2) {
        option.series[seriesIndex]
            .markLine.data[dataIndex][0]
            .itemStyle
            .normal
            .lineStyle
            .type = 'solid';
        option.series[seriesIndex]
            .markLine
            .data[dataIndex][0]
            .effect
            .show = false;
    }
    if (status == -1) {
        option.series[seriesIndex]
            .markLine
            .data[dataIndex][0]
            .itemStyle
            .normal
            .lineStyle
            .type = 'solid';
        option.series[seriesIndex]
            .markLine.
            data[dataIndex][0]
            .effect
            .show = false;
        option.series[seriesIndex].
            markLine.
            data[dataIndex][0]
            .itemStyle
            .normal
            .lineStyle
            .color = 'red';
    }
}

function fake_LineType_Data() {
    var line_data = new Array(9);
    for (var i = 0; i < 9; i++) {
        line_data[i] = {"number": i, "lines": new Array()};
    }
    for (var j = 0; j < 9; j++) {
        line_data[j] = {"number": j, "lines": new Array()};
        for (var i = 0; i < 3; i++) {
            line_data[j]["lines"][i] = {
                "number": i,
                "speed": parseInt(Math.random() * 1000) % 20 + 20,
                "status": parseInt(Math.random() * 3) - 1
            }
        }
    }
    return line_data;
}

var cntI = 0;
function flushData() {
    if (typeof myChart == 'undefined') {
        return;
    }
    var lineData = fake_LineType_Data();
    var n = 0;
    for (var i = 0; i < lineData.length; i++) {
        if (i == 0 || i == 1 || i == 2)
            n = 3;
        else
            n = 1;
        for (var j = 0; j < n; j++) {
            seriesIndex = lineData[i]["number"] + 1;
            dataIndex = lineData[i].lines[j].number;
            speed = lineData[i].lines[j]["speed"];
            status = lineData[i].lines[j]["status"];
            SetAttr(status, speed);
            myChart.setOption(option);

        }
    }
    window.setTimeout(flushData, 5000);
}

/*
 var a = '1';
 function flushData() {
 if (typeof myChart == 'undefined') {
 return;
 }
 $.ajax({
 type: "GET",
 url: "http://192.168.2.47:9080/jf/FlowHandler/getSerias?a=" + a,
 dataType: 'json',
 success: function (data) {
 a = '2';
 var lineData = data;
 if (lineData.length == 1) {
 return;
 }
 var n = 0;
 for (var i = 0; i < lineData.length; i++) {
 if (i == 0 || i == 1 || i == 2)
 n = 3;
 else
 n = 1;
 for (var j = 0; j < n; j++) {
 seriesIndex = lineData[i]["number"] + 1;
 dataIndex = lineData[i].lines[j].number;
 speed = lineData[i].lines[j]["speed"];
 status = lineData[i].lines[j]["status"];
 SetAttr(status, speed);
 myChart.setOption(option);
 }
 }
 }
 });
 window.setTimeout(flushData, 5000);
 }*/

require.config({ // 路径配置
    paths: {
        echarts: './js/echarts',
        'echarts/chart/map': './js/chart/map'
    }
});
function loadMyChartMap() {
    require( // 使用
        ['echarts', 'echarts/chart/map' // 使用地图加载map
        ], function (ec) {
            myChart = ec.init(document.getElementById('mychart'));
            // 自定义扩展图表类型：mapType = body
            require('echarts/util/mapData/params').params.baiduBuilding = {
                getGeoJson: function (callback) {
                    $.ajax({
                        url: "svg/data.svg",
                        dataType: 'xml',
                        success: function (xml) {
                            callback(xml)
                            flushData();
                        }
                    });
                }
            }
            option = option;
            var ecConfig = require('echarts/config');
            // 定义点击函数
            myChart.on(ecConfig.EVENT.DBLCLICK, eConsole);
            function eConsole(param) {
                if (typeof param.seriesIndex == 'undefined')
                    return;
                if (param.type == 'dblclick') {
                    var seriesIndex = parseInt(param.seriesIndex);
                    var dataIndex = parseInt(param.dataIndex);
                    if (seriesIndex == 0) {
                        var xPos = option.series[0].geoCoord[param.name][0]; // 获取当前节点的x坐标
                        if (dataIndex == 0) {
                            displayMessage(dataIndex, xPos + 175, param);
                        }
                        if (dataIndex == 1) {
                            displayMessage(dataIndex, xPos - 70, param);
                        }
                        if (dataIndex == 2) {
                            displayMessage(dataIndex, xPos - 320, param);
                        }
                        if (dataIndex == 3) {
                            displayMessage(dataIndex, xPos + 50, param);
                        }
                        if (dataIndex == 4) {
                            displayMessage(dataIndex, xPos - 200, param);
                        }
                    }
                    // option.series[seriesIndex].markLine.data[dataIndex][0].itemStyle.normal.lineStyle.color='red';
                    // myChart.setOption(option);
                }
            }

            // 为echarts对象加载数据
            myChart.setOption(option);
        });
}
loadMyChartMap();
/*
 var curType= option.series[seriesIndex]          //当前标线的type
 .markLine.data[dataIndex][0]
 .itemStyle.normal
 .lineStyle
 .type;
 var curEffect=option.series[seriesIndex]         //当前标线的effect情况
 .markLine.data[dataIndex][0]
 .effect
 .show;
 console.log(curType+" "+curEffect);
if(status==0){
    if(curType=='dashed'&&curEffect==false){
        flag=1;
    }
    else {
        LineData = createData(
            start,
            end,
            Smooth,
            Name,
            effectLine(false, '#fff', 30),
            itemStyleSet(borderWidth, Color, 'dashed')
        );
    }
}
else if(status==1){
    if(curType=='solid'&&curEffect==true){
        flag=1;
    }
    else {
        LineData = createData(
            start,
            end,
            Smooth,
            Name,
            effectLine(true, '#fff', speed),
            itemStyleSet(borderWidth, Color, 'solid')
        );
    }
}
else if(status==2){
    if(curType=='solid'&&curEffect==false){
        flag=1;
    }
    else {
        LineData = createData(
            start,
            end,
            Smooth,
            Name,
            effectLine(false, '#fff', speed),
            itemStyleSet(borderWidth, Color, 'solid')
        );
    }
}
else {
    if(curType=='solid'&&curEffect==false&&Color=='red'){
        flag=1;
    }
    else {

        LineData = createData(
            start,
            end,
            Smooth,
            Name,
            effectLine(false, '#fff', speed),
            itemStyleSet(borderWidth, 'red', 'solid')
        );
    }
}
if(flag==0) {
    myChart.delMarkLine(seriesIndex, Name);
    myChart.addMarkLine(seriesIndex, {
        smooth: true,
        selectedMode: 'single',
        symbol: ['none'],
        data: [LineData]
    });
}
*/
var arr=['1234'];
function string2int(s){
    var res=s.map(function (x) {
        return x/1;
    }).reduce(function(x,y){
        return x*10+y;
    });
    return res;
}

var a=123;
123..toString();
(123).toString();