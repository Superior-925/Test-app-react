import axios from "axios";
import {configDev} from "../environment/environment.dev"

class CardApi {
    async cardPay(values) {
        console.log(values);
        const response = await axios.post(`http://${configDev.hostPort}/payment`, values, null);
        return response;
    }
}

export default new CardApi();
