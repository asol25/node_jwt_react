import axios from "axios";
import { Options, ResponseServer } from "../type";
const sendLoginToServer = async (options : Options): Promise<ResponseServer> => {
    const config = {
        method: options.method,
        url: options.url,
        data: options.sendData
    }

    const sendRequest = await axios.request(config);
    return sendRequest.data;
};

export default sendLoginToServer