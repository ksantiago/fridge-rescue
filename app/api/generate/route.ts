import OpenAI from "openai"

const client = new OpenAI()

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: `Generate ONE realistic meal idea.

      Ingredients:
      ${body.ingredients}

      Mood:
      ${body.mood}

      Format the response in Markdown like this:

      ## Meal name

      **Ingredients**
      - item
      - item

      **Steps**
      1. step
      2. step

      **Why it works**
      One short paragraph.

      **Wine pairing**
      One short paragraph.

      Keep it concise and practical.
      Include one approachable wine pairing. Keep it practical, not fancy.`,
    })

    return Response.json({
      message: response.output_text,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate meal idea",
      },
      { status: 500 },
    )
  }
}
