import User from '../models/auth.model.mjs';
import Response from '../models/response.model.mjs';

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  createUser = async (req, res) => {
    const { userID, password, role, firstName, lastName } = req.body;
    const user = new User(userID, password, role, firstName, lastName);
    let result = await this.authService.createUser(user);
    let response;
    if(typeof result === 'string') {
      response = new Response(400, result);
      res.send(response).status(400);
    } else {
      response = new Response(201, result);
      res.send(response).status(201);
    }
  };

  loginUser = async (req, res) => {
    const { userID, password } = req.body;
    const user = new User(userID, password);
    let result = await this.authService.loginUser(user);
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

export default AuthController;