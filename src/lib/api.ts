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

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ token: string; user: { id: string; name: string; email: string; role: string } }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    register: (name: string, email: string, password: string) =>
      request<{ token: string; user: { id: string; name: string; email: string; role: string } }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      }),
  },
  orders: {
    create: () => request<{ id: string; total: string }>("/orders", { method: "POST" }),
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
