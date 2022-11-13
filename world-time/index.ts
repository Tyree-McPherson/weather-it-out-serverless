import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import axios from "axios";

const worldTime: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    
    // Variable declaration.
    const apiKey = process.env.rapidApiKey;
    const domain = "world-time2.p.rapidapi.com";
    const ip = req.query.ip;
    const options = {
      method: 'GET',
      url: `https://world-time2.p.rapidapi.com/ip/${ip}.txt`,
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': domain
      }
    };
  
    // Get the Time Zone abbreviation.
    await axios.get(`https://world-time2.p.rapidapi.com/ip/${ip}.txt`, options)
    .then((response: any) => context.res!.json({
        cod: "200",
        abbreviation: response.data.split(" ")[1].split("\n")[0]
      })
    )
    .catch((error) => {
      throw error;
    });

  } catch (error) {
    context.res!.json({
      cod: "400"
    });
  };
};

export default worldTime;