"use client"
import {useState} from 'react';


export default function Cadastro(){
    const [nextStep, setNextStep] = useState(1);
    const [fileNames, setFileNames] = useState<string[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const newFiles = Array.from(event.target.files).map(file => file.name);
            setFileNames(prevFiles => [...prevFiles, ...newFiles]); // Adiciona novos arquivos sem apagar os antigos
        }
    };
    const inputStyle =  'p-1 rounded-md font-normal text-black focus:outline-none';
    const placeholdersSet = {
        "telefone": '(00) 00000-0000',
        "email": 'example@gmail.com',
        "name": 'Digite seu nome',
        "agree": ['Barbeiro PcD', 'Advogado PcD', 'Psicologo PcD', 'Psquiatra PcD'],
    }
    const divForms = 'flex flex-col font-bold text-black p-4 gap-4 w-[30vw] '
    return(
        <div className='hidden lg:flex w-full  justify-center items-center'>
            <form action="" className='w-full flex  justify-center items-center flex-col p-40'>
                {nextStep === 1 && (
                    <div className={divForms}>
                        <label htmlFor="nome">Nome</label>
                        <input type="text" placeholder={placeholdersSet.name}  className={inputStyle} autoComplete='name'/>
                        <label htmlFor="email">Email: </label>
                        <input type="email" placeholder={placeholdersSet.email
                        } className={inputStyle} autoComplete='email'/>
                        <label htmlFor="contact">Contato:</label>
                        <input type="tel" placeholder={placeholdersSet.telefone} className={inputStyle}  autoComplete='tel'/>
                        <button type='button' className='bg-green-500 text-white p-2 rounded-md  font-bold' onClick={()=>{setNextStep(2)}}>Continuar</button>
                    </div>
                )}
                {nextStep === 2 && (
                    <div className={`${divForms}`}>
                        <label htmlFor="">Sua Especialidade:</label>
                        <div className='text-black w-full'>
                            
                            <select className='w-full focus:outline-none p-2 rounded-md' name="" id="">
                                {placeholdersSet.agree.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex gap-2 w-fit'>
                            <div className='flex flex-col w-full '>
                            <label htmlFor="">Certificados:</label>
                            <input type="file" onChange={handleFileChange} id="actual-btn" hidden/>
                            <label className=' text-white rounded-md p-2 cursor-pointer inline-block bg-blue-700 w-fit' htmlFor="actual-btn">Selecione um arquivo</label>
                            </div>
                            
                            {fileNames.length > 0 ? (
                                    <ul className="text-black text-sm">
                                        {fileNames.map((fileName, index) => (
                                            <li key={index} className="text-black">📄 {fileName}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className="text-red-700">Nenhum arquivo selecionado</span>
                                )} 
                        </div>
                        
                        
                    </div>
                )}
                
            </form>
            
        </div>
    ) 
}