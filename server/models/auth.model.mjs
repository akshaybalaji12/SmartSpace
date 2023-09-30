class User {
  constructor( username, password, role = "employee", name = "", org = "") {
    this.username = username;
    this.password = password;
    this.role = role;
    this.name = name;
    this.org = org;
  }

  toJSON() {
    return {
      name: this.name,
      password: this.password,
      role: this.role,
      name: this.name,
      org: this.org
    };
  }
}

export default User;

//LOOKing cute shaww kutti