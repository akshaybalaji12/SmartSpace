export const parseSeatNo = (seatNo) => {
    const len = seatNo.length;
    const row = seatNo[len - 2];
    const col = seatNo[len - 1];
    return `${row}-${col}`;
}

export const getSeatNo = (seatRC, floor, zone) => {
    const seat = seatRC.replace("-", "");
    const floorNo = floor.split(" ")[1];
    const floorZone = zone.split(" ")[1];
    return `C${floorNo}${floorZone}${seat}`;
}

export const generateRandomAlphaNumeric = (length = 10) => {
    let s = '';
    Array.from({ length }).some(() => {
      s += Math.random().toString(36).slice(2);
      return s.length >= length;
    });
    return s.slice(0, length);
};