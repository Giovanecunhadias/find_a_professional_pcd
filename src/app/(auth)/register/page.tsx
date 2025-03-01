import { auth } from "@/auth";
import RegisterForm from "./register-form";
import { redirect } from "next/navigation";
import HomePage from "./upload-form";
export default async function Register() {
    const session = await auth();
    if(session) return redirect('/');
    return (
        <div className="flex w-full items-center justify-center h-screen">
            <div className="bg-green-500 w-fit h-fit p-6 rounded-lg shadow-md">
                <RegisterForm/>
            </div>
        </div>
    );
}
