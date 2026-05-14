"use client"

import { useState } from "react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [ingredients, setIngredients] = useState("")
  const [result, setResult] = useState("")
  const [mood, setMood] = useState("comforting")
  const handleClick = async () => {
    setIsLoading(true)
    setResult("")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients,
          mood,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setResult(data.message)
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Fridge Rescue</h1>

      <label className="mt-8 block text-sm font-medium">
        What do you have?
      </label>

      <textarea
        className="mt-2 h-40 w-full max-w-xl rounded border p-3"
        placeholder="spring napa, shrimp, shiitake, kimchi..."
        value={ingredients}
        onChange={(event) => setIngredients(event.target.value)}
      ></textarea>

      <label className="mt-4 block text-sm font-medium">
        What mood are you in?
      </label>

      <select
        className="mt-2 block rounded border p-2"
        value={mood}
        onChange={(event) => setMood(event.target.value)}
      >
        <option>comforting</option>
        <option>lazy</option>
        <option>high protein</option>
        <option>low carb</option>
      </select>

      <button
        className="mt-4 rounded border border-gray-400 px-4 py-2"
        onClick={handleClick}
      >
        {isLoading ? "Rescuing..." : "Rescue My Dinner"}
      </button>
      {result && (
        <div className="mt-6 max-w-xl rounded border p-4">
          <h2 className="font-bold">Dinner idea</h2>
          <div className="mt-2 whitespace-pre-wrap">{result}</div>
        </div>
      )}

      <p className="mt-4 text-sm">You typed: {ingredients}</p>
    </main>
  )
}
