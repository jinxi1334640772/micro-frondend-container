import axios from "axios";
console.log('apiIndex.js',process.env.baseUrl)
const request = axios.create({
    baseURL: process.env.baseUrl
});
// request.interceptors.request.use(config=>{
//   console.log('request config',config)
// },error=>{
//   console.log('request error',error)
// })
request.interceptors.response.use(response=>{
  if (response.status === 200) {
    return response.data;
  } else {
    console.log('response:', response)
  }
},error=>{
  console.log('response error',error)
})

export default request;