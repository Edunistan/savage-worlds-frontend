const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getAncestries(q) {
  const url = q 
    ? `${API_URL}/ancestries?q=${encodeURIComponent(q)}`
    : `${API_URL}/ancestries`;

  console.log("url:", url)
  const res = await fetch(url);
  return res.json();
}

export async function getAncestry(id: string | number) {
  const url = `api/ancestries/${id}`
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error desconocido");
  }

  return data;
}

export async function getEdges(q, r, c) {
  let url = `${API_URL}/edges`;

  const params = [];

  if (q) params.push(`q=${encodeURIComponent(q)}`);
  if (r) params.push(`r=${encodeURIComponent(r)}`);
  if (c) params.push(`c=${encodeURIComponent(c)}`);

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  console.log("url:", url);

  const res = await fetch(url);
  return res.json();
}

export async function getHindrances(q, t) {
  let url = `${API_URL}/hindrances`;

  const params = [];

  if (q) params.push(`q=${encodeURIComponent(q)}`);
  if (t) params.push(`t=${encodeURIComponent(t)}`);

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  console.log("url:", url);

  const res = await fetch(url);
  return res.json();
}