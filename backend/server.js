import express from "express";
import cors from "cors";
import countryRoutes from "./routes/countryRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import eventsRoute from "./routes/events.js";
import eventsByCountryRoute from "./routes/eventsByCountry.js"; 
import eventsByTopicsRoute from "./routes/eventsByTopics.js";
import eventsBySubtopicsRoute from "./routes/eventsBySubtopics.js";
import eventsByMonthRoute from "./routes/eventsByMonth.js";





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


app.listen(5000, () => console.log("Server running on port 5000"));
