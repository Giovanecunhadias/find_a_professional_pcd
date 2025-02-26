import Link from "next/link";

export default function Nav() {
    const linksLeft = ["Home", "Sobre nós", "Contato"];
    const linksRight = ["Login", "Cadastro"];

    return (
        <div className="hidden w-full h-20 text-black font-bold items-center bg-[#fff] md:flex px-8">
            <div className="flex w-full items-center justify-between">
                {/* Links à esquerda */}
                <ul className="flex gap-4">
                    {linksLeft.map((link) => {
                        const href = link === "Home" ? "/" : link === "Sobre nós" ? "/about" : `/${link.toLowerCase()}`;
                        return (
                            <Link key={link} href={href}>
                                {link}
                            </Link>
                        );
                    })}
                </ul>

                {/* Barra de pesquisa no centro */}
                <div className="flex-grow flex justify-center">
                    <input
                        type="search"
                        className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none"
                        placeholder="Encontre um profissional aqui"
                    />
                </div>

                {/* Links à direita */}
                <ul className="flex gap-4">
                    {linksRight.map((link) => {
                        const href = `/${link.toLowerCase()}`;
                        return (
                            <Link key={link} href={href}>
                                {link}
                            </Link>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
