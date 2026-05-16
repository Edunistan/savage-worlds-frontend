import Header from "../components/Header";
import { getAncestries } from "@/lib/api";
import SearchBar from "../components/SearchBar";
import AncestryList from "./AncestryList";

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const params = await searchParams;
  const q = params?.q || "";

  const ancestries = await getAncestries(q);

  return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0f1c] to-[#05070d] text-gray-200">
        <Header />
  
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-blue-300">Ancestries</h1>
  
          <SearchBar initialValue={q} />
  
          <AncestryList ancestries={ancestries} />
        </div>
      </div>
    );
}
