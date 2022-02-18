import dateFormat from "dateformat";

export function getFiveDateArray(num) {
    let dateArray = [];
    var curDate = new Date();
        let td = curDate.setDate(curDate.getDate() + num);

    for (let i = 0; i < 3; i++) {
        var date = new Date(td);
        let d = date.setDate(date.getDate() + i);
    
        dateArray.push({
            _id:i+10,
            day: dateFormat(d, "ddd"),
            fdate: dateFormat(d, "dd mmm"),
            date:dateFormat(d,'dd-mm-yyyy')
        })
    }

    
    return dateArray;
}