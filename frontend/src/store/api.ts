import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "./store"

// Types
export interface User {
  id: number
  email: string
  username: string
  photoUrl?: string
  emergencyContact?: {
    phoneNumber: string
  }
}

export interface WalkEvent {
  id: number
  organizerId: number
  location: string
  dateTime: string
  description?: string
  status: "upcoming" | "active" | "completed" | "cancelled"
  organizer: {
    id: number
    username: string
    photoUrl?: string
  }
  participants: User[]
  participantCount: number
}

export interface WalkSession {
  id: number
  userId: number
  walkId?: number
  startTime: string
  endTime?: string
  distance: number
  duration: number
  startLatitude: number
  startLongitude: number
  gpsPoints: GpsPoint[]
}

export interface GpsPoint {
  latitude: number
  longitude: number
  timestamp: string
}

export interface Post {
  id: number
  userId: number
  text: string
  walkSessionId?: number
  createdAt: string
  user: {
    id: number
    username: string
    photoUrl?: string
  }
  walkSession?: {
    distance: number
    duration: number
  }
}

export interface Invitation {
  id: number
  senderId: number
  recipientId: number
  walkId: number
  status: "pending" | "accepted" | "declined"
  createdAt: string
  sender: {
    username: string
    photoUrl?: string
  }
  walk: {
    location: string
    dateTime: string
  }
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  },
})

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Walk", "Post", "Invitation", "WalkSession"],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<{ user: User; token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    register: builder.mutation<{ user: User; token: string }, { email: string; password: string; username: string }>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    // User endpoints
    getProfile: builder.query<User, void>({
      query: () => "/users/profile",
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation<User, { username?: string; photo?: FormData }>({
      query: (updateData) => ({
        url: "/users/profile",
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["User"],
    }),

    setEmergencyContact: builder.mutation<void, { phoneNumber: string }>({
      query: (data) => ({
        url: "/users/emergency-contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Walk endpoints
    createWalk: builder.mutation<WalkEvent, { location: string; dateTime: string; description?: string }>({
      query: (walkData) => ({
        url: "/walks",
        method: "POST",
        body: walkData,
      }),
      invalidatesTags: ["Walk"],
    }),

    getUserWalks: builder.query<WalkEvent[], { status?: string }>({
      query: ({ status }) => ({
        url: "/walks",
        params: status ? { status } : {},
      }),
      providesTags: ["Walk"],
    }),

    getWalkDetails: builder.query<WalkEvent, number>({
      query: (walkId) => `/walks/${walkId}`,
      providesTags: ["Walk"],
    }),

    sendInvitation: builder.mutation<Invitation, { walkId: number; recipientId: number }>({
      query: ({ walkId, recipientId }) => ({
        url: `/walks/${walkId}/invite`,
        method: "POST",
        body: { recipientId },
      }),
      invalidatesTags: ["Invitation"],
    }),

    acceptInvitation: builder.mutation<Invitation, number>({
      query: (invitationId) => ({
        url: `/walks/invitations/${invitationId}/accept`,
        method: "PATCH",
      }),
      invalidatesTags: ["Invitation", "Walk"],
    }),

    // Walk session endpoints
    startWalkSession: builder.mutation<WalkSession, { walkId: number; latitude: number; longitude: number }>({
      query: ({ walkId, latitude, longitude }) => ({
        url: `/walks/${walkId}/start-session`,
        method: "POST",
        body: { latitude, longitude },
      }),
      invalidatesTags: ["WalkSession"],
    }),

    updateWalkSession: builder.mutation<WalkSession, { sessionId: number; latitude: number; longitude: number }>({
      query: ({ sessionId, latitude, longitude }) => ({
        url: `/walks/sessions/${sessionId}`,
        method: "PATCH",
        body: { latitude, longitude },
      }),
      invalidatesTags: ["WalkSession"],
    }),

    finishWalkSession: builder.mutation<WalkSession, number>({
      query: (sessionId) => ({
        url: `/walks/sessions/${sessionId}/finish`,
        method: "POST",
      }),
      invalidatesTags: ["WalkSession"],
    }),

    // Posts endpoints
    createPost: builder.mutation<Post, { text: string; walkSessionId?: number }>({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Post"],
    }),

    getFeed: builder.query<Post[], { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 20 }) => ({
        url: "/posts/feed",
        params: { page, limit },
      }),
      providesTags: ["Post"],
    }),

    // Emergency endpoint
    sendEmergencyAlert: builder.mutation<void, { latitude: number; longitude: number }>({
      query: (location) => ({
        url: "/emergency/alert",
        method: "POST",
        body: location,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useSetEmergencyContactMutation,
  useCreateWalkMutation,
  useGetUserWalksQuery,
  useGetWalkDetailsQuery,
  useSendInvitationMutation,
  useAcceptInvitationMutation,
  useStartWalkSessionMutation,
  useUpdateWalkSessionMutation,
  useFinishWalkSessionMutation,
  useCreatePostMutation,
  useGetFeedQuery,
  useSendEmergencyAlertMutation,
} = api
