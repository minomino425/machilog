import ShopTable from "@/components/shopTable";

export default async function Index() {
  return (
      <div className="flex-2 w-full flex flex-col gap-20 items-center pt-24">
        <ShopTable></ShopTable>
      </div>
  );
}
