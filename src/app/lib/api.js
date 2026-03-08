import axios from "axios";


console.log("process.env.NEXT_PUBLIC_LOCAL_URL")
console.log("process.env.NEXT_PUBLIC_LOCAL_URL")
console.log(process.env.NEXT_PUBLIC_LOCAL_URL)
console.log(process.env.NEXT_PUBLIC_LOCAL_URL)
console.log(process.env.NEXT_PUBLIC_LOCAL_URL)
console.log("process.env.NEXT_PUBLIC_LOCAL_URL")

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_LOCAL_URL}/api`,
});

export default api;