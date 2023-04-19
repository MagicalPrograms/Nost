import axios from 'axios'

let nostApi = axios.create({
    baseURL: 'http://intranetahome.gob.mx/NOSTAPI',
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json'
    }
})

nostApi.interceptors.request.use(function(config) {
    return config
})

export default nostApi