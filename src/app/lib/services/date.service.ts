export const convertToTimeStamp = (str) => {
    const arr = str.split('/');
    const collectBackAsStr = arr[1] + ',' + arr[0] + ',' + arr[2];
    const timeStamp = new Date(collectBackAsStr).getTime();

    return timeStamp;
};

export const stampConvertToDate = (stamp) => {
    console.log(new Date(stamp));
    return dateFormat(new Date(stamp), 'dd/mm/yyyy');
};

export const dateFormat = (date, format = 'dd/mm/yyyy HH:MM:SS') => { // todo format
    const outputDate = {};

    let d, m, y, h, min, sec;

    d = date.getDate();
    if ( d < 10 ) {
        d = '0' + d;
    }
    m = date.getMonth() + 1;
    if ( m < 10 ) {
        m = '0' + m;
    }
    y = date.getFullYear();
    h = date.getHours();
    if ( h < 10 ) {
        h = '0' + h;
    }
    min = date.getMinutes();
    if ( min < 10 ) {
        min = '0' + min;
    }
    sec = date.getSeconds();
    if ( sec < 10 ) {
        sec = '0' + sec;
    }

    return format.replace('dd', d).replace('mm', m).replace('yyyy', y).replace('HH', h).replace('MM', min).replace('SS', sec);
};

// todo write time countdown
export const timeCountDown = () => {

}
