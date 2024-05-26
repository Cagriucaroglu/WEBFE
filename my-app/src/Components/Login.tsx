import React, { useEffect, useState } from 'react'
import './Login.css';
import { UserService } from '../Services/UserService';
import { User, UserForUpdate } from '../Statics/User';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userId  , setUserId]   = useState<number>();  
    const [isLogging , setIsLogging] = useState<boolean>(false);
    const location = useLocation();
    const [email , setEmail] = useState<string>();
    
    useEffect(() => {
        if (isLogging) {
            navigate(`/Mainpage` , {state: {username , email ,password , userId}});
        }
      }, [isLogging, navigate]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
       
            try{
                const response = await UserService.getUsers();
                if(response.length > 0){
                    const canItlog = IsPermittedToLogU(response);
                    setIsLogging(canItlog);
                    console.log(canItlog,"canıtlog")
                }
                console.log(response , "our response");
            }
            catch(error){
                console.log('error getting users: ' , error);
            }        
      };

    const IsPermittedToLogU = (userdatas: UserForUpdate[]):boolean => {
        const matchedUser = userdatas.find((val) => val.customerUserName === username && val.password === password);
        if(matchedUser){  
            setUserId(matchedUser.customerId);
            setEmail(matchedUser.email);
            return true;
        }
        return false;
    }

  return (
    <div className='loginpage'>
         {/* <h1>HEALTH CENTER</h1>
         <h2>{pathName === 'Loginstudent' ? 'Student Login' : 'Coach Login'}</h2> */}
        <form className='loginpageform'>
          
        <h1>Web Programlama</h1>
        <h2>{"Giriş Yap"}</h2>

        <div className='usernameRow row'>
          <label className='usernameLb lbs'>Kullanıcı Adı:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='passwordRow row'>
          <label className='passwordLb lbs'>Parola:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSubmit} className='tohomebtn'>Giriş Yap</button>
        
      </form>
    </div>
  )
}
