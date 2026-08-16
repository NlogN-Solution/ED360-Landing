const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
export const APP_URL = import.meta.env.VITE_APP_URL ?? "http://localhost:5173";

export interface PlanInfo {
  plan: "starter" | "professional" | "enterprise";
  label: string;
  price: number;
  included_staff_seats: number | null;
  student_limit: number | null;
  storage_limit_mb: number | null;
}

export interface RegisterOrganizationPayload {
  organization: {
    name: string;
    slug: string;
    email?: string;
    phone?: string;
    country?: string;
    timezone?: string;
  };
  owner: {
    first_name: string;
    last_name: string;
    email: string;
  };
  plan: PlanInfo["plan"];
  billing_cycle: "monthly" | "yearly";
  card: {
    card_number: string;
    expiry: string;
    cvv: string;
  };
}

export interface RegisterOrganizationResponse {
  organization_id: string;
  organization_slug: string;
  owner_email: string;
  temporary_password: string;
  login_url: string;
}

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = typeof body?.detail === "string" ? body.detail : "Something went wrong. Please try again.";
    throw new ApiError(message);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getPlans: () => request<PlanInfo[]>("/onboarding/plans"),
  registerOrganization: (payload: RegisterOrganizationPayload) =>
    request<RegisterOrganizationResponse>("/onboarding/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export { ApiError };
