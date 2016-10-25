var g_Options = {};
var g_CurTabIndex = -1;

function getCurDate() {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    curDate = year + "/" + month + "/" + day;
    return curDate;
}

function fetchClassTypeColor(className) {
    if(className == "L0级") {
        return "rgba(255, 69, 0, 1)";
    }
    if(className == "L1级") {
        return "rgba(30, 144, 255, 1)";
    }
    if(className == "L2级") {
        return "rgba(124, 252, 0, 1)";
    }
    //'L0级 - 待处理', 'L1级 - 待处理', 'L2级 - 待处理', '', 'L0级 - 处理完', 'L1级 - 处理完', 'L2级 - 处理完'
    if(className == "L0级 - 待处理") {
        return "rgba(255, 69, 0, 1)";
    }
    if(className == "L1级 - 待处理") {
        return "rgba(30, 144, 255, 1)";
    }
    if(className == "L2级 - 待处理") {
        return "rgba(124, 252, 0, 1)";
    }
    if(className == "L0级 - 处理完") {
        return "rgba(255, 69, 0, 0.5)";
    }
    if(className == "L1级 - 处理完") {
        return "rgba(30, 144, 255, 0.5)";
    }
    if(className == "L2级 - 处理完") {
        return "rgba(124, 252, 0, 0.5)";
    }
}

function fetchOptionColor(legendName) {
    var ind = 0;
    var tmp = new Array();
    for(var i=0; i<legendName.length; i++) {
        if(legendName[i] == '') {
            continue;
        }
        tmp[ind] = fetchClassTypeColor(legendName[i]);
        ind++;
    }
    return tmp;
}

function createChartTitleStyle(titleName) {
    if(titleName == '') {
        return null;
    }
    var title = {
        "text": titleName,
        "x": "left",
        "y": "top",
        "padding": 1,
        "textStyle": {
            fontSize: 18,
            fontWeight: 'bolder',
            color: "#fff"
        }
    }
    return title;
}

function createLegendStyle(legendName, flag = false) {
    var legend = {
        "x": "center",
        "y": flag == true ? "19" : "8%",
        "data": legendName,
        "textStyle": {
            "color": "#fff",
            "fontSize": flag == true ? 10 : 12,
            "fontWeight": "bolder"
        }
    }
    return legend;
}

function createAxisStyle(isAddOption = false) {
    var axisLabel = {
        "textStyle": {
            "fontSize": 12,
            "fontWeight": 'bolder',
            "color": "#fff"
        }
    }
    if(isAddOption) {
        axisLabel["formatter"] = "{value} 个";
    }
    return axisLabel;
}

//['L0级 - 待处理', 'L1级 - 待处理', 'L2级 - 待处理', '', 'L0级 - 处理完', 'L1级 - 处理完', 'L2级 - 处理完']
function createCenterChart(chartName, yType, jsonData) {
    console.log(jsonData);

    var option = {
        tooltip: {
            trigger: 'axis'
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            data: yType,
            axisLabel: {
                textStyle: {
                    fontSize: 12,
                    fontWeight: 'bolder',
                    color: "#fff"
                }
            }
        }, {
            show: false,
            type: 'category',
            data: yType
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                formatter: '{value} 个',
                textStyle: {
                    fontSize: 12,
                    fontWeight: 'bolder',
                    color: "#fff"
                }
            }
        }],
        series: [{
            name: 'L0级 - 待处理',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: fetchClassTypeColor('L0级 - 待处理'), 
                    label: {
                        show: true
                    }
                }
            }
        }, {
            name: 'L1级 - 待处理',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: fetchClassTypeColor('L1级 - 待处理'),
                    label: {
                        show: true,
                        textStyle: {
                            color: '#27727B'
                        }
                    }
                }
            }
        }, {
            name: 'L2级 - 待处理',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: fetchClassTypeColor('L2级 - 待处理'),
                    label: {
                        show: true,
                        textStyle: {
                            color: '#E87C25'
                        }
                    }
                }
            }
        }, {
            name: 'L0级 - 处理完',
            type: 'bar',
            xAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: fetchClassTypeColor('L0级 - 处理完'),
                    label: {
                        show: true
                    }
                }
            }
        }, {
            name: 'L1级 - 处理完',
            type: 'bar',
            xAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: fetchClassTypeColor('L1级 - 处理完'),
                    label: {
                        show: true
                    }
                }
            }
        }, {
            name: 'L2级 - 处理完',
            type: 'bar',
            xAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: fetchClassTypeColor('L2级 - 处理完'),
                    label: {
                        show: true
                    }
                }
            }
        }]
    };
    var legend = ['L0级 - 待处理', 'L1级 - 待处理', 'L2级 - 待处理', '', 'L0级 - 处理完', 'L1级 - 处理完', 'L2级 - 处理完'];
    if(chartName != '') {
        option["title"] = createChartTitleStyle(chartName);
    }
    option["legend"] = createLegendStyle(legend, true);
    for (var i = 0; i < option.series.length; i++) {
        option.series[i]["data"] = jsonData[i];
    }
    return option;
}

function createControlChart(chartName, yType, pType, jsonData) {
    var placeHoledStyle = {
        normal: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
        },
        emphasis: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
        }
    };
    var dataStyle = {
        normal: {
            label: {
                show: true,
                position: 'insideRight',
                formatter: '{c}'
            }
        }
    };
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{b}'
        },
        grid: {
            y: 80,
            y2: 80
        },
        xAxis: [{
            type: 'value',
            position: 'bottom'
        }],
        yAxis: [{
            type: 'category',
            data: yType
        }],
        series: []
    };

    option["color"] = fetchOptionColor(pType);
    option["legend"] = createLegendStyle(pType);
    option["xAxis"][0]["axisLabel"] = createAxisStyle(true);
    option["yAxis"][0]["axisLabel"] = createAxisStyle();
    if(chartName != '') {
        option["title"] = createChartTitleStyle(chartName);
    }
    console.log(option);
    var gap_data = new Array();
    for (var i = 0; i < jsonData[0].length; i++) {
        gap_data[i] = 50;
    }
    for (var i = 0; i < jsonData.length; i++) {
        var tmp_cell = {
            name: pType[i],
            type: "bar",
            stack: "总量",
            itemStyle: dataStyle,
            data: jsonData[i]
        };
        var gap_cell = {
            name: pType[i],
            type: "bar",
            stack: "总量",
            itemStyle: placeHoledStyle,
            data: gap_data
        };
        option["series"].push(tmp_cell);
        option["series"].push(gap_cell);
    }
    // create tipformat
    var tipformat = option["tooltip"]["formatter"];
    for (var i = 0; i < jsonData.length; i++) {
        tipformat = tipformat + "</br>" + "{a" + i * 2 + "}:{c" + 2 * i + "}";
    }
    //console.log(tipformat);
    option["tooltip"]["formatter"] = tipformat;

    return option;
}

function createMetaDBChart(chartName, yType, pType, jsonData) {
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center',
            feature: {
                magicType: { show: true, type: ['line', 'bar'] }
            }
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            data: yType
        }],
        yAxis: [{
            type: 'value'
        }],
        series: []
    };

    if(chartName != '') {
        option["title"] = createChartTitleStyle(chartName);
    }
    option["legend"] = createLegendStyle(pType);
    option["color"] = fetchOptionColor(pType);
    option["xAxis"][0]["axisLabel"] = createAxisStyle();
    option["yAxis"][0]["axisLabel"] = createAxisStyle(true);
    for(var i=0; i<pType.length; i++) {
        option.series[i] = {
            "name": pType[i],
            "type": "bar",
            "data": jsonData[i]
        };
    }

    return option;
}

function createDisksChart(chartName, pType, jsonData) {
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c}MB ({d}%)"
        },
        calculable: true,
        series: [{
            name: '面积模式',
            type: 'pie',
            radius: [20, 80],
            center: ['50%', '50%'],
            roseType: 'area',
            sort: 'ascending'
        }]
    };
    option["title"] = createChartTitleStyle(chartName);
    option["legend"] = createLegendStyle(pType);
    option["color"] = fetchOptionColor(pType);
    option.series[0]["data"] = new Array(pType.length);
    for(var i=0; i<pType.length; i++) {
        option.series[0]["data"][i] = {
            "value": jsonData[i],
            "name": pType[i]
        };
    }
    return option;
}

function showErrorInfo(errorInfo) {
    alert(errorInfo);
}

function isAlreadyExists(partID, mainID) {
     var status = g_Options.hasOwnProperty("Node" + partID + mainID);
     return status;
}

function flushChartNode(changeIndex, nodeName, loadsType, productsType, renderData) {
    if(changeIndex == g_CurTabIndex) {
        var option = null;
        if(nodeName == "Node21") {
            //console.log("flushChartNode --- Node21");
            option = createCenterChart("数据归档管理服务器", loadsType, renderData);
            //console.log(option);
        }
        if(nodeName == "Node31") {
            option = createControlChart("数据处理集群", loadsType, productsType, renderData);
        }
        if(nodeName == "Node41") {
            option = createMetaDBChart("数据库服务器", loadsType, productsType, renderData);
        }
        if(nodeName == "Node51" || nodeName == "Node52" || nodeName == "Node53" || nodeName == "Node54") {
            option = createDisksChart(loadsType, productsType, renderData);
        }
        if(option != null) {
            g_Options[nodeName].setOption(option);
        }
    }
}

function highlightTabName(partID) {
    if(partID != g_CurTabIndex) {
        $("#tab_li_0" + partID + " a").css("color", "#F0E68C");
        $("#tab_li_0" + partID + " a").css("fontSize", "12px");
        // $("#tab_li_0" + partID + " a").effect("highlight", {}, 1000);
        $("#tab_li_0" + partID + " a").css("box-shadow", "0px 0px 20px #F0E68C");

        $("#tab_li_0" + g_CurTabIndex + " a").css("color", "#FFFF");
        $("#tab_li_0" + g_CurTabIndex + " a").css("fontSize", "12px");
        $("#tab_li_0" + g_CurTabIndex + " a").css("box-shadow", "0px 0px 0px #FFF");
    }
}

// 基于准备好的dom，初始化echarts图表
// 为echarts对象加载数据
function load_chart(partID, mainSize) {
    highlightTabName(partID);
    g_CurTabIndex = partID;
    if(partID == 1) {
        return ;
    }
    var actual_loads = new Array("高度计", "紫外数据", "宽波段数据", "所有数据");
    var loads_val = new Array(100, 200, 223, 523);
    var product_class = new Array("L0级", "L1级", "L2级");
    var jsonData = new Array(3);
    for (var i = 0; i < 3; i++) {
        jsonData[i] = new Array(4);
        for (var j = 0; j < 4; j++) {
            jsonData[i][j] = parseInt(Math.random() * 1000);
        }
    }
    // console.log(jsonData);
    var prefixPath = "part" + partID + "_main";
    for (var mainID = 1; mainID <= mainSize; mainID++) {
        var realPath = prefixPath + mainID;
        // console.log(realPath);
        if(isAlreadyExists(partID, mainID)) {
            continue;
        }
        var myChart = echarts.init(document.getElementById(realPath));
        var option = null;
        if (partID == 2) {
            //option = createCenterChart("归档子系统", actual_loads, product_class, jsonData);
            var tmpData = new Array(8);
            for (var i = 0; i < 8; i++) {
                tmpData[i] = new Array(4);
                for (var j = 0; j < 4; j++) {
                    tmpData[i][j] = parseInt(Math.random() * 1000);
                }
            }
            option = createCenterChart("数据归档管理服务器", actual_loads, tmpData);
        } else if (partID == 3) {
            option = createControlChart("数据处理集群", actual_loads, product_class, jsonData);
        } else if (partID == 4) {
            option = createMetaDBChart("数据库服务器", actual_loads, product_class, jsonData);
        } else if (partID == 5) {
            var tmpData = new Array(3);
            for(var i=0; i<3; i++) {
                tmpData[i] = parseInt(Math.random() * 1000);
            }
            // console.log(tmpData);
            option = createDisksChart(actual_loads[mainID - 1], product_class, tmpData);
        }
        if (option == null) {
            showErrorInfo("Load Chart PartID Error !");
            return null;
        } else {
            myChart.setOption(option);
            g_Options["Node" + partID + mainID] = myChart;
            var a = document.getElementById(realPath);
            // console.log(a.children[0]);
            if (partID != 5) {
                $(a.children[0]).css({
                    position:'absolute',
                    left: (document.body.clientWidth - $("#" + realPath).outerWidth())/2, 
                    top: (document.body.clientHeight - $("#" + realPath).outerHeight())/2 - 50
                });
            }
        }
    }
}


// window.setTimeout(aaaaa,5000);