'use server'
import db from "@/lib/db";
import { hashSync } from "bcrypt";
import {redirect} from 'next/navigation'


export default async function registerAction(_prevState: any, formData: FormData){
    
      
    const entries = Array.from(formData.entries())
    const data = Object.fromEntries(entries)as {
        name: string,
        email: string,
        password: string,
        phone: string, 
    };
    console.log(data)


    if(!data.name || !data.email || !data.password){
        return{
        error: 'Preencha todos os campos',
        success:false,
        }
    }
    const user = await db.user.findUnique({
        where:{
            email: data.email,
            phone: data.phone,
        },
    })
    if(user){
        return{
            message:'Este usuário já existe',
            success: false,
        }
        
    }
    await db.user.create({
        data:{
            name: data.name,
            email: data.email,
            password: hashSync(data.password, 8 ),
            phone: data.phone,
        }
    })
    return redirect('/login');
}