import {createContext} from 'react';

const AuthContext = createContext(null) as any

let data = {} as any


const Provider = ({children}:any) => {

    return (
        <AuthContext.Provider value={""}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;

