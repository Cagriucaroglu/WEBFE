import axios, { AxiosResponse } from 'axios';
import { User, UserForUpdate } from '../Statics/User';
const BASE_URL = 'https://localhost:7140/api/Customer/';

export const UserService = {
    getUsers: async (): Promise<UserForUpdate[]> => {
    try{
        const response: AxiosResponse<any> = await axios.get(`${BASE_URL}GetCustomers`);
        return response.data.responseData;

    } catch(error){
        throw new Error('Error fetching users: ' + (error as Error).message)
    }
},
    postUser: async (user: User): Promise<UserForUpdate> => {
        try{
            const response: AxiosResponse<any> = await axios.post(`${BASE_URL}SaveCustomer` , user);
            return response.data.responseData;
        }
        catch(error){
            throw new Error('Error posting user: ' + (error as Error).message);
        }
    },

    updateUsers: async (user: UserForUpdate): Promise<UserForUpdate> => {
        try{
            const response: AxiosResponse<any> = await axios.put(`${BASE_URL}UpdateCustomer` , user)
            return response.data.responseData;
        }
        catch(error){
            throw new Error('Error updating user: ' + (error as Error).message);
        }
    },

    deleteUser: async (id: number): Promise<any> => {
        try{
            const response: AxiosResponse<any> = await axios.delete(`${BASE_URL}UserInfos/DeleteCustomer/${id}`);
            return response.data;
        }
        catch(error){
            throw new Error('Error deleting user: ' + (error as Error).message);
        }
    },

    getCoachById: async (id: number): Promise<UserForUpdate> => {
        try{
            const response: AxiosResponse<any> = await axios.get(`${BASE_URL}coachInfos/GetById/${id}`)
            return response.data.responseData
        }
        catch(error){
            throw new Error('Error getting coach by id: ' + (error as Error).message);
        }
    }


}