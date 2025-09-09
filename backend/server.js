import express from "express";
import cors from "cors";
import countryRoutes from "./routes/countryRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import eventsRoute from "./routes/events.js";
import eventsByCountryRoute from "./routes/eventsByCountry.js"; 
import eventsByTopicsRoute from "./routes/eventsByTopics.js";




const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", countryRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/events", eventsRoute);
app.use("/api/eventsByCountry", eventsByCountryRoute); // ✅ NEW
app.use("/api/eventsByTopic", eventsByTopicsRoute);

app.listen(5000, () => console.log("Server running on port 5000"));
