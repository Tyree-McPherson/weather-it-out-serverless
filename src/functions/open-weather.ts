import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import axios from "axios";

export async function openWeather(req: HttpRequest): Promise<HttpResponseInit> {
  try {

    console.log("here?")

    // Variable declaration.
    const appid = process.env.appid;
    const domain = "https://api.openweathermap.org";
    const latitude = req.query.get("lat");
    const longitude = req.query.get("lon");

    console.log(appid)
    console.log(latitude)
    console.log(longitude)
  
    // Make an API request to the Open Weather API and return the data to the client.
    const data: any = await axios.get(`${domain}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${appid}`)
    .then((response: any) => {
      return response.data
    })
    .catch(error => {
      throw error
    });

    console.log(data)

    return {
      jsonBody: data
    };

  } catch (error) {
    console.log("error?")
    console.log(error)
    return { body: error };
  };
};

app.http('open-weather', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: openWeather,
});