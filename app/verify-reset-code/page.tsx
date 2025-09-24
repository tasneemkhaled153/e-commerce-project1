"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { authApi } from "@/lib/api"
import { z } from "zod"
import Link from "next/link"

const verifyCodeSchema = z.object({
  resetCode: z.string().min(6, "Reset code must be at least 6 characters"),
})

type VerifyCodeInput = z.infer<typeof verifyCodeSchema>

export default function VerifyResetCodePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeInput>({
    resolver: zodResolver(verifyCodeSchema),
  })

  const onSubmit = async (data: VerifyCodeInput) => {
    setIsLoading(true)
    setError("")

    try {
      const response = await authApi.verifyResetCode(data.resetCode)
      if (response.status === "Success") {
        router.push(`/reset-password?email=${encodeURIComponent(email || "")}`)
      }
    } catch (error: any) {
      setError(error.message || "Invalid reset code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Verify Reset Code</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="resetCode">Reset Code</Label>
                  <Input
                    id="resetCode"
                    type="text"
                    placeholder="Enter the 6-digit code from your email"
                    {...register("resetCode")}
                    className={errors.resetCode ? "border-red-500" : ""}
                  />
                  {errors.resetCode && <p className="text-sm text-red-600">{errors.resetCode.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify Code"}
                </Button>

                <div className="text-center">
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Didn't receive a code? Try again
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
