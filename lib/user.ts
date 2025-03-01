
import { compare, compareSync } from "bcrypt";
import db from "./db";
type User= {
    name: string;
    phone: string;
    password?: string;
    email: string;
    
}
export async function findUserByCredentials(email: string, password: string): Promise<User | null> {
    const user = await db.user.findFirst({
        where:{
            email: email,
            
        }
    })
    if(!user){
        return null;
    }
    const passwordMatch = compareSync(password, user.password)
    if(passwordMatch){
        return {
            email: user.email, name: user.name, phone: user.phone ?? ''};
    }
    return null
}
