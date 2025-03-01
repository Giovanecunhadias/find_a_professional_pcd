import { NextResponse } from "next/server";
import db from "@/lib/db";  // Ajuste o caminho para o seu arquivo Prisma

export async function GET() {
  try {
    // Buscar todos os usuários no banco de dados
    const users = await db.user.findMany();

    // Retornar a resposta com os dados dos usuários
    return NextResponse.json(users);
  } catch (error) {
    // Se houver erro, retornar um erro
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json({ message: "Erro ao buscar usuários" }, { status: 500 });
  }
}
