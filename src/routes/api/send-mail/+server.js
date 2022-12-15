import sgMail from "@sendgrid/mail";
import { json } from "@sveltejs/kit";
import fs from "node:fs";

/** @type {import('./$types').RequestHandler} */

export async function POST( { request } ) {     
    const {name, codename, content, type} = await request.json();
    


    
    /*fs.readFile((tf), (err, data) => {
     //  if(data) {
        const msg = {
        to: 'jericho@gucci-gorman.com',
        from: 'jericho@gucci-gorman.com',
        subject: name,
        text: codename,
        attachments: [
            {
            content: data.toString('base64'),
            filename: fn,
            type: type,
            disposition: 'attachment',
            content_id: 'mytext',
            },
        ],
        };
   // }
    });*/

    sgMail.setApiKey("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"); 
    /*const msg = {
        to: "jericho@gucci-gorman.com",
        from: "jericho@gucci-gorman.com",
        subject: name,
        text: codename,
        attachments: [
            {
                content: "",
                filename: "",
                type: "",
                disposition: "attachment",
                content_id: "",
            },
        ],
    };*/
   //sgMail.send(msg);
//   return json({
//    status: 200,
//    body: {
//        message: content,
//    }
//  });
    const msg = {
        to: "jericho@gucci-gorman.com",
        from: "jericho@gucci-gorman.com",
        subject: name,
        text: codename,
        attachments: [
            {
                content: content.toString('base64'),
                filename: "test.jpeg",
                type: "image/jpeg",
                disposition: "attachment",
                content_id: "tb_content_id",
            },
        ],
    };
}
