import axios from 'axios'

const API_KEY = '06c71e51087a5c7ba87b36ad67a45912';
const API_URL = 'https://wozmx9dh26.execute-api.eu-west-1.amazonaws.com/api/holidays'
export default {
    getHolidays (dateRangeStart: string, dateRangeEnd: string) {
        const data = {
            "apiKey": API_KEY,
            "startDate": dateRangeStart,
            "endDate": dateRangeEnd
        };

        // It feels weird making a POST request to fetch data.
        // However, the API expects it as JSON body, not query string format
        // and seems like axios doesn't play nice with GET + JSON Body,
        // although technically possible. Maybe fetch would work with GET + Request Body?
        // Either way - this does the trick for this API.

        const config = {
            method: 'POST', // Would greatly prefer a GET
            url: API_URL,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000,
            data: data
        };

        return axios(config);
    }
}
