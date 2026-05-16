import Header from "../components/Header";
import { getHindrances } from "@/lib/api";
import HindranceFilter from "./HindranceFilter";
import HindranceList from "./HindranceList";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const q = params?.q || "";
  const t = params?.t || "";

  const hindrances = await getHindrances(q, t);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1c] to-[#05070d] text-gray-200">
      <Header />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-blue-300">Hindrances</h1>

        <HindranceFilter initialQ={q} initialT={t} />

        <HindranceList hindrances={hindrances} />
      </div>
    </div>
  );
}