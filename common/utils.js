function getDate(){
	var date = new Date(),
	year = date.getFullYear(),
	month = date.getMonth() + 1,
	day = date.getDay();
	let str = year+'-'+month+'-'+day;
	return str;
}