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

function createData(start,end,Smooth,Name,Effect,ItemStyle){
    var data = [{
        geoCoord: start,
        smoothness: Smooth,
        name: Name,
        effect: Effect,
        itemStyle: ItemStyle
    }, {geoCoord: end}];
    return data;
}
var data1=[    // 第一组标线数据（宽波段数据）
    createData([50,140],[550,200],0,"MWI01",effectLine(false, '#fff', 30),itemStyleSet(borderWidth, '#4169E1', 'dashed')),
    createData([570, 250],[350, 700],0,"MWI02",effectLine(false, '#fff', 30),itemStyleSet(borderWidth, '#4169E1', 'dashed')),
    createData([570, 250],[850, 700],0,"MWI03",effectLine(false, '#fff', 30),itemStyleSet(borderWidth, '#4169E1', 'dashed')),
];
var data2=[    // 第二组标线数据（紫外数据）
    createData([65, 180],[550, 200],0,"ZW01",effectLine(false, '#fff', 30),itemStyleSet(borderWidth, '#FF00FF', 'dashed')),
    createData([620, 250],[350, 700],0,"ZW02",effectLine(false, '#fff', 30),itemStyleSet(borderWidth, '#FF00FF', 'dashed')),
    createData([620, 250],[850, 700],0,"ZW03",effectLine(false, '#fff', 30),itemStyleSet(borderWidth, '#FF00FF', 'dashed')),
];

var data3=[   // 第三组标线数据（高度计数据）
    createData([60, 220], [550, 200],0,"IALT01",effectLine(false, '#fff', 30),itemStyleSet(borderWidth, '#FF6100', 'dashed')),
    createData([670, 245],[350, 700],0,"IALT02",effectLine(false, '#fff', 30),itemStyleSet(borderWidth, '#FF6100', 'dashed')),
    createData([670, 250],[850, 700],0,"IALT03",effectLine(false, '#fff', 30),itemStyleSet(borderWidth, '#FF6100', 'dashed')),
];

var data4=[
    createData([660, 200], [1150, 200],0.3,"L0",effectLine(false, '#fff', 30),itemStyleSet(borderWidth, '#385E0F', 'dashed')),
];

var data5=[
    createData([1150, 200], [660, 200],0.1,"L1",effectLine(false, '#fff', 30),itemStyleSet(borderWidth, '#7FFFD4', 'dashed')),
];

var data6=[
    createData([1150, 200], [660, 200],0.2,"L2",effectLine(false, '#fff', 30),itemStyleSet(borderWidth, '#40E0D0', 'dashed')),
];

var data7=[
    createData([1150, 200], [660, 200],0.3,"L3",effectLine(false, '#fff', 30),itemStyleSet(borderWidth, '#00FF00', 'dashed')),
];

var data8=[
    createData([1150, 200], [660, 200],0.4,"L4",effectLine(false, '#fff', 30),itemStyleSet(borderWidth, '#7FFF00', 'dashed')),
];

var data9=[
    createData([1150, 200], [660, 200],0.5,"专题",effectLine(false, '#fff', 30),itemStyleSet(borderWidth, '#3D9140', 'dashed')),
];

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
        shadowBlur: 5
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
                shadowBlur: 5
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

//将标线信息放入dataArray数组中
var dataArray=new Array();
dataArray=[data1,data2,data3,data4,data5,data6,data7,data8,data9];

//判断当前状态如果与即将变化的状态一致，则不需要更新，否则删除当前线并且新增所需状态的标线
function SetAttr(status, speed) {
    console.log(seriesIndex + " " + dataIndex + " " + status);
    var LineData;
    var tempData=dataArray[seriesIndex-1];
    //获取当前标线的相关信息
    var start=tempData[dataIndex][0].geoCoord;       //标线起点
    var end=tempData[dataIndex][1].geoCoord;         //标线终点
    var Smooth=tempData[dataIndex][0].smoothness;    //标线的平滑度
    var Name=tempData[dataIndex][0].name;            //标线的名称
    var Color=tempData[dataIndex][0].itemStyle.normal.lineStyle.color;     //标线的颜色

    if(status==0){
        LineData = createData(
            start,
            end,
            Smooth,
            Name,
            effectLine(false, '#fff', 30),
            itemStyleSet(borderWidth, Color, 'dashed')
        );
    }
    else if(status==1){
        LineData = createData(
            start,
            end,
            Smooth,
            Name,
            effectLine(true, '#fff', speed),
            itemStyleSet(borderWidth, Color, 'solid')
        );
    }
    else if(status==2){
        LineData = createData(
            start,
            end,
            Smooth,
            Name,
            effectLine(false, '#fff', speed),
            itemStyleSet(borderWidth, Color, 'solid')
        );
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
    myChart.delMarkLine(seriesIndex, Name);
    myChart.addMarkLine(seriesIndex, {
        smooth: true,
        selectedMode: 'single',
        symbol:['none'] ,
        data: [LineData]
    });
}

function fake_LineType_Data() {
    var nums=parseInt(Math.random())%9+1;
    var line_data = new Array(nums);
    for (var i = 0; i < nums; i++) {
        line_data[i] = {"number": i, "lines": new Array()};
    }
    for (var j = 0; j < nums; j++) {
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
window.setInterval(flushData, 20000);
function flushData() {
    if (typeof myChart == 'undefined') {
        return;
    }
    var lineData = fake_LineType_Data();
    var n = 0;
    for (var i = 0; i < lineData.length; i++) {
        seriesIndex = lineData[i]["number"] + 1;
        if(seriesIndex < 3)n = 3;
        else n = 1;
        for (var j = 0; j < n; j++) {
            dataIndex = lineData[i].lines[j].number;
            speed = lineData[i].lines[j]["speed"];
            status = lineData[i].lines[j]["status"];
            SetAttr(status, speed);
        }
    }
}
/*
window.setInterval(flushData, 5000);
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
                seriesIndex = lineData[i]["number"] + 1;
                if(seriesIndex < 3)n = 3;
                else n = 1;
                for (var j = 0; j < n; j++) {
                    dataIndex = lineData[i].lines[j].number;
                    speed = lineData[i].lines[j]["speed"];
                    status = lineData[i].lines[j]["status"];
                    SetAttr(status, speed);
                    myChart.setOption(option);
                }
            }
        }
    });
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
                }
            }
            // 为echarts对象加载数据
            myChart.setOption(option);
        });
}
loadMyChartMap();
$.fn.styles=function(){
    this.css("backgroundColor",'rgba(0,0,0,0.3)')
        .css("color","white");
    return this;
}
$(function(){
    var mains=$("#mychart");
    mains.before("<input id='add' type='button' value='增加'/><input id='del' type='button' value='删除'/>");
    $("#add").styles();$("#del").styles();
    var tempData = dataArray[3];
    var start = tempData[0][0].geoCoord;
    var end = tempData[0][1].geoCoord;
    var Smooth = tempData[0][0].smoothness;
    var Name = tempData[0][0].name;
    var Color = tempData[0][0].itemStyle.normal.lineStyle.color;
    $("#add").click(function(){
        LineData = createData(
            start,
            end,
            Smooth,
            Name,
            effectLine(true, '#fff', 30),
            itemStyleSet(borderWidth, Color, 'solid')
        );
        myChart.addMarkLine(seriesIndex,{
            smooth: true,
            selectedMode: 'single',
            symbol: ['none'],
            data:[LineData]
        });
    });
    $("#del").click(function(){
        myChart.delMarkLine(4,Name);
    });
});
