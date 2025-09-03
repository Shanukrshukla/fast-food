import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LocationsPage() {
  return (
    <div className="container px-4 py-8 md:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Locations</h1>
      <p className="mt-2 text-muted-foreground">Find a Chinese Adda near you.</p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Downtown</CardTitle>
          </CardHeader>
          <CardContent>12 Market Street, Downtown — Open 11am–11pm</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>City Mall</CardTitle>
          </CardHeader>
          <CardContent>3rd Floor, Food Court, City Mall — Open 10am–10pm</CardContent>
        </Card>
      </div>
    </div>
  )
}
