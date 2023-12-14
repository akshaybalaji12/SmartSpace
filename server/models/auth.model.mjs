class User {
  constructor( userID, password, role = "employee", firstName = "", lastName="", isManager=false, delegates=[]) {
    this.userID = userID;
    this.password = password;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isManager = isManager;
    this.delegates = delegates;
  }

  toJSON() {
    return {
      userID: this.userID,
      firstName: this.name,
      lastName: this.lastName,
      password: this.password,
      role: this.role,
      isManager: this.isManager,
      delegates: this.delegates
    };
  }
}

export default User;

//LOOKing cute shaww kutti