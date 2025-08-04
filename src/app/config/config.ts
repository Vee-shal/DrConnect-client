export const APP_NAME = "DrConnect";



const config = {
  ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",

  API_URL: {
    LIVE: "https://drconnect-server.onrender.com",  
    DEVELOPMENT: "http://localhost:5000/api",    
  },
};

export default config;
