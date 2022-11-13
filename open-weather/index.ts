import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import axios from "axios";

const openWeather: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    
    // Variable declaration.
    const appid = process.env.appid;
    const domain = "https://api.openweathermap.org";
    const latitude = req.query.lat;
    const longitude = req.query.lon;
  
    // Make an API request to the Open Weather API and return the data to the client.
    await axios.get(`${domain}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${appid}`)
    .then((response: any) => context.res!.json(response.data))
    .catch(error => {
      throw error
    })

  } catch (error) {
    context.res!.json({
      cod: "400"
    });
  };
};

export default openWeather;