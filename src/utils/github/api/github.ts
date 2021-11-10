
const axios = require('axios');

/**
 * Get public repositories from github api 
 * @param user The user to get the repositories from
 * @returns  A promise that resolves to the repositories
 */
export async function getUserRepositories(user : string) : Promise<any>  {
    const response = await axios({
        proxy: undefined,
        method : 'get',    
        url : 'https://api.github.com/users/' + user + '/repos'
    });
    return response;
}