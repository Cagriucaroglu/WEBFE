import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import './MainPage.css'
import { UserService } from '../Services/UserService';
import { UserForUpdate } from '../Statics/User';

export default function MainPage() {
    const location = useLocation();
    const { username, email , password , userId} = location.state || {};
    const [updatedUserName, setUpdatedUserName] = useState<string>("");
    const [updatedPassword, setUpdatedPassword] = useState<string>();
    const [updatedEmail   , setUpdatedEmail]    = useState<string>();
    const [isSuccess , setIsSuccess]            = useState<boolean>();
    const [isSubmitted , setIsSubmitted]        = useState<boolean>(false);
    const [userID   , setUserID]                = useState<number>();

    useEffect(() => {
        if(!userId){
            findIdFn();
        }
    },[])

    const findIdFn = async () => {
        const response = await UserService.getUsers();
        const user = response.find(r => r.customerUserName == username && r.password == password);
        if(!!user){
            setUserID(user.customerId);
        }
    }

    const handleSubmit = async (event: any) => {
        setIsSubmitted(!isSubmitted);
        event.preventDefault();
            if(!!updatedPassword && !!updatedPassword && !!updatedEmail){
                const userforupdate: UserForUpdate = {
                    customerId: !!userId ? userId : userID,
                    customerUserName: updatedUserName,
                    email: updatedEmail,
                    password: updatedPassword
                }
                try{
                    const response = await UserService.updateUsers(userforupdate);
                    setIsSuccess(!!response);
                }
                catch(error){
                    console.log('error getting users: ' , error);
                }        
            }
      };

    return (
        <>

            <div className='loginpage'>
                <div className='userandicon'>{username}<AccountCircleRoundedIcon className='icon'/></div>
                {/* <h1>HEALTH CENTER</h1>
         <h2>{pathName === 'Loginstudent' ? 'Student Login' : 'Coach Login'}</h2> */}
                <form className='loginpageform'>

                    <h1>Selam {username}</h1>
                    <h2>{"Kullanıcı Bilgilerini Güncelle"}</h2>

                    <div className='usernameRow row'>
                        <label className='usernameLb lbs'>Kullanıcı Adı:</label>
                        <input
                            type="text"
                            value={updatedUserName}
                            onChange={(e) => setUpdatedUserName(e.target.value)}
                            placeholder={username}
                        />
                    </div>
                    <div className='emailRow row'>
                        <label className='emailLb lbs'>Email:</label>
                        <input
                            type="text"
                            value={updatedEmail}
                            onChange={(e) => setUpdatedEmail(e.target.value)}
                            placeholder={email}
                        />
                    </div>
                    <div className='passwordRow row'>
                        <label className='passwordLb lbs'>Parola:</label>
                        <input
                            type="password"
                            value={updatedPassword}
                            onChange={(e) => setUpdatedPassword(e.target.value)}
                            placeholder={password}
                        />
                    </div>
                    <button type="submit" onClick={handleSubmit} className='tohomebtn'>Giriş Yap</button>

                </form>
                {!!isSubmitted && !!isSuccess ? 
                    "Güncelleme Başarılı" :  !!isSubmitted && !isSuccess ? "Bekleniyor" : ""
                }
            </div>
        </>
    )
}
