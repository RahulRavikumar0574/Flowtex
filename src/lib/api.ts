const API_BASE = import.meta.env.VITE_API_URL || '/api'

export type ApiUser = {
  id: string
  name: string
  email: string
  phone: string
  role: 'customer' | 'admin'
}

export type QuoteRequest = {
  _id: string
  userId: string
  productId: string
  productName: string
  quantity: number
  message: string
  status: 'pending' | 'replied' | 'closed'
  adminUnread?: boolean
  unreadForCustomer?: boolean
  customerUnread?: boolean
  lastReplyAt?: string | null
  createdAt: string
  updatedAt: string
}

export type QuoteReply = {
  _id: string
  quoteRequestId: string
  senderId: { _id: string; name: string; role: string }
  senderRole: 'customer' | 'admin'
  message: string
  attachment: string | null
  attachmentUrl?: string | null
  isRead?: boolean
  createdAt: string
}

function getToken(): string | null {
  return localStorage.getItem('flowtex_token')
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem('flowtex_token', token)
  else localStorage.removeItem('flowtex_token')
}

async function request<T>(
  path: string,
  options: RequestInit & { formData?: FormData } = {},
): Promise<T> {
  const { formData, ...init } = options
  const headers: Record<string, string> = {}
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  if (!formData) headers['Content-Type'] = 'application/json'

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { ...headers, ...(init.headers as Record<string, string>) },
    body: formData ?? (init.body as BodyInit | undefined),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || 'Request failed')
  }
  return data as T
}

export const api = {
  signup: (body: { name: string; email: string; phone: string; password: string }) =>
    request<{ token: string; user: ApiUser }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  login: (body: { email: string; password: string }) =>
    request<{ token: string; user: ApiUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  me: () => request<{ user: ApiUser }>('/auth/me'),

  getMyQuotes: () => request<{ quotes: QuoteRequest[] }>('/quotes/my'),

  getQuotes: () => request<{ requests: QuoteRequest[] }>('/quotes'),

  getQuote: (id: string) =>
    request<{ request: QuoteRequest; replies: QuoteReply[] }>(`/quotes/${id}`),

  markQuoteRead: (id: string) =>
    request<{ ok: boolean }>(`/quotes/${id}/read`, { method: 'POST' }),

  getUnreadCount: () => request<{ count: number }>('/quotes/unread-count'),

  getQuoteNotifications: () =>
    request<{ notifications: QuoteRequest[] }>('/quotes/notifications'),

  getProductQuoteHistory: (productId: string) =>
    request<{ requests: QuoteRequest[] }>(`/quotes/product/${productId}/history`),

  createQuote: (body: {
    productId: string
    productName: string
    quantity: number
    message: string
  }) =>
    request<{ request: QuoteRequest }>('/quotes', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  sendCustomerMessage: (id: string, message: string) =>
    request<{ reply: QuoteReply }>(`/quotes/${id}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),

  notificationCount: () => request<{ count: number }>('/quotes/unread-count'),

  adminStats: () =>
    request<{ total: number; pending: number; replied: number; closed: number; unread: number }>(
      '/admin/stats',
    ),

  adminRequests: (status?: string) =>
    request<{ requests: (QuoteRequest & { userId: ApiUser })[] }>(
      `/admin/requests${status ? `?status=${status}` : ''}`,
    ),

  adminRequest: (id: string) =>
    request<{
      request: QuoteRequest & { userId: ApiUser }
      replies: QuoteReply[]
    }>(`/admin/requests/${id}`),

  adminReply: (id: string, message: string, file?: File) => {
    const formData = new FormData()
    formData.append('message', message)
    if (file) formData.append('attachment', file)
    return request<{ reply: QuoteReply }>(`/admin/requests/${id}/reply`, {
      method: 'POST',
      formData,
    })
  },

  adminClose: (id: string) =>
    request<{ request: QuoteRequest }>(`/admin/requests/${id}/close`, { method: 'PATCH' }),
}
