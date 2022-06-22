import React from 'react';
import sendLoginToServer from '../../assets/api/sendRequestLogin';
import { setAccessToken, getAccessToken } from '../../accessToken';
import { Options, ResponseServer } from '../../assets/type';
import { Link } from 'react-router-dom';
interface Props {
};

export const Main: React.FC<Props> = (props: Props) => {
    const [fullname, setFullName] = React.useState("Phan Thanh Ngân");
    const [username, setUserName] = React.useState("conzit06");
    const [password, setPassword] = React.useState("1235678");

    const handleLogin = async (option: { fullname: string, username: string; password: string }): Promise<ResponseServer> => {
        const options: Options = {
            method: 'POST',
            url: 'http://localhost:4040/api/authentication/login',
            sendData: {
                fullname: option.fullname,
                username: option.username,
                password: option.password
            }
        }
        const response: ResponseServer = await sendLoginToServer(options);
        return response;
    };
    return (
        <main>
            <section>
                <form
                    onSubmit={
                        async e => {
                            e.preventDefault();
                            console.log("form submission success");
                            const response: ResponseServer = await handleLogin({
                                fullname,
                                username,
                                password
                            });

                            if (response) {
                                console.log(response);
                                setAccessToken(response.token);
                                <Link to="/about"></Link>
                            }
                        }}
                >
                    <div>
                        <input
                            type="text"
                            placeholder={fullname}
                            onChange={e => {
                                setFullName(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder={username}
                            onChange={e => {
                                setUserName(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder={password}
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </section>
        </main >
    )
};

