import Header from "../components/Header";
import { getSkills } from "@/lib/api";
import SkillsList from "./SkillsList";
import SkillsFilter from "./SkillsFilter";

export default async function Page({ searchParams }) {
    const params = await searchParams;
    const q = params?.q || "";
    const l = params?.l || "";
    const c = params?.c || "";

    const skills = await getSkills(q, l, c);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0f1c] to-[#05070d] text-gray-200">
          <Header />
    
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-blue-300">Skills</h1>

            <SkillsFilter initialQ={q} initialL={l} initialC={c} />

            <SkillsList skills={skills} />
          </div>
        </div>
    );
}