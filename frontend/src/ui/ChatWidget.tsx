import { useState, useRef, useEffect, type SubmitEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { MessageCircle, X, Send } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

type Message = {
    id: string
    role: 'user' | 'assistant'
    text: string
    createdAt: string
}

const HIDDEN_PATHS = ['/login', '/signup']

type MessageRowProps = {
    message: Message
}

const MessageRow = ({ message }: MessageRowProps) => {
    const isUser = message.role === 'user'

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                    isUser
                        ? 'bg-emerald-500 text-white rounded-br-sm'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
                }`}
            >
                {message.text}
            </div>
        </div>
    )
}

const ChatWidget = () => {
    const { isAuthenticated, loading } = useAuth()
    const location = useLocation()

    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const messageEndRef = useRef<HTMLDivElement>(null)

    const handleSend = (e: SubmitEvent) => {
        e.preventDefault()

        const text = input.trim()
        if (!text) return

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            text,
            createdAt: new Date().toISOString(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInput('')

        setTimeout(() => {
            const reply: Message = {
                id: crypto.randomUUID(),
                role: 'assistant',
                text: `You said "${text}".`,
                createdAt: new Date().toISOString(),
            }
            setMessages((prev) => [...prev, reply])
        }, 500)
    }

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    if (loading) return null
    if (!isAuthenticated) return null
    if (HIDDEN_PATHS.includes(location.pathname)) return null

    if (!isOpen) {
        return (
            <button
                aria-label="Open Chat"
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg flex items-center justify-center transition-colors"
            >
                <MessageCircle className="w-6 h-6" />
            </button>
        )
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] h-[500px] bg-white border- border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-emerald-500 text-white">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-6" />
                    <span className="font-semibold">Recipe Assistant</span>
                </div>
                <button
                    aria-label="Close chat"
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-emerald-600 rounded transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.length === 0 && (
                    <p className="text-sm text-gray-400 text-center mt-8">
                        Ask me about your recipes, pantry, or meal plan
                    </p>
                )}
                {messages.map((msg) => (
                    <MessageRow key={msg.id} message={msg} />
                ))}
                <div ref={messageEndRef} />
            </div>

            {/* Input */}
            <form
                onSubmit={handleSend}
                className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white"
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />

                <button
                    type="submit"
                    aria-label="Send"
                    disabled={!input.trim()}
                    className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-gray-300 disabled: cursor-not-allowed transition-colors"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    )
}

export default ChatWidget
