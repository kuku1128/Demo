var g_LoadsNameList = new Array("MWI", "ZW", "IALT"); // 宽波段, 紫外仪,高度计
var g_SensorsNameList = new Array("宽波段数据", "紫外数据", "高度计", "所有数据");
var g_ProductClassList = new Array("L0级", "L1级", "L2级");
var g_BackData = null;
var g_StepData = {};

function extractDiffClassTypeInfo(classID, keyField) {
    var data = 0;
    for(var i=0; i<g_LoadsNameList.length; i++) {
        var t_name = g_LoadsNameList[i];
        if(classID < g_StepData[3][t_name]["l"].length) {
            data += g_StepData[3][t_name]["l"][classID][keyField];
        }
    }
    return data;
}

function extractDiffClassTypeInfoWithSensors(sensorID, classID, keyField) {
    var data = 0;
    var t_name = g_LoadsNameList[sensorID];
    if(classID < g_BackData[t_name]['l'].length) {
        data += g_BackData[t_name]['l'][classID][keyField];
    }
    return data;
}
//function flushChartNode(changeIndex, nodeName, loadsType, productsType, renderData);
function extractNode02Info() {
    //先收集待处理，之后在收集处理完的数据
    var data = new Array(g_ProductClassList.length * 2);
    for(var i=0; i<data.length; i++) {
        data[i] = new Array(0, 0, 0, 0);
    }
    for(var i=0; i<g_LoadsNameList.length; i++) {
        for(var j=0; j<g_ProductClassList.length; j++) {
            data[j][i] = extractDiffClassTypeInfoWithSensors(i, j, "cntFileNum") - extractDiffClassTypeInfoWithSensors(i, j, "cntFileNumSuc");
        }
    }
    for(var i=0; i<g_LoadsNameList.length; i++) {
        for(var j=0; j<g_ProductClassList.length; j++) {
            data[g_ProductClassList.length + j][i] = extractDiffClassTypeInfoWithSensors(i, j, "cntFileNumSuc");
        }
    }
    //calc total info
    for(var i=0; i<data.length; i++) {
        for(var j=0;j<data[i].length-1; j++) {
            data[i][data[i].length-1] += data[i][j];
        }
    }
    flushChartNode(2, "Node21", g_SensorsNameList, g_ProductClassList, data);
}

function extractNode03Info() {
    // get class type length
    var maxClassLen = g_ProductClassList.length;
    // for(var i=0; i<g_LoadsNameList.length; i++) {
    //     var ProductDatas = g_BackData[g_LoadsNameList[i]].l;
    //     if(maxClassLen < ProductDatas.length) {
    //         maxClassLen = ProductDatas.length;
    //     }
    // }
    
    var chartPType = new Array(maxClassLen);
    for(var i=0; i<maxClassLen; i++) {
        chartPType[i] = g_ProductClassList[i];
    }

    var nodedata = new Array();
    for(var i=0; i<maxClassLen; i++) {
        nodedata[i] = new Array(0, 0, 0, 0);
    }

    for(var i=0; i<g_LoadsNameList.length; i++) {
        var ProductDatas = g_BackData[g_LoadsNameList[i]].l;
        for(var j=0; j<maxClassLen; j++) {
            nodedata[j][i] = parseInt(ProductDatas[j].cntFileNum);
        }
    }

    //统计 总数的数据是多少
    for(var i=0; i<nodedata.length; i++) {
        nodedata[i][3] += (nodedata[i][0] + nodedata[i][1] + nodedata[i][2]);
    }
    flushChartNode(3, "Node31", g_SensorsNameList, chartPType, nodedata);
}

function extractNode04Info() {
    // get class type length
    var maxClassLen = g_ProductClassList.length;
    // for(var i=0; i<g_LoadsNameList.length; i++) {
    //     var ProductDatas = g_BackData[g_LoadsNameList[i]].l;
    //     if(maxClassLen < ProductDatas.length) {
    //         maxClassLen = ProductDatas.length;
    //     }
    // }
    var chartPType = new Array(maxClassLen);
    for(var i=0; i<maxClassLen; i++) {
        chartPType[i] = g_ProductClassList[i];
    }

    var nodedata = new Array();
    for(var i=0; i<maxClassLen; i++) {
        nodedata[i] = new Array(0, 0, 0, 0);
    }

    for(var i=0; i<g_LoadsNameList.length; i++) {
        var ProductDatas = g_BackData[g_LoadsNameList[i]].l;
        for(var j=0; j<maxClassLen; j++) {
            nodedata[j][i] = parseInt(ProductDatas[j].cntFileNumDB);
        }
    }

    for(var i=0; i<nodedata.length; i++) {
        for(var j=0; j<g_LoadsNameList.length; j++) {
            nodedata[i][3] += nodedata[i][j];
        }
    }
    flushChartNode(4, "Node41", g_SensorsNameList, chartPType, nodedata);
}

function extractNode05_LoadsPart(loadsKey) {
    var data = g_BackData[loadsKey].l;
    var productData = new Array(g_ProductClassList.length);
    for(var i=0; i<productData.length; i++) {
        productData[i] = 0;
    }
    for(var i=0; i<data.length; i++) {
        productData[i] = data[i].cntFileSizeDisk;
    }
    return productData;
}

function extractNode05Info() {
    var resData = {};
    for(var i=0; i<g_LoadsNameList.length; i++) {
        var tmp = extractNode05_LoadsPart(g_LoadsNameList[i]);
        resData[g_LoadsNameList[i]] = tmp;
    }
    //添加所有载荷的数据的情况，并可以前台刷新
    resData["Sum"] = new Array(g_ProductClassList.length);
    for(var i=0; i<resData["Sum"].length; i++) {
        resData["Sum"][i] = 0;
    }
    for(var key in resData) {
        for(var i=0; i<resData[key].length; i++) {
            resData["Sum"][i] += (resData[key][i]);
        }
    }
    //refresh chart data
    for(var i=0; i<g_LoadsNameList.length; i++) {
        var ind = i + 1;
        var key = g_LoadsNameList[i];
        flushChartNode(5, "Node5" + ind , g_SensorsNameList[i], g_ProductClassList, resData[key]);
    }
    flushChartNode(5, "Node54", g_SensorsNameList[g_SensorsNameList.length-1], g_ProductClassList, resData["Sum"]);
}

function parseJsonData(firstLoadHtml) {
    if(g_BackData.number == 1) {
        // 意味着要去更新节点01和节点02
        // 我们不用关心Node01节点信息
        extractNode02Info();
    } else if(g_BackData.number == 2) {
        // 意味着要去更新节点02和节点03
        // extractNode02Info();
        extractNode03Info();
    } else if(g_BackData.number == 3) {
        // 意味着要去更新节点03和节点04
        if(firstLoadHtml == "2")
            extractNode02Info();
        // extractNode04Info();
    } else if(g_BackData.number == 4) {
        // 意味着要去更新节点04和节点05
        extractNode04Info();
    } else if(g_BackData.number == 5) {
        extractNode05Info();
    }
    return true;
}

function asyncFetchNodeInfo(nodeID) {
    var data = null;
    if(nodeID == 3)
        data = new Array(0, 0, 0, 0, 0);
    else
        data = new Array(0, 0, 0);
    if(g_StepData.hasOwnProperty(nodeID) == false) {
        return data;
    }
    //MWI, ZW, IALT
    if(nodeID == 1 || nodeID == 2) {
        data = new Array(3);
        data[0] = g_StepData[nodeID].MWI.cntFileNum;
        data[1] = g_StepData[nodeID].ZW.cntFileNum;
        data[2] = g_StepData[nodeID].IALT.cntFileNum;
    } else if(nodeID == 4) {
        data = new Array(3);
        data[0] = g_StepData[nodeID].MWI.cntFileNumDB;
        data[1] = g_StepData[nodeID].ZW.cntFileNumDB;
        data[2] = g_StepData[nodeID].IALT.cntFileNumDB;
    } else if(nodeID == 5) {
        data = new Array(3);
        data[0] = g_StepData[nodeID].MWI.cntFileSizeDisk;
        data[1] = g_StepData[nodeID].ZW.cntFileSizeDisk;
        data[2] = g_StepData[nodeID].IALT.cntFileSizeDisk;
    } else {
        data = new Array(5);
        for(var i=0; i<5; i++) {
            data[i] = extractDiffClassTypeInfo(i+1, "cntFileNum");
        }
    }
    return data;
}

/*function whitchChange() {
    var firstLoadHtml = "1";
    if(g_BackData != null) {
        firstLoadHtml = "2";
    }
    $.ajax({
        type: "GET",
        url: "http://192.168.199.204:9080/jf/FlowHandler/getStepList?a=" + firstLoadHtml,
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        crossDomain: false,
        //是否使用异步发送
        async: false,
        cache: false,
        success: function(response) {
            if(response.length > 1 && response != '1') {
                for(var ind in response) {
                    g_BackData = response[ind];
                    g_StepData[g_BackData.number] = g_BackData;
                    parseJsonData(firstLoadHtml);
                }
            }
        }
    });
    window.setTimeout(whitchChange,10000);
}

whitchChange();*/
