"use client"

import { useState } from "react"
import { Bot, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { response_output } from "@CRIACOMP_Assistente_Virtual_com_OpenAI_Responses_e_Gradio.ipynb"
import { vector_store_details } from "@CRIACOMP_Assistente_Virtual_com_OpenAI_Responses_e_Gradio.ipynb"

export default function ChatbotCoordEnsino() {
  const KEYWORDS = [
        "coordenação de ensino", "migração de perfil", "reforma curricular",
        "CIn UFPE", "requerimento", "perfil curricular", "NEAP", "SigaA",
        "Ciência da Computação", "Engenharia da Computação", "Sistemas de Informação",
        "histórico escolar", "data limite", "ppc", "tabela de equivalência"
        ]
  const [pergunta, setPergunta] = useState("")
  const [mensagens, setMensagens] = useState<{ tipo: "pergunta" | "resposta"; texto: string }[]>([])
  const [carregando, setCarregando] = useState(false)

  const enviarPergunta = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pergunta.trim()) return

    // Adiciona pergunta ao histórico
    setMensagens(prev => [...prev, { tipo: "pergunta", texto: pergunta }])
    setPergunta("")
    setCarregando(true)

    try {
      // Chama diretamente a API do seu notebook Colab
      const response = await fetch(response_output(pergunta, KEYWORDS), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: pergunta,
          vector_store_id: vector_store_details // Mesmo do notebook
        })
      })

      const { resposta } = await response.json()
      setMensagens(prev => [...prev, { tipo: "resposta", texto: resposta }])

    } catch (error) {
      setMensagens(prev => [...prev, { tipo: "resposta", texto: "Erro ao conectar com o servidor" }])
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="border-b bg-white">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-red-600" />
              <CardTitle>Assistente da Coordenação de Ensino</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="h-[400px] overflow-y-auto p-4">
              {mensagens.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                  <Bot className="mb-2 h-12 w-12 text-red-600 opacity-50" />
                  <p>Conectado ao sistema da Coordenação</p>
                  <p>Pergunte sobre migração de perfis, calendários ou documentos</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {mensagens.map((msg, index) => (
                    <div key={index} className={`flex ${msg.tipo === "pergunta" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        msg.tipo === "pergunta" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"
                      }`}>
                        {msg.texto}
                      </div>
                    </div>
                  ))}
                  
                  {carregando && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg bg-gray-200 p-3 text-gray-800">
                        <div className="flex gap-1">
                          <span className="animate-bounce">.</span>
                          <span className="animate-bounce delay-100">.</span>
                          <span className="animate-bounce delay-200">.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <form onSubmit={enviarPergunta} className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pergunta}
                  onChange={(e) => setPergunta(e.target.value)}
                  placeholder="Digite sua pergunta..."
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  disabled={carregando}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={carregando || !pergunta.trim()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}