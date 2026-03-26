const BASE_URL = "https://valorant-api.com/v1";

export async function getAgents() {
  const res = await fetch(`${BASE_URL}/agents?isPlayableCharacter=true&language=th-TH`);
  if (!res.ok) throw new Error("Failed to fetch agents");
  const data = await res.json();
  return data.data;
}

export async function getBundles() {
  const res = await fetch(`${BASE_URL}/bundles?language=th-TH`);
  if (!res.ok) throw new Error("Failed to fetch bundles");
  const data = await res.json();
  return data.data;
}

export async function getWeaponSkins() {
  const res = await fetch(`${BASE_URL}/weapons/skins?language=th-TH`);
  if (!res.ok) throw new Error("Failed to fetch weapon skins");
  const data = await res.json();
  return data.data;
}

export async function getWeapons() {
  const res = await fetch(`${BASE_URL}/weapons?language=th-TH`);
  if (!res.ok) throw new Error("Failed to fetch weapons");
  const data = await res.json();
  return data.data;
}

export async function getWeapon(uuid: string) {
  const res = await fetch(`${BASE_URL}/weapons/${uuid}?language=th-TH`);
  if (!res.ok) throw new Error("Failed to fetch weapon");
  const data = await res.json();
  return data.data;
}

export async function getMaps() {
  const res = await fetch(`${BASE_URL}/maps?language=th-TH`);
  if (!res.ok) throw new Error("Failed to fetch maps");
  const data = await res.json();
  return data.data;
}

export async function getMap(uuid: string) {
  const res = await fetch(`${BASE_URL}/maps/${uuid}?language=th-TH`);
  if (!res.ok) throw new Error("Failed to fetch map");
  const data = await res.json();
  return data.data;
}

export async function getRanks() {
  const res = await fetch(`${BASE_URL}/competitivetiers?language=th-TH`);
  if (!res.ok) throw new Error("Failed to fetch ranks");
  const data = await res.json();
  // We want the latest competitive tier list (usually the last one in the array)
  return data.data[data.data.length - 1];
}

export async function getGameModes() {
  const res = await fetch(`${BASE_URL}/gamemodes?language=th-TH`);
  if (!res.ok) throw new Error("Failed to fetch game modes");
  const data = await res.json();
  return data.data;
}

export async function getEvents() {
  const res = await fetch(`${BASE_URL}/events?language=th-TH`);
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();
  return data.data;
}

export async function getPlayerCards() {
  const res = await fetch(`${BASE_URL}/playercards?language=th-TH`);
  if (!res.ok) throw new Error("Failed to fetch player cards");
  const data = await res.json();
  return data.data;
}
