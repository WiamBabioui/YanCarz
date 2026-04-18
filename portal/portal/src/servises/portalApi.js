const BASE_URL = "/api";

export async function fetchCitiesApi() {
  const res = await fetch(`${BASE_URL}/shared/City`);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to fetch cities");
  }

  return res.json();
}

export async function createResearchRequest(payload) {
  const res = await fetch(`${BASE_URL}/portal/ResearchRequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to create research request");
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function fetchResearchCars(filters = {}) {
  const params = new URLSearchParams();

  if (Array.isArray(filters.agencyIds)) {
    filters.agencyIds.forEach((id) => {
      params.append("AgencyIds", id);
    });
  }

  if (filters.page) {
    params.set("Page", String(filters.page));
  }

  if (filters.pageSize) {
    params.set("PageSize", String(filters.pageSize));
  }

  const res = await fetch(`/api/portal/ResearchRequest/cars?${params.toString()}`);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to fetch cars");
  }

  return res.json();
}