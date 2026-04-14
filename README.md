Project Description
HNG Internship - Backend Stage 0 Task
This project builds a simple REST API endpoint that integrates with the Genderize.io external API.
Endpoint:
GET /api/classify?name={name}
What it does:

Accepts a name query parameter
Calls the Genderize API to predict the gender of the name
Processes the response by:
Renaming count to sample_size
Calculating is_confident (true if probability ≥ 0.7 and sample_size ≥ 100)
Adding the current UTC timestamp (processed_at)

Returns a structured JSON response with proper error handling

Tech Stack:

Node.js
Express.js
Deployed on Vercel

This task demonstrates basic backend skills: API integration, data processing, error handling, and CORS configuration.
