import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const blogs = [
    {
      id: "0",
      slug: "amplifier-creative",
      title: "[WIP] Amplifier Creative",
      image: "/amplifierScreenshot.PNG",
      role: "Developer"
    },
    {
      id: "1",
      slug: "slate",
      title: "React Line Chart for Slate.host",
      image: "/chartScreenshot.png",
      role: "Developer/Designer"
    }
  ]
    res.status(200).json(blogs)
}
