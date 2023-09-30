import User from '../models/auth.model.mjs';
import Response from '../models/response.model.mjs';

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  createUser = async (req, res) => {
    const { username, password, role, name, org } = req.body;
    const user = new User(username, password, role, name, org);
    let result = await this.authService.createUser(user);
    let response;
    if(typeof result === 'string') {
      response = new Response(400, result);
    } else {
      response = new Response(201, result);
    }
    return res.send(response).status(201);
  };

  loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = new User(username, password);
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