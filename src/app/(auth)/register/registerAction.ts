'use server'
import db from "@/lib/db";
import { hashSync } from "bcrypt";

export default async function registerAction(formData: FormData){
    const entries = Array.from(formData.entries())
    const data = Object.fromEntries(entries)as {
        name: string,
        email: string,
        password: string,
    };
    console.log(data)

    if(!data.name || !data.email || !data.password){
        throw new Error('Você precisa passar todos os dados')
    }
    const user = await db.user.findUnique({
        where:{
            email: data.email,
      
        }
    })
    if(user){

        throw new Error('Já existe') 
    }
    await db.user.create({
        data:{
            name: data.name,
            email: data.email,
            password: hashSync(data.password, 8 ),
        }
    })
}