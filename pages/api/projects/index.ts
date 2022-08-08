import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const json = require('../content.json');
    
    res.status(200).json(json.projects)
}
