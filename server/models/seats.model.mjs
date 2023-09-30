class Seat {
    constructor(userID, floorNo, zone, seatNo, date) {
        this.userID = userID;
        this.floorNo = floorNo;
        this.zone = zone;
        this.seatNo = seatNo;
        this.date = date;
    }
  
    toJSON() {
      return {
        userID: this.userID,
        floorNo: this.floorNo,
        zone: this.zone,
        seatNo: this.seatNo,
        date: this.date
      };
    }
  }
  
  export default Seat;