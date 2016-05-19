function formateDate(date, pattern) {
    if (date == undefined) {
        date = new Date();
    }
    if (pattern == undefined) {
        pattern = "yyyy-MM-dd hh:mm:ss";
    }
    return date.format(pattern);
}

function formateDateFromLong(l, pattern) {
    formateDate(new Date(l), pattern);
}

exports.formateDateFromLong = formateDateFromLong;
