class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getUserDetail = async (req, res) => {
    let result = await this.userService.getUserDetail(req.params.id);
    console.log(result)
    if(result) {
        res.send(result).status(200);
    } else {
        res.send("No user found").status(404);
    }
  }

}

export default UserController;