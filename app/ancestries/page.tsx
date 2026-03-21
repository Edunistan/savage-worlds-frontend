import { getAncestries } from "@/lib/api";
import AncestriesClient from "./AncestriesClient";

export default async function Page() {
  const ancestries = await getAncestries();

  return <AncestriesClient ancestries={ancestries} />;
}