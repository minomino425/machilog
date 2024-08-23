import ShopTable from '@/components/shopTable';
import Image from 'next/image';
import logo from '../../public/logo.png';

export default async function Index() {
  return (
    <div className="flex-2 mt-8 flex w-full flex-col items-center gap-4">
      <a href="/" className="">
        <Image src={logo} alt="マチログ" width={165} height={35} />
      </a>
      <div className="flex max-w-[300px] overflow-hidden rounded-3xl border-2 border-[#090A0A] bg-[#FDFF89] pb-[6px] pt-[6px] text-[10px] tracking-widest">
        <div className="loop-animation flex whitespace-nowrap">
          <p>町田在住酒好きエンジニアによる外食備忘録🍺</p>
          <p>町田在住酒好きエンジニアによる外食備忘録🍺</p>
          <p>町田在住酒好きエンジニアによる外食備忘録🍺</p>
        </div>
        <div className="loop-animation flex whitespace-nowrap">
          <p>町田在住酒好きエンジニアによる外食備忘録🍺</p>
          <p>町田在住酒好きエンジニアによる外食備忘録🍺</p>
          <p>町田在住酒好きエンジニアによる外食備忘録🍺</p>
        </div>
      </div>
      <ShopTable />
    </div>
  );
}
