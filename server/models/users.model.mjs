class User {
    constructor(name, password) {
      this.name = name;
      this.password = password;
    }
  
    toJSON() {
      return {
        name: this.name
      };
    }
  }
  
  export default User;