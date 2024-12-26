import axios  from "axios";
import router from "./router";
import ElementPlus, {ElMessage} from 'element-plus'

axios.defaults.baseURL = "http://localhost:8081";
const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})
request.interceptors.request.use(
    config => {
        config.headers['Authorization'] = localStorage.getItem('token')
        return config
    }
)

request.interceptors.response.use(response => {
    let res = response.data;
    console.log('=========================1')
    console.log(response)
    if (res.code === 200) {
        return response;
    }else {
        ElMessage.error(res.msg? res.msg : '系统异常！')
        return Promise.reject(res.msg)
    }
},
    error => {
        console.log('=========================2')
        console.log(error)
        if(error.response.data) {
            error.message = error.response.data.msg
        }
        if(error.response.status === 401) {
            // router.push("/login").then(r => {})
            this.$router.push('/login')
        }
        ElMessage.error(error.message)
        return Promise.reject(error)
    })

export default request