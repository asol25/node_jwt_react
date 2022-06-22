export interface Options {
    method: string;
    url: string;
    sendData: Object;
}

export interface ResponseServer {
    fullname: string,
    username: string,
    password: string,
    token: string,
    _id: string;
}