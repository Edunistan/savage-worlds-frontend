export const dynamic = "force-dynamic";
import Header from "../components/Header";
import { getBackgrounds } from "@/lib/api";
import ArcaneBackgroundList from "./BackgroundsList";

export default async function Page({ }) {

  const backgrounds = await getBackgrounds();

  return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0f1c] to-[#05070d] text-gray-200">
        <Header />
  
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-blue-300">Arcane Backgrounds</h1>
  
          <ArcaneBackgroundList backgrounds={backgrounds} />
        </div>
      </div>
    );
}

export const revalidate = 0;
