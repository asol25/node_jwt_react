import React, { useEffect } from 'react'
import { Options, ResponseServer } from '../../assets/type';
import sendLoginToServer from '../../assets/api/sendRequestLogin';
export const Register: React.FC = () => {
    const [fullname, setFullName] = React.useState("Phan Thanh Ngân");
    const [username, setUserName] = React.useState("conzit06");
    const [password, setPassword] = React.useState("1235678");

    const handleRegister = async (option: { fullname: string, username: string; password: string }) => {
        const options: Options = {
            method: 'POST',
            url: 'http://localhost:4040/api/authentication/register',
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
        <div className='container'>
            <div>
                <main>
                    <section>
                        <form
                            onSubmit={
                                async e => {
                                    e.preventDefault();
                                    console.log("form submission success");

                                    const response = await handleRegister({
                                        fullname,
                                        username,
                                        password
                                    })

                                    console.log(response);
                                }}
                        >
                            <div>
                                <input
                                    type="text"
                                    placeholder="fullname"
                                    onChange={e => {
                                        setFullName(e.target.value);
                                    }}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="username"
                                    onChange={e => {
                                        setUserName(e.target.value);
                                    }}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="password"
                                    onChange={e => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <button type="submit">Register</button>
                        </form>
                    </section>
                </main >
            </div>
        </div>
    )
}

