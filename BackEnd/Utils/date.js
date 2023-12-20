//Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
const time = today.getTime();
//Date

const dateInfo = {

    today, day, month, year, time
}

module.exports = dateInfo;