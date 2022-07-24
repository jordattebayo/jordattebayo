import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { slug } = req.query
    const json = require('../content.json');
    const blog = json.blogPosts.find(blog => blog.slug == slug)
    res.status(200).json(blog)
}
