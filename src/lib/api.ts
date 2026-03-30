const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Request failed");
  }
  if (res.status === 204) return null as T;
  return res.json();
}

// --- Local auth simulation (no backend needed) ---
interface StoredUser { id: string; name: string; email: string; password: string; role: string }

function getStoredUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem("_users") || "[]"); } catch { return []; }
}
function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem("_users", JSON.stringify(users));
}
function generateToken(user: StoredUser) {
  return btoa(JSON.stringify({ id: user.id, email: user.email, ts: Date.now() }));
}

const localAuth = {
  register(name: string, email: string, password: string) {
    const users = getStoredUsers();
    if (users.find(u => u.email === email)) throw new Error("Email already registered");
    const user: StoredUser = { id: crypto.randomUUID(), name, email, password, role: "USER" };
    saveStoredUsers([...users, user]);
    const token = generateToken(user);
    const { password: _, ...safeUser } = user;
    return { token, user: safeUser };
  },
  login(email: string, password: string) {
    const users = getStoredUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid email or password");
    const token = generateToken(user);
    const { password: _, ...safeUser } = user;
    return { token, user: safeUser };
  },
};

export const api = {
  auth: {
    login: async (email: string, password: string) => localAuth.login(email, password),
    register: async (name: string, email: string, password: string) => localAuth.register(name, email, password),
  },
  orders: {
    create: async () => ({ id: crypto.randomUUID(), total: "0" }),
  },
  products: {
    getAll: (params?: Record<string, string>) => {
      const qs = params ? "?" + new URLSearchParams(params).toString() : "";
      return request<ProductsResponse>(`/products${qs}`);
    },
    getById: (id: string) => request<Product>(`/products/${id}`),
  },
  categories: {
    getAll: () => request<Category[]>("/categories"),
  },
  cart: {
    get: () => request<CartItem[]>("/cart"),
    add: (productId: string, quantity = 1) =>
      request<CartItem>("/cart", { method: "POST", body: JSON.stringify({ productId, quantity }) }),
    remove: (id: string) => request<null>(`/cart/${id}`, { method: "DELETE" }),
  },
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string | null;
  featured: boolean;
  categoryId: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
