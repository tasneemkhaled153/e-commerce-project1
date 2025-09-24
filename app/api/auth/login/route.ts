import { type NextRequest, NextResponse } from "next/server"
import { loginSchema } from "@/lib/validations/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    // For now, simulate a successful login for demo purposes
    const mockUser = {
      id: "1",
      email: validatedData.email,
      name: "Demo User",
      token: "mock-jwt-token",
    }

    console.log("Login attempt:", validatedData.email)

    return NextResponse.json(mockUser, { status: 200 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
  }
}
