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

export async function getBackgrounds() {
  let url = `${API_URL}/powers/backgrounds`;

  console.log("url:", url);

  const res = await fetch(url);
  return res.json();
}

export async function getPowers(q, r, pp) {
  let url = `${API_URL}/powers`;

  const params = [];

  if (q) params.push(`q=${encodeURIComponent(q)}`);
  if (r) params.push(`r=${encodeURIComponent(r)}`);
  if (pp) params.push(`pp=${encodeURIComponent(pp)}`);

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  console.log("url:", url);

  const res = await fetch(url);
  return res.json();
}

export async function getPower(id: string | number) {
  const url = `api/powers/${id}`
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

export async function getSkills(q, l, c) {
  let url = `${API_URL}/skills`;

  const params = [];

  if (q) params.push(`q=${encodeURIComponent(q)}`);
  if (l) params.push(`l=${encodeURIComponent(l)}`);
  if (c) params.push(`core=${encodeURIComponent(c)}`);

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  console.log("url:", url);

  const res = await fetch(url);
  return res.json();
}

export async function getGear(q, t, max_c, max_w) {
  let url = `${API_URL}/gear`;

  const params = [];

  if (q) params.push(`q=${encodeURIComponent(q)}`);
  if (t) params.push(`t=${encodeURIComponent(t)}`);
  if (max_c) params.push(`max_c=${encodeURIComponent(max_c)}`);
  if (max_w) params.push(`max_w=${encodeURIComponent(max_w)}`);

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  console.log("url:", url);

  const res = await fetch(url);
  return res.json();
}

export async function getItem(id: string | number) {
  const url = `api/gear/${id}`
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error desconocido");
  }

  return data;
}

