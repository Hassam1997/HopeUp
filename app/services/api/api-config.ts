// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
const API_URL = "http://3.14.145.118:4000/api/"

const DEV_URL = "http://192.168.10.2:4000/api/"

const Test_Url = "http://192.168.18.11:4000/api/"

// const API_URL = "http://192.168.18.85:4000/api/"

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL,
  timeout: 10000,
}
