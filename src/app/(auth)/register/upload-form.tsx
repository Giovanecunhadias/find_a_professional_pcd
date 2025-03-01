"use client";
import { uploadImage } from "../../../supabase/storage/client";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import { convertBlobUrlToFile } from "@/lib/utils";
import Image from "next/image";

function HomePage() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));

      setImageUrls([...imageUrls, ...newImageUrls]);
    }
  };
  {/*DATABASE_URL = 'postgresql://postgres:lwT3BVVyjTZmyyf6@heatedly-growing-angler.data-1.use1.tembo.io:5432/postgres'


NEXT_PUBLIC_SUPABASE_URL='https://vllmsvnbnsobytqbcbrm.supabase.co'
NEXT_PUBLIC_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsbG1zdm5ibnNvYnl0cWJjYnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MzA3MjAsImV4cCI6MjA1NjQwNjcyMH0.vfsxCXfHzYLuEVtKYolSDW48HhGIVgEfrY0j0P41DF8'
*/}

  const [isPending, startTransition] = useTransition();

  const handleClickUploadImagesButton = async () => {
    startTransition(async () => {
      let urls = [];
      for (const url of imageUrls) {
        const imageFile = await convertBlobUrlToFile(url);

        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: "findaproffessional",
        });

        
        if (error) {
            console.log(error);
            return;
          }
          

        urls.push(imageUrl);
      }

      console.log(urls);
      setImageUrls([]);
    });
  };

  return (
    <div className="bg-slate-500 min-h-screen flex justify-center items-center flex-col gap-8">
      

      <input
        type="file"
        hidden
        multiple
        ref={imageInputRef}
        onChange={handleImageChange}
        disabled={isPending}
      />

      <button
        className="bg-slate-600 py-2 w-40 rounded-lg"
        onClick={() => imageInputRef.current?.click()}
        disabled={isPending}
      >
        Select Images
      </button>

      <div className="flex gap-4">
        {imageUrls.map((url, index) => (
          <Image
            key={url}
            src={url}
            width={300}
            height={300}
            alt={`img-${index}`}
          />
        ))}
      </div>

      <button
        onClick={handleClickUploadImagesButton}
        className="bg-slate-600 py-2 w-40 rounded-lg"
        disabled={isPending}
      >
        {isPending ? "Uploading..." : "Upload Images"}
      </button>
    </div>
  );
}

export default HomePage;