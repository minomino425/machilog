import ShopTable from "@/components/shopTable";
import Image from "next/image";
import logo from '../../public/logo.png';

export default async function Index() {
  return (
      <div className="flex-2 w-full flex flex-col gap-20 items-center pt-24">
        <a href="/" className="">
          <Image src={logo} alt="マチログ" width={165} height={35} />
        </a>
        <ShopTable></ShopTable>
      </div>
  );
}
