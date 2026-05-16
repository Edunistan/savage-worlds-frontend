import Header from "../components/Header";
import { getPowers } from "@/lib/api";
import PowerFilter from "./PowerFilter";
import PowerList from "./PowerList";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const q = params?.q || "";
  const r = params?.r || "";
  const pp = params?.pp || "";

  const powers = await getPowers(q, r, pp);

  return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0f1c] to-[#05070d] text-gray-200">
        <Header />
  
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-blue-300">Powers</h1>
  
          <PowerFilter initialQ={q} initialR={r} initialPP={pp}/>
  
          <PowerList powers={powers} />
        </div>
      </div>
    );
}