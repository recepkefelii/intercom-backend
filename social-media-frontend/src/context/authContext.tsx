import {createContext} from 'react';

export interface IUserInfo{
    user?: {
        id: number,
        username : string,
        email: string,
        ProfilPhotoPath: string
        lastName: string,
        firstName: string,

    } | null
}

const AuthContext = createContext<IUserInfo>({});

export default AuthContext;

