class Visitor {
    constructor(userID, visitorFirstName, visitorLastName, visitingDate, visitPurpose, createdOn, lastUpdated, securityCode, status = "Requested",) {
        this.userID = userID;
        this.visitorFirstName = visitorFirstName;
        this.visitorLastName = visitorLastName;
        this.visitingDate = visitingDate;
        this.visitPurpose = visitPurpose;
        this.status = status;
        this.createdOn = createdOn;
        this.lastUpdated = lastUpdated;
        this.securityCode = securityCode
    }

  }
  
export default Visitor;