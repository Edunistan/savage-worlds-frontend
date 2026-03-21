const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getAncestries() {
  const res = await fetch(`${API_URL}/ancestries`);
  return res.json();
}

export async function getAncestry(id: string | number) {
  const res = await fetch(`api/ancestries/${id}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error desconocido");
  }

  return data;
}