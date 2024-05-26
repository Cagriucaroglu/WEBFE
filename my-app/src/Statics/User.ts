export interface User {
    customerUserName: string;    
    email: string; 
    password: string;
}

export interface UserForUpdate extends User {
   customerId: number;
}