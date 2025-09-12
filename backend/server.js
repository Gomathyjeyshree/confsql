import express from "express";
import cors from "cors";
import countryRoutes from "./routes/countryRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import eventsRoute from "./routes/events.js";
import eventsByCountryRoute from "./routes/eventsByCountry.js"; 
import eventsByTopicsRoute from "./routes/eventsByTopics.js";
import eventsBySubtopicsRoute from "./routes/eventsBySubtopics.js";
import eventsByMonthRoute from "./routes/eventsByMonth.js";
import eventsByContinent from "./routes/eventsByContinent.js";
import eventDetailRouter from "./routes/eventDetail.js";
import eventsByCityRouter from "./routes/eventsByCity.js"
import eventsByContinentTopic from "./routes/eventsByContinentTopic.js";
import eventsByCountryTopic from "./routes/eventsByCountryTopic.js";

import eventsByCityTopic from "./routes/eventsByCityTopic.js";
import eventsByContinentSubtopic from "./routes/eventsByContinentSubtopic.js";
import eventsByCountrySubtopic from "./routes/eventsByCountrySubtopic.js";
import eventsByCitySubtopic from "./routes/eventsByCitySubtopic.js";








const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", countryRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/events", eventsRoute);
app.use("/api/eventsByCountry", eventsByCountryRoute); 
app.use("/api/eventsByTopic", eventsByTopicsRoute);
app.use("/api/eventsBySubtopics", eventsBySubtopicsRoute);
app.use("/api/eventsByMonth", eventsByMonthRoute);
app.use("/api/eventsByContinent", eventsByContinent);
app.use("/api/event", eventDetailRouter);
app.use("/api/eventsByCity", eventsByCityRouter);
app.use("/api/eventsByContinentTopic", eventsByContinentTopic);
app.use("/api/eventsByCountryTopic", eventsByCountryTopic);
app.use("/api/eventsByCityTopic", eventsByCityTopic);
app.use("/api/eventsByContinentSubtopic", eventsByContinentSubtopic);
app.use("/api/eventsByCountrySubtopic", eventsByCountrySubtopic);
app.use("/api/eventsByCitySubtopic", eventsByCitySubtopic);

app.listen(5000, () => console.log("Server running on port 5000"));
