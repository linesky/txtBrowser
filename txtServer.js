var fs = require("fs"); 
var nt = require("net");

var srv=nt.createServer();
srv.on("connection",Connection);

srv.listen(8080,function(){
	console.log("net server")
});

function Connection(connection){
	var d = Date();
	console.log(d);
connection.on('data',onData);
connection.on('close',onClose);
connection.on('error',onError);
	function onData(data){
		var v="";
		console.log("--------");
		vv=data.toString();
		vv=vv.replace("\n","");
		vv=vv.replace("\r","");
		if ( vv == "" ) vv="/main.txt";
		vv="./" + vv;
		console.log(vv);
		fs.readFile ( vv , function  ( err , s ){
			if (err) console.log(err);
			connection.end( s);
			connection.destroy();
		});
		
	}
	function onClose(){
		var d = Date();
		console.log(d);
		connection.destroy();
	}
	function onError(data){
		console.log(data);
		connection.destroy();
	}



}
