'use client';
import { uploadImage } from "../../../supabase/storage/client";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import { useActionState } from "react";
import registerAction from "./registerAction";
import Form from "next/form";

export default function RegisterForm() {
  const styleInput = 'p-1 rounded-md focus:outline-none font-normal text-black';
  const [state, formAction, isPending] = useActionState(registerAction, null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null); // Estado para a imagem
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const newImageUrl = URL.createObjectURL(file);
      setImageUrls([newImageUrl]);
      setImageFile(file); // Armazenando o arquivo da imagem
    }
  };

  const [isUploading, startTransition] = useTransition();

  const handleUploadImage = async () => {
    if (imageFile) {
      const imageUrl = await uploadImage({
        file: imageFile,
        bucket: "findaproffessional",
      });

      if (imageUrl.error) {
        console.error(imageUrl.error);
        return null;
      }
      return imageUrl.imageUrl;
    }
    return null;
  };

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      // Faz o upload da imagem de perfil
      const imageUrl = await handleUploadImage();

      // Adiciona a URL da imagem no formData
      if (imageUrl) {
        formData.append("profileImage", imageUrl);
      }

      // Passa o formData para o formAction dentro do contexto correto
      formAction(formData);
    });
  };

  return (
    <>
      {state?.success === false && (
        <p className="text-red-500">{state?.message}</p>
      )}

      <Form action={formAction} className="flex flex-col font-bold border-indigo-700 gap-[0.2rem]" onSubmit={(e) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário
        const formData = new FormData(e.target as HTMLFormElement);
        handleSubmit(formData); // Envia os dados do formulário com a imagem
      }}>
        <label htmlFor="name">Nome:</label>
        <input name="name" id="name" className={styleInput} type="text" required />

        <label htmlFor="email">Email:</label>
        <input name="email" id="email" className={styleInput} type="email" required />

        <label htmlFor="phone">Telefone:</label>
        <input name="phone" id="phone" className={styleInput} type="text" required />

        <label htmlFor="password">Senha:</label>
        <input name="password" id="password" className={styleInput} type="password" required />

        <label htmlFor="profileImage">Imagem de Perfil:</label>
        <input
          type="file"
          ref={imageInputRef}
          accept="image/*"
          hidden
          onChange={handleImageChange}
          disabled={isPending}
        />
        <button
          type="button"
          className="bg-slate-600 py-2 w-40 rounded-lg"
          onClick={() => imageInputRef.current?.click()}
          disabled={isPending}
        >
          Selecionar Imagem
        </button>

        {imageUrls.length > 0 && (
          <div className="flex gap-4">
            <img src={imageUrls[0]} alt="Imagem de perfil" width={100} height={100} className="rounded-full" />
          </div>
        )}

        <button
          type="submit"
          disabled={isPending || isUploading}
          className="w-full bg-blue-500 p-1 rounded-lg flex items-center justify-center"
        >
          {isPending ? "Registrando..." : "Registrar"}
        </button>
      </Form>
    </>
  );
}
