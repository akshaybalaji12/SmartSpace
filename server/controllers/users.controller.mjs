import Response from '../models/response.model.mjs';

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getUserDetail = async (req, res) => {
    const { userID } = req.params;
    let result = await this.userService.getUserDetail(userID);
    let response;
    if(typeof result === 'string') {
      response = new Response(404, {}, result);
      res.send(response).status(404);
    } else {
      response = new Response(200, result);
      res.send(response).status(200);
    }
  }
  
  getDelegateDetails = async (req, res) => {
    const { userID } = req.params;
    let result = await this.userService.getDelegateDetails(userID);
    let response;
    if(typeof result === 'string') {
        response = new Response(400, {}, result);
        res.send(response).status(400);
    } else {
        response = new Response(200, result);
        res.send(response).status(200);
    }
  }
  
  getStatistics = async (req, res) => {
    const { userID } = req.params;
    let result = await this.userService.getStatistics(userID);
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