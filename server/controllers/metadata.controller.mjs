import Response from '../models/response.model.mjs';

class MetadataController {
  constructor(metadataService) {
    this.metadataService = metadataService;
  }

  getFloorPlan = async (req, res) => {
    let result = await this.metadataService.getFloorPlan();
    const response = new Response(200, result);
    res.send(response).status(200);
  }
  
}
  
export default MetadataController;