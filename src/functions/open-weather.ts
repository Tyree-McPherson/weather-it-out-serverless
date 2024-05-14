import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import axios from "axios";

export async function openWeather(req: HttpRequest): Promise<HttpResponseInit> {
  try {

    // Variable declaration.
    const appid = process.env.appid;
    const domain = "https://api.openweathermap.org";
    const latitude = req.query.get("lat");
    const longitude = req.query.get("lon");
  
    // Make an API request to the Open Weather API and return the data to the client.
    const data: any = await axios.get(`${domain}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${appid}`)
    .then((response: any) => {
      return response.data
    })
    .catch(error => {
      throw error
    });

    return {
      jsonBody: data
    };

  } catch (error) {
    return { body: error };
  };
};

app.http('open-weather', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: openWeather,
});