import Response from '../models/response.model.mjs';

class MetadataController {
  constructor(metadataService) {
    this.metadataService = metadataService;
  }

  getEmployees = async (req, res) => {
    let result = await this.metadataService.getEmployees();
    const response = new Response(200, result);
    res.send(response).status(200);
  }
  
}
  
export default MetadataController;