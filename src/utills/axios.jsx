import axios from "axios";


const axiosRequest = axios.create({
  baseURL: ``,
  method: 'get',
  headers: {
    "Content-Type": "application/json",
    'Authorization': '',
    'Accept': 'application/json'
  },
  transformResponse: [function (data) {
    return JSON.parse(data)
  }]
});
export {axiosRequest};
