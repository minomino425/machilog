import ShopTable from "@/components/shopTable";
import Image from "next/image";
import logo from '../../public/logo.png';

export default async function Index() {
  return (
      <div className="flex-2 w-full flex flex-col gap-4 items-center mt-8">
        <a href="/" className="">
          <Image src={logo} alt="マチログ" width={165} height={35} />
        </a>
        <div className="flex text-[10px] max-w-[300px] overflow-hidden bg-[#FDFF89] rounded-3xl border-2 border-[#090A0A] pt-[6px] pb-[6px] tracking-widest">
          <div className="flex whitespace-nowrap loop-animation">
            <p>町田在住酒好きエンジニアによる外食備忘録🍺</p>
            <p>町田在住酒好きエンジニアによる外食備忘録🍺</p>
            <p>町田在住酒好きエンジニアによる外食備忘録🍺</p>
          </div>
          <div className="flex whitespace-nowrap loop-animation">
            <p>町田在住酒好きエンジニアによる外食備忘録🍺</p>
            <p>町田在住酒好きエンジニアによる外食備忘録🍺</p>
            <p>町田在住酒好きエンジニアによる外食備忘録🍺</p>
          </div>
        </div>
        <ShopTable></ShopTable>
      </div>
  );
}
