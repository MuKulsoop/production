

export const API_NOTIFICATION_MESSAGES = {
    loading : {
        title : "Loading",
        message : "Data is being loading"
    },
    success : {
        title : "Success",
        message : "The Data is successfully fetched"
    },
    responsefailure : {
        title : "Error",
        message : "Error while fetching response"
    },
    requestfailure : {
        title : "Error",
        message : "Error while parsing request"
    },
    networderror : {
        title : "Error",
        message : "Unable to connect with server. Please check internet connectivity and try again later."
    }
}


// sample req : { url:"/", method: "POST/GET/PUT/DELETE", params: true/false, query: true/false}
export const SERVICE_URLS = {
    userSignUp : { url: '/signUp', method: 'POST'} ,
    userLogin : { url : '/login', method : 'POST'},
    uploadFile : { url : '/file/upload', method : 'POST'},
    createPost : { url : 'create', method : 'POST'},
    getAllPosts : { url : 'posts', method : 'GET', params: true },
    getPostById : { url : 'post', method: 'GET', query: true },
    updatePost: { url : 'update', method: 'PUT', query: true},
    deletePost: { url : 'delete', method: 'DELETE', query: true},
    newcomment: { url : '/comment/new', method: 'POST' },
    getAllComments: { url: '/comments', method: 'GET', query: true},
    deleteComment: { url: 'comment/delete', method: 'DELETE', query: true }
}

