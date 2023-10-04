import Response from '../models/response.model.mjs';

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getUserDetail = async (req, res) => {
    let result = await this.userService.getUserDetail(req.params.id);
    let response;
    if(typeof result === 'string') {
      response = new Response(400, {}, result);
      res.send(response).status(400);
    } else {
      response = new Response(200, result);
      res.send(response).status(200);
    }
  }

}

export default UserController;