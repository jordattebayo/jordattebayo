import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { slug } = req.query
    const json = require('../content.json');
    const project = json.projects.find(project => project.slug == slug)
    res.status(200).json(project)
}
