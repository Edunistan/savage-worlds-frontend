import Header from "../components/Header";
import { getEdges } from "@/lib/api";
import EdgeFilter from "./EdgeFilter";
import EdgeList from "./EdgeList";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const q = params?.q || "";
  const r = params?.r || "";
  const c = params?.c || "";

  const edges = await getEdges(q, r, c);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1c] to-[#05070d] text-gray-200">
      <Header />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-blue-300">Edges</h1>

        <EdgeFilter initialQ={q} initialR={r} initialC={c} />

        <EdgeList edges={edges} />
      </div>
    </div>
  );
}