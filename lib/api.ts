// API Configuration and Base Service
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1"

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers = {
        ...config.headers,
        token: token, // API expects 'token' header, not 'Authorization: Bearer'
      }
    }
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(response.status, errorData.message || `API Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, "Network error occurred")
  }
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    return apiRequest<{
      message: string
      user: any
      token: string
    }>("/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },

  register: async (userData: {
    name: string
    email: string
    password: string
    rePassword: string
    phone: string
  }) => {
    return apiRequest<{
      message: string
      user: any
    }>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  forgotPassword: async (email: string) => {
    return apiRequest<{ message: string }>("/auth/forgotPasswords", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  },

  verifyResetCode: async (resetCode: string) => {
    return apiRequest<{ status: string }>("/auth/verifyResetCode", {
      method: "POST",
      body: JSON.stringify({ resetCode }),
    })
  },

  resetPassword: async (email: string, newPassword: string) => {
    return apiRequest<{ token: string }>("/auth/resetPassword", {
      method: "PUT",
      body: JSON.stringify({ email, newPassword }),
    })
  },
}

// Products API
export const productsApi = {
  getAll: async (params?: {
    page?: number
    limit?: number
    sort?: string
    keyword?: string
    category?: string
    brand?: string
  }) => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append("page", params.page.toString())
    if (params?.limit) searchParams.append("limit", params.limit.toString())
    if (params?.sort) searchParams.append("sort", params.sort)
    if (params?.keyword) searchParams.append("keyword", params.keyword)
    if (params?.category) searchParams.append("category[in]", params.category)
    if (params?.brand) searchParams.append("brand", params.brand)

    const query = searchParams.toString()
    return apiRequest<{
      results: number
      metadata: { currentPage: number; numberOfPages: number; limit: number }
      data: any[]
    }>(`/products${query ? `?${query}` : ""}`)
  },

  getById: async (id: string) => {
    return apiRequest<{ data: any }>(`/products/${id}`)
  },
}

// Categories API
export const categoriesApi = {
  getAll: async () => {
    return apiRequest<{
      results: number
      data: any[]
    }>("/categories")
  },

  getById: async (id: string) => {
    return apiRequest<{ data: any }>(`/categories/${id}`)
  },

  getSubcategories: async (categoryId: string) => {
    return apiRequest<{
      results: number
      data: any[]
    }>(`/categories/${categoryId}/subcategories`)
  },
}

// Brands API
export const brandsApi = {
  getAll: async () => {
    return apiRequest<{
      results: number
      data: any[]
    }>("/brands")
  },

  getById: async (id: string) => {
    return apiRequest<{ data: any }>(`/brands/${id}`)
  },
}

// Cart API
export const cartApi = {
  getCart: async () => {
    return apiRequest<{
      status: string
      numOfCartItems: number
      data: {
        _id: string
        cartOwner: string
        products: any[]
        totalCartPrice: number
      }
    }>("/cart")
  },

  addToCart: async (productId: string) => {
    return apiRequest<{
      status: string
      message: string
      numOfCartItems: number
      data: any
    }>("/cart", {
      method: "POST",
      body: JSON.stringify({ productId }),
    })
  },

  updateCartItem: async (itemId: string, count: number) => {
    return apiRequest<{
      status: string
      data: any
    }>(`/cart/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ count }),
    })
  },

  removeFromCart: async (itemId: string) => {
    return apiRequest<{
      status: string
      data: any
    }>(`/cart/${itemId}`, {
      method: "DELETE",
    })
  },

  clearCart: async () => {
    return apiRequest<{ message: string }>("/cart", {
      method: "DELETE",
    })
  },
}

// Wishlist API
export const wishlistApi = {
  getWishlist: async () => {
    return apiRequest<{
      status: string
      count: number
      data: any[]
    }>("/wishlist")
  },

  addToWishlist: async (productId: string) => {
    return apiRequest<{
      status: string
      message: string
      data: string[]
    }>("/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId }),
    })
  },

  removeFromWishlist: async (productId: string) => {
    return apiRequest<{
      status: string
      message: string
      data: string[]
    }>(`/wishlist/${productId}`, {
      method: "DELETE",
    })
  },
}

// Orders API
export const ordersApi = {
  createCashOrder: async (cartId: string, shippingAddress: any) => {
    return apiRequest<{
      status: string
      data: any
    }>(`/orders/${cartId}`, {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
    })
  },

  createOnlineOrder: async (cartId: string, shippingAddress: any) => {
    return apiRequest<{
      status: string
      session: { url: string }
    }>(`/orders/checkout-session/${cartId}`, {
      method: "POST",
      body: JSON.stringify({
        shippingAddress,
        url: window.location.origin,
      }),
    })
  },

  getUserOrders: async (userId: string) => {
    return apiRequest<any[]>(`/orders/user/${userId}`)
  },
}

// User Profile API
export const userApi = {
  getProfile: async () => {
    return apiRequest<{ data: any }>("/users/getMe")
  },

  updateProfile: async (userData: any) => {
    return apiRequest<{
      message: string
      user: any
    }>("/users/updateMe", {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  },

  changePassword: async (currentPassword: string, password: string, rePassword: string) => {
    return apiRequest<{
      message: string
      token: string
    }>("/users/changeMyPassword", {
      method: "PUT",
      body: JSON.stringify({
        currentPassword,
        password,
        rePassword,
      }),
    })
  },

  addAddress: async (address: any) => {
    return apiRequest<{
      status: string
      message: string
      data: any[]
    }>("/addresses", {
      method: "POST",
      body: JSON.stringify(address),
    })
  },

  getAddresses: async () => {
    return apiRequest<{
      status: string
      data: any[]
    }>("/addresses")
  },

  removeAddress: async (addressId: string) => {
    return apiRequest<{
      status: string
      message: string
      data: any[]
    }>(`/addresses/${addressId}`, {
      method: "DELETE",
    })
  },
}
