import { NextApiResponse, NextApiRequest } from 'next'
import Project from '../../../interfaces/project'
import projects from "../content.json";

interface Projects {
    projects: Project[]
}

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<Projects>
) {
    const { method } = _req;
    switch(method){
        case 'GET':
            return res.status(200).json(projects)
        default:
            return res.status(405)
    }
  }