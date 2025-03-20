export function getDate(){
	var date = new Date(),
	year = date.getFullYear(),
	month = date.getMonth() + 1,
	day = date.getDay();
	let str = year+'-'+(month<10?'0'+month:month)+'-'+(day<10?'0'+day:day);
	return str;
}
export default {
	getDate
};