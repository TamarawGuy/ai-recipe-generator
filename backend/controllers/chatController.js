import { GoogleGenAI } from '@google/genai'
import { tools, runTool } from '../utils/chatTools.js'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const MODEL = 'gemini-2.5-flash'
const MAX_ITERATIONS = 5

const SYSTEM_INSTRUCTION = `You are a helpful cooking assistant inside a recipe app. The user has saved recipes, a pantry, and a meal plan. Use the 
  available tools to answer questions about their data. Keep replies concise and friendly. If the user asks something unrelated to cooking, recipes, or 
  food, answer briefly without using any tool.

  Recipe creation protocol — follow this exactly:
  1. When the user asks to generate or create a recipe, call generate_recipe with their requirements.
  2. The response will include a short summary of the recipe. Present the name, total time, and a few key details in chat. Do NOT show ingredients or instructions yet.
  3. Ask the user if they want to save it.
  4. ONLY call save_recipe AFTER the user explicitly confirms (e.g., "yes", "save it", "sure"). save_recipe takes no arguments — calling it saves whichever recipe was most recently generated.
  5. If the user declines or asks for changes, call generate_recipe again with the adjustments. The new generation automatically replaces the previous one as the pending recipe.`

/**
 * POST /api/chat
 * Body: {history: [{ role: 'user' | 'assistant', text }], newMessage: string}
 * Returns: { success, data: { reply }}
 */
export const sendMessage = async (req, res, next) => {
    try {
        const { history = [], newMessage } = req.body
        const userId = req.user.id

        if (!newMessage || typeof newMessage !== 'string') {
            return res.json({
                success: false,
                message: 'newMessage is required',
            })
        }

        // gemini `contents` array
        const contents = history.map((msg) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.text }],
        }))

        contents.push({
            role: 'user',
            parts: [{ text: newMessage }],
        })

        // The agent loop
        for (let i = 0; i < MAX_ITERATIONS; i++) {
            const response = await ai.models.generateContent({
                model: MODEL,
                contents,
                config: {
                    tools,
                    systemInstruction: SYSTEM_INSTRUCTION,
                },
            })

            const functionCalls = response.functionCalls ?? []

            if (functionCalls.length === 0) {
                return res.json({
                    success: true,
                    data: { reply: response.text },
                })
            }

            // append the model's tool-call turn
            contents.push({
                role: 'model',
                parts: functionCalls.map((fc) => ({ functionCall: fc })),
            })

            // execute tools and append results
            for (const call of functionCalls) {
                const result = await runTool(call.name, call.args, userId)
                contents.push({
                    role: 'user',
                    parts: [
                        {
                            functionResponse: {
                                name: call.name,
                                response: { result },
                            },
                        },
                    ],
                })
            }
        }

        return res.json({
            success: true,
            data: {
                reply: "Sorry, I'm having trouble finishing that request. Could you rephrase?",
            },
        })
    } catch (err) {
        console.error('Chat error: ', err)
        next(err)
    }
}
