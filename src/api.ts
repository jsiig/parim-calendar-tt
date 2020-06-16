import axios from 'axios'

const API_KEY = '06c71e51087a5c7ba87b36ad67a45912'

const api = axios.create({
    baseURL: 'https://wozmx9dh26.execute-api.eu-west-1.amazonaws.com/api/',
    timeout: 5000,
    params: {
        "apiKey": API_KEY
    }
})

export default {
    async getHolidays (dateRangeStart: string, dateRangeEnd: string) {
        return await api.get('/holidays', {
            params: {
                "startDate": dateRangeStart,
                "endDate": dateRangeEnd
            }
        })
    }
}
