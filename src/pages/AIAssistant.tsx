import { useMemo, useRef, useState } from 'react'
import {
  Bot,
  Camera,
  MapPin,
  Send,
  Sparkles,
  Clock3,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react'
import { detections } from '../data/mock'

type Message = {
  id: number
  role: 'ai' | 'user'
  text: string
  result?: (typeof detections)[number]
}

const suggestions = [
  'หากุญแจให้หน่อย',
  'โทรศัพท์อยู่ห้องไหน?',
  'กระเป๋าอยู่ที่ไหน?',
  'เห็นกระเป๋าครั้งล่าสุดเมื่อไหร่?',
]

const aliases: Record<string, string[]> = {
  keys: ['keys', 'key', 'กุญแจ', 'กุญแจรถ', 'กุญแจบ้าน'],
  phone: ['phone', 'mobile', 'โทรศัพท์', 'มือถือ'],
  wallet: ['wallet', 'กระเป๋าสตางค์', 'กระเป๋าตัง', 'กระเป๋าสตางค์'],
  bag: ['bag', 'backpack', 'กระเป๋า', 'เป้'],
}

function normalize(text: string) {
  return text.toLowerCase().trim()
}

function findDetection(query: string) {
  const q = normalize(query)

  const objectKey = Object.entries(aliases).find(([, words]) =>
    words.some(word => q.includes(normalize(word))),
  )?.[0]

  if (!objectKey) return undefined

  const matches = detections.filter(d => {
    const words = aliases[objectKey]
    return words.some(word => normalize(d.object).includes(normalize(word)))
  })

  return matches.sort((a, b) => b.id - a.id)[0]
}

function getRoomName(result: (typeof detections)[number]) {
  return result.location === 'Living Room'
    ? 'ห้องนั่งเล่น'
    : result.location === 'Bedroom'
      ? 'ห้องนอน'
      : result.location === 'Entrance'
        ? 'ทางเข้า'
        : result.location
}

function buildResponse(query: string, result?: (typeof detections)[number]) {
  if (!result) {
    return 'ผมยังไม่พบสิ่งของที่ตรงกับคำค้นนี้ในข้อมูลกล้องปัจจุบัน ลองถามหา กุญแจ, โทรศัพท์, กระเป๋า หรือกระเป๋าสตางค์ได้ครับ'
  }

  const objectName =
    result.object === 'Keys'
      ? 'กุญแจ'
      : result.object === 'Phone'
        ? 'โทรศัพท์'
        : result.object === 'Wallet'
          ? 'กระเป๋าสตางค์'
          : result.object === 'Bag'
            ? 'กระเป๋า'
            : result.object

  if (/เมื่อไหร่|ล่าสุด|เวลา|when|last/i.test(query)) {
    return `พบ${objectName}ครั้งล่าสุดจาก ${result.camera} ที่${getRoomName(result)} เวลา ${result.time} ครับ`
  }

  return `พบ${objectName}จาก ${result.camera} อยู่บริเวณ${getRoomName(result)} ครับ`
}

function AIAssistant() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'ai',
      text: 'สวัสดีครับ 👋 ผม FINDCAM AI Assistant ผมช่วยค้นหาสิ่งของจากข้อมูลที่กล้องตรวจพบได้ ลองบอกผมว่าต้องการหาอะไรครับ',
    },
  ])
  const nextId = useRef(2)

  const lastResult = useMemo(
    () => [...messages].reverse().find(message => message.result)?.result,
    [messages],
  )

  const sendMessage = (text = input) => {
    const value = text.trim()
    if (!value) return

    const result = findDetection(value)

    setMessages(prev => [
      ...prev,
      { id: nextId.current++, role: 'user', text: value },
      {
        id: nextId.current++,
        role: 'ai',
        text: buildResponse(value, result),
        result,
      },
    ])
    setInput('')
  }

  const resetChat = () => {
    setMessages([
      {
        id: nextId.current++,
        role: 'ai',
        text: 'เริ่มการค้นหาใหม่ได้เลยครับ 🔎 ต้องการให้ผมหาของอะไร?',
      },
    ])
  }

  return (
    <div className="page ai-assistant-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">AI ASSISTANT</p>
          <h1>Find with AI</h1>
          <p>Chat with FINDCAM AI to locate your lost items from CCTV detections.</p>
        </div>
        <div className="ai-status"><span /> AI Ready</div>
      </div>

      <div className="assistant-layout">
        <section className="card chat-card">
          <div className="chat-header">
            <div className="chat-avatar"><Bot size={22} /></div>
            <div>
              <h2>FINDCAM AI Assistant</h2>
              <span>Object location assistant · Mock AI</span>
            </div>
            <button className="icon-btn" onClick={resetChat} title="New chat" aria-label="New chat">
              <RotateCcw size={17} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map(message => (
              <div className={`chat-message ${message.role}`} key={message.id}>
                {message.role === 'ai' && (
                  <div className="message-avatar"><Sparkles size={15} /></div>
                )}
                <div className="message-bubble">
                  <p>{message.text}</p>

                  {message.result && (
                    <div className="ai-result">
                      <img src={message.result.snapshot} alt={message.result.object} />
                      <div className="ai-result-body">
                        <div className="ai-result-title">
                          <span>{message.result.icon}</span>
                          <div>
                            <b>{message.result.object}</b>
                            <small>Detected by AI</small>
                          </div>
                          <strong>{message.result.confidence}%</strong>
                        </div>

                        <div className="ai-result-meta">
                          <span><Camera size={14} /> {message.result.camera}</span>
                          <span><MapPin size={14} /> {getRoomName(message.result)}</span>
                          <span><Clock3 size={14} /> {message.result.time}</span>
                        </div>

                        <div className="found-label">
                          <CheckCircle2 size={14} /> Last detected location
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="suggestions">
            <span>Try asking</span>
            <div>
              {suggestions.map(suggestion => (
                <button key={suggestion} onClick={() => sendMessage(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <form
            className="chat-input"
            onSubmit={event => {
              event.preventDefault()
              sendMessage()
            }}
          >
            <Sparkles size={19} />
            <input
              value={input}
              onChange={event => setInput(event.target.value)}
              placeholder="เช่น ช่วยหากุญแจให้หน่อย..."
              aria-label="Ask FINDCAM AI"
            />
            <button type="submit" className="primary-btn" aria-label="Send message">
              <Send size={17} />
              Send
            </button>
          </form>
        </section>

        <aside className="assistant-side">
          <div className="card assistant-info-card">
            <div className="assistant-side-icon"><Bot size={21} /></div>
            <p className="eyebrow">HOW IT WORKS</p>
            <h2>ค้นหาของจากกล้อง</h2>
            <p>AI จะค้นหาจาก Detection History และบอกกล้อง ห้อง ตำแหน่ง เวลา และความมั่นใจของการตรวจจับ</p>

            <div className="how-step"><span>1</span><div><b>ถามชื่อสิ่งของ</b><small>เช่น “หากุญแจ”</small></div></div>
            <div className="how-step"><span>2</span><div><b>ค้นหาจากกล้อง</b><small>เปรียบเทียบข้อมูลที่ตรวจพบ</small></div></div>
            <div className="how-step"><span>3</span><div><b>แสดงตำแหน่งล่าสุด</b><small>ห้อง + กล้อง + เวลา + ภาพ</small></div></div>
          </div>

          <div className="card last-found-card">
            <div className="card-header">
              <div><h2>Last Found</h2><span>Latest matched item</span></div>
            </div>
            {lastResult ? (
              <div className="last-found">
                <div className="object-icon">{lastResult.icon}</div>
                <div>
                  <b>{lastResult.object}</b>
                  <span>{getRoomName(lastResult)} · {lastResult.camera}</span>
                  <small>{lastResult.time} · {lastResult.confidence}%</small>
                </div>
              </div>
            ) : (
              <div className="empty-assistant">ยังไม่มีการค้นหา</div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default AIAssistant
