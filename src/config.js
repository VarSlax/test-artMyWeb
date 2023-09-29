const config = {
  production: {
    apiUrl: "https://api.production.com", //example
    authToken: "your_production_token_here", //example
  },
  qa: {
    apiUrl: "https://api.qa.com", // example
    authToken: "your_qa_token_here", // example
  },
  development: {
    apiUrl: "https://gorest.co.in/public/v1/users",
    authToken:
      "4507ec091617189feb007c42f949e980d400b1772751df25de40f18ef7c77e25",
  },
};

const currentEnv = process.env.NODE_ENV || "development";

export default config[currentEnv];
