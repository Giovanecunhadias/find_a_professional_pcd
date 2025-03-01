"use client"

export async function convertBlobUrlToFile(blobUrl: string): Promise<File> {
  if (typeof window !== "undefined") {
    // Apenas executa no cliente
    return new Promise((resolve, reject) => {
      fetch(blobUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], "profile-picture", { type: blob.type });
          resolve(file);
        })
        .catch((error) => reject(error));
    });
  } else {
    throw new Error("Esta função deve ser executada no lado do cliente");
  }
}
