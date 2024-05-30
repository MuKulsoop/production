import axios from "axios"
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config.js"
import { getAccessToken, getType } from "../utils/accessToken.js"
const API_URL = ""

const axiosInstance = axios.create(
    {
        baseURL: API_URL,
        timeout: 10000,
        headers: {
            "Accept": "application/json, form-data", 
            "Content-Type": "application/json"
        }
    }
)

axiosInstance.interceptors.request.use(
    function ( config ){
        if( config.TYPE.params){
            config.params = config.TYPE.params
        } else if ( config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query
        }
        return config;
    },
    function ( error ) {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function ( response ) {
        return processResponse(response)
    },
    function ( error ) {
        return Promise.reject(processError(error))
    }
)

const processResponse = (response) => {
    if( response?.status === 200) {
        return { isSuccess : true , data : response.data}
    } else {
        return {
            isFailure: true,
            status : response?.status,
            msg : response?.msg,
            code : response?.code
        }
    }
}

const processError = (error) => {
    if(error.response){
        console.log("Error in response")
        return {
            isError : true,
            msg : API_NOTIFICATION_MESSAGES.responsefailure,
            code : error.status.code
        }
    }
    else if(error.request){
        console.log("Error in request", error)
        return {
            isError : true,
            msg: API_NOTIFICATION_MESSAGES.requestfailure,
            code : ""
        }
    }
    else{
        console.log("Error in network", error)
        return {
            isError: true,
            msg : API_NOTIFICATION_MESSAGES.networderror,
            code : ""
        }
    }
}



const API = {}

for( const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body/*, showUploadProgress, showDownloadProgress*/) => 
    axiosInstance({
        method: value.method,
        url: value.url,
        responseType: value.responseType,
        data: value.method === 'DELETE' ? {} : body,
        headers: {
            authorization: getAccessToken()
        },
        TYPE: getType(value, body)
    })
}
export { API }
// For Upload progress and download progress
// Useful in making loader
// onUploadProgress: function(progressEvent) {
//     if(showUploadProgress){
//         let precentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//         showUploadProgress(precentageCompleted)
//     }
// },
// onDownloadProgress: function(progressEvent) {
//     if(showDownloadProgress){
//         let precentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//         showDownloadProgress(precentageCompleted)
//     }
// }
