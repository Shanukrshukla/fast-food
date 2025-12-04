import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.email) {
          setUser(data)
        } else {
          setError("Failed to load profile.")
        }
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load profile.")
        setLoading(false)
      })
  }, [])

  if (loading) return <main className="container mx-auto max-w-3xl px-4 py-8">Loading profile...</main>
  if (error) return <main className="container mx-auto max-w-3xl px-4 py-8 text-red-600">{error}</main>

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Your Profile</h1>
      <div className="bg-card rounded-lg border p-6">
        <div className="mb-2"><strong>Name:</strong> {user?.name}</div>
        <div className="mb-2"><strong>Email:</strong> {user?.email}</div>
        <div className="mb-2"><strong>Phone:</strong> {user?.phone}</div>
      </div>
    </main>
  )
}
