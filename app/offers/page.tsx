"use client"

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function OffersPage() {
  // Add CSS keyframes for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const offers = [
    { title: "🔥 Combo Saver", desc: "Noodles + Momos at just ₹249", code: "COMBO249", color: "from-red-500 to-orange-400" },
    { title: "🥟 Momo Monday", desc: "Flat ₹30 off on all momos", code: "MOMO30", color: "from-pink-500 to-yellow-400" },
    { title: "🍚 Rice Rush", desc: "₹20 off on fried rice", code: "RICE20", color: "from-green-500 to-teal-400" },
  ]

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    alert(`Copied: ${code}`)
  }

  return (
    <main className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-red-600 mb-8 text-center tracking-tight">
        Special Offers Just For You 🎉
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((o, idx) => (
          <div
            key={o.code}
            className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}
            style={{
              animation: `fadeInUp 0.6s ease ${idx * 0.2}s forwards`
            }}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${o.color} opacity-90`} />
            <div className="relative p-6 text-white h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{o.title}</h3>
                <p className="text-sm opacity-90">{o.desc}</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs bg-white text-gray-800 px-2 py-1 rounded font-mono shadow">
                  {o.code}
                </span>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white text-red-600 hover:bg-gray-100"
                  onClick={() => copyCode(o.code)}
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </main>
  )
}
