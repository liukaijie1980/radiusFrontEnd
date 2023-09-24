
import axios from 'axios'

import store from '@/store'
import { getToken } from '@/utils/auth'

//因为访问的后端这个api的返回值是第3方，格式和其他api不同。
export function getGitVersion() {
    console.log('api getGitVersion');

    const url = process.env.VUE_APP_BASE_API + '/actuator/info';
    const headers = {};

    if (getToken()) {
        headers['x-token'] = getToken();
    }

    return  axios.get(url, { headers: headers })
        .then(response => {
           console.log("response.data",response.data);
           return response.data.git.commit.id;      

           
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

