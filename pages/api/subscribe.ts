import type { NextApiRequest, NextApiResponse } from 'next'
import mailchimp from "@mailchimp/mailchimp_marketing";

const api_key = process.env.MAILCHIMP_API_KEY
const list_id = process.env.LIST_ID

mailchimp.setConfig({
  apiKey: api_key,
  server: "us19"
});


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
    
      try {
        await mailchimp.lists.addListMember(list_id, {
          email_address: email,
          status: "subscribed"
        });
        return res.status(201).json({ error: "" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error.toString() });
      }
}