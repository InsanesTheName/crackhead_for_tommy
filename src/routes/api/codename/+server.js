import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */

export async function POST( {request} ) {
    const {name, codename} = await request.json();
    const res = await fetch(`https://docs.google.com/forms/d/e/1FAIpQLSfbeQznNMx0c6guKoQpq0Idx_y6kYl3rX2Cdr1esJl1kgzRvg/formResponse?usp=pp_url&entry.907678454=${name}&entry.548205986=${codename}&submit=Submit`);
    if(res.status===200) {
      return json({
        status: 200,
        body: {
            message: name
        }
      });
    } else {
        return json({
            status: 404,
            body: {
                message: "oh poo"
            }
        });
    }
    
}