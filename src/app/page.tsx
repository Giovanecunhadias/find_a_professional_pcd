import { auth } from "@/auth";
import Nav from "@/components/ui/Nav";
import { redirect } from "next/navigation";
import db from "@/lib/db";

;

export default async function Home() {
  const session = await auth();
  const userName = session?.user?.name;

  const Phone = async function Phone() {
    const user = await db.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });
    return user?.phone;
  };

  const Professionals = async function Professionals() {
    const professional = await db.user.findMany();
    return professional;
  };

  return (
    <div className="flex flex-col items-center justify-center text-black ">
      <Nav />
      {userName && <h1 className="text-xl font-bold">Seja bem-vindo, {await Phone()}</h1>}
      <ul className="w-full flex flex-col items-center gap-4 pt-4">
        {await Professionals().then((data) =>
          data.map((prof) => (
            <div
              key={prof.id}
              className="bg-white shadow-md rounded-md flex flex-col text-start items-center w-80 p-6"
            >
              <p className="font-semibold">{prof.name}</p>
              <img
                className="rounded-full w-24 h-24 mt-4"
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <p className="mt-2 flex justify-start w-fit text-gray-700">Email para contato: {prof.email}</p>
              <p className="mt-2 text-gray-700">
                Telefone para contato:{" "}
                <a
                  href={`https://api.whatsapp.com/send/?phone=55${prof.phone}&text=Desejo+Atendimento&type=phone_number&app_absent=0`}
                >
                  <button className="bg-green-500 text-white rounded-md px-4 py-2 mt-2">
                    Desejo Atendimento
                  </button>
                </a>
              </p>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}
