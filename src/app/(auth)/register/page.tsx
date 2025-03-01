import Form from 'next/form'
import registerAction from './registerAction';
export default function Register() {
    const styleInput = 'p-1 rounded-md focus:outline-none font-normal';

    return (
        <div className="flex w-full items-center justify-center h-screen">
            <div className="bg-green-500 w-fit h-fit p-6 rounded-lg shadow-md">
                <Form action={registerAction} className="flex flex-col font-bold border-indigo-700 gap-[0.2rem]">
                    <label htmlFor="name">Nome:</label>
                    <input name="name" id="name" className={styleInput} type="text" required />

                    <label htmlFor="email">Email:</label>
                    <input name="email" id="email" className={styleInput} type="email" required />

                    <label htmlFor="password">Senha:</label>
                    <input name="password" id="password" className={styleInput} minLength={8} type="password" required />

                    <button type="submit" className="w-full bg-blue-500 p-1 rounded-lg flex items-center justify-center">Registrar</button>
                </Form>
            </div>
        </div>
    );
}
