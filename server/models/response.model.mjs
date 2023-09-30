class Response {
    constructor(status, data, errorMessage = "") {
      this.status = status;
      this.data = data;
      this.errorMessage = errorMessage;
    }
  
    toJSON() {
      return {
        status: this.status,
        data: this.data,
        errorMessage: this.errorMessage
      };
    }
  }
  
  export default Response;
  
  //LOOKing cute shaww kutti