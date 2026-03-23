import Header from "../components/Header";
import { getGear } from "@/lib/api";
import GearList from "./GearList";
import GearFilter from "./GearFilter";

export default async function Page({ searchParams }) {
    const params = await searchParams;
    const q = params?.q || "";
    const t = params?.t || "";
    const max_c = params?.max_c || "";
    const max_w = params?.max_w || "";

    const gear = await getGear(q, t, max_c, max_w);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0f1c] to-[#05070d] text-gray-200">
            <Header />

            <div className="p-6">
                <h1 className="text-3xl font-bold mb-4 text-blue-300">Gear</h1>

                <GearFilter initialQ={q} initialT={t} initialMaxC={max_c} initialMaxW={max_w} />

                <GearList gear={gear} />
            </div>
        </div>
    );
}