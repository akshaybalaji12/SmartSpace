import Response from '../models/response.model.mjs';
import Visitor from '../models/visitors.model.mjs';

class VisitorController {
  constructor(visitorService) {
    this.visitorService = visitorService;
  }

  raiseVisitorAccess = async (req, res) => {
    const { userID, visitorFirstName, visitorLastName, visitingDate, visitPurpose, createdOn, lastUpdated, securityCode } = req.body;
    const visitor = new Visitor(userID, visitorFirstName, visitorLastName, visitingDate, visitPurpose, createdOn, lastUpdated, securityCode);
    let result = await this.visitorService.raiseVisitorAccess(visitor);
    let response;
    if(result.indexOf("raised") >= -1) {
      response = new Response(201, result);
      res.send(response).status(201);
    } else {
      response = new Response(400, result);
      res.send(response).status(400);
    }
  }

  getVisitorRequests = async (req, res) => {
    const { userID } = req.params;
    let result = await this.visitorService.getVisitorRequests(userID);
    let response;
    if(typeof result === 'string') {
      response = new Response(400, result);
      res.send(response).status(400);
    } else {
      response = new Response(200, result);
      res.send(response).status(200);
    }
  }

  getAdminRequests = async (req, res) => {
    let result = await this.visitorService.getAdminRequests();
    let response;
    if(typeof result === 'string') {
      response = new Response(400, result);
      res.send(response).status(400);
    } else {
      response = new Response(200, result);
      res.send(response).status(200);
    }
  }

  adminAction = async (req, res) => {
    const { id, action } = req.body;
    let result = await this.visitorService.adminAction(id, action);
    let response;
    if(result.indexOf('wrong') > -1) {
      response = new Response(400, result);
      res.send(response).status(400);
    } else {
      response = new Response(201, result);
      res.send(response).status(201);
    }
  }

}

export default VisitorController;