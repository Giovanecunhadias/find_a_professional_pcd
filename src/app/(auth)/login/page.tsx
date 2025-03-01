import { auth } from "@/auth";
import LoginForm from "./login-form";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await auth();
        if (session) {
            redirect('/');
        }
    
    return (
        <div className="flex w-full items-center justify-center h-screen">
            <div className="bg-green-500 w-fit h-fit p-6 rounded-lg shadow-md">
               <LoginForm></LoginForm>
            </div>
        </div>
    );
}