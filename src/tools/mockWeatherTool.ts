import { tool } from "@langchain/core/tools";
import weatherRetrieveInputSchema from "./schemas/weatherRetrieveInputSchema";

const mockWeatherTool = tool(
    async ({city}) => {

        console.log(city)
        const lowerCaseCity = city.toLowerCase()
        if(lowerCaseCity === "san francisco" || lowerCaseCity === "sf") {
            return ({city : "san franciso", weather : "sunny", date : Date.now})
        }

        if(lowerCaseCity === "new york" || lowerCaseCity === "ny") {
            return ({city : "new york", weather : "snow", date : Date.now})
        }

        return "no result"
    },
    {
        name: "weatherTool",
        schema: weatherRetrieveInputSchema,
        description: "Retrieve the current weather for an american city.", 
    }
)

export default mockWeatherTool