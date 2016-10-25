function fake_ClassType_Data() {
	var tmp_a = parseInt(Math.random() * 1000);
    var classData = {
    	"number": parseInt(Math.random() * 1000) % 4 + 1,
        "cntFileNum": tmp_a + parseInt(Math.random() * 100),
        "cntFileSize": tmp_a,
        "cntFileNumSuc": tmp_a,
        "cntFileSizeSuc": tmp_a,
        "cntFileNumFail": 0,
        "cntFileNumDB": tmp_a,
        "cntFileSizeDisk": tmp_a,
        "status": 0,
        "isChanged": true
    }
    return classData;
}

function fake_SensorType_Data() {
	var sensorData = fake_ClassType_Data();
	var sensorNames = new Array("MWI", "ZW", "IALT");
	for(var j=0; j<3; j++) {
		var t = sensorNames[j];
		sensorData[t] = fake_ClassType_Data();
		sensorData[t]["l"] = new Array(3);
		for(var i=0; i<3; i++) {
			sensorData[t]["l"][i] = fake_ClassType_Data();
		}
	}
	return sensorData;
}

function monitorServer(argument) {
	//console.log("monitorServer");
    var tmp = fake_SensorType_Data();
    g_BackData = tmp;
    //console.log(g_BackData);
    parseJsonData();
    window.setTimeout(monitorServer, 2000);
}

monitorServer();