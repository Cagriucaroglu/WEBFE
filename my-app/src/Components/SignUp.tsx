import React, { useEffect, useState } from 'react'
import { User, UserForUpdate } from '../Statics/User';
import { UserService } from '../Services/UserService';
import { useNavigate } from 'react-router';

export default function SignUp() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [email   , setEmail]    = useState<string>();
    const [isSuccess , setIsSuccess]            = useState<boolean>();
    const [isSubmitted , setIsSubmitted]        = useState<boolean>(false);
    const [isLogging   , setIsLogging]          = useState<boolean>(false);
    const [userId      , setUserId]             = useState<number>();

    useEffect(() => {
        console.log("userName: " , userName);
        if (isLogging) {
            navigate(`/Mainpage` , {state: {userName , email ,password , userId}});
        }
      }, [isLogging, navigate]);

    const handleSubmit = async (event: any) => {
        setIsSubmitted(!isSubmitted);
        event.preventDefault();
            if(!!password && !!userName && !!email){
                
                const userforupdate: User = {
                    customerUserName: userName,
                    email: email,
                    password: password
                }
                try{
                    const response = await UserService.postUser(userforupdate);
                    setIsSuccess(!!response);
                    setIsLogging(true);
                }
                catch(error){
                    console.log('error creating user: ' , error);
                }        
            }
      };

    return (
        <>

            <div className='loginpage'>
                <div className='userandicon'></div>
                {/* <h1>HEALTH CENTER</h1>
         <h2>{pathName === 'Loginstudent' ? 'Student Login' : 'Coach Login'}</h2> */}
                <form className='loginpageform'>

                    {/* <h1>Web Programlama</h1> */}
                    <h2>{"Kayıt Ol"}</h2>

                    <div className='usernameRow row'>
                        <label className='usernameLb lbs'>Kullanıcı Adı:</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className='emailRow row'>
                        <label className='emailLb lbs'>Email:</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={email}
                        />
                    </div>
                    <div className='passwordRow row'>
                        <label className='passwordLb lbs'>Parola:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={password}
                        />
                    </div>
                    <button type="submit" onClick={handleSubmit} className='tohomebtn'>Kayıt Ol</button>

                </form>
                {!!isSubmitted && !!isSuccess ? 
                    "Kayıt Başarılı" :  !!isSubmitted && !isSuccess ? "Bekleniyor" : ""
                }
            </div>
        </>
    )
}
