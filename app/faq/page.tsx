export default function FAQPage() {
  const faqs = [
    { q: "Do you offer delivery?", a: "Yes, delivery is available in select areas." },
    { q: "Are there vegan options?", a: "Yes, look for items marked veg. Ask for customizations at checkout." },
    { q: "What are your hours?", a: "11:00 AM – 11:00 PM daily." },
  ]
  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold">FAQs</h1>
      <div className="mt-4 divide-y">
        {faqs.map((f) => (
          <div key={f.q} className="py-4">
            <div className="font-medium">{f.q}</div>
            <div className="text-sm text-muted-foreground mt-1">{f.a}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
