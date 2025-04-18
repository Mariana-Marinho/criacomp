# 🤖 Assistente Virtual da Coordenação de Ensino do CIn/UFPE

Um assistente virtual inteligente que utiliza IA para responder dúvidas baseadas nos documentos oficiais da Coordenação de Ensino do Centro de Informática da UFPE.

## 📌 Visão Geral

O assistente foi desenvolvido para:
- Auxiliar discentes, docentes e servidores
- Responder dúvidas sobre procedimentos acadêmicos
- Fornecer informações precisas baseadas em documentos oficiais
- Filtrar perguntas fora do escopo acadêmico

**Vídeo Demonstrativo:** [Clique para assistir](https://drive.google.com/file/d/1QsqP03jeLo28M5aaFyC3fFxUBMQeoND3/view?usp=drive_link)

## 🚀 Funcionalidades Principais

| Feature | Descrição |
|---------|-----------|
| **Busca Semântica** | Encontra respostas mesmo com palavras diferentes das usadas nos documentos |
| **Contexto de Conversa** | Mantém o histórico do diálogo para respostas coerentes |
| **Filtro Inteligente** | Identifica perguntas fora do escopo acadêmico |
| **Processamento Rápido** | Responde em segundos mesmo com grandes documentos |

## 🗂️ Estrutura do Projeto

```bash
.
├── .gitignore
├── main.py                  # Script principal
├── requirements.txt         # Dependências
├── LICENSE
├── README.md
├── input_pdfs/              # Documentos oficiais
│   ├── Atas_Equivalencias/
│   ├── Planos_Pedagogicos/
│   └── Requerimentos/
└── .env                     # Configurações sensíveis
```

# ⚙️ Pré-requisitos

- **Python 3.8 ou superior**  
  [![Python Version](https://img.shields.io/badge/python-3.8%2B-blue)](https://www.python.org/downloads/)

- **Chave de API da OpenAI**  
  [Obtenha sua chave](https://platform.openai.com/api-keys)

---

# 🛠️ Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Mariana-Marinho/cin-coordenacao-chatbot.git
   cd cin-coordenacao-chatbot
   ```

2. **Crie um ambiente virtual e ative-o**:
    ```bash
    python -m venv .venv
    source .venv/bin/activate   # No Windows: .venv\Scripts\activate
    ```

3. Instale as dependências:
    ```bash
    pip install -r requirements.txt
    ```

4. Configure a chave da OpenAI: crie um arquivo .venv na raiz do projeto e adicione
    ```bash
    OPENAI_API_KEY=sua_chave_openai
    ```

# 🖥️ Como Executar

```bash
python main.py
```

# ✅ O sistema irá:

1. Processar automaticamente todos os PDFs da pasta input_pdfs

2. Iniciar a interface web no endereço:
```bash
http://127.0.0.1:7860
```
Ao acessar o endereço, você já pode interagir com o Chatbot fazendo perguntas, como "O que faz a Coordenação de Ensino?" "É possível fazer migração do perfil curricular antigo para o novo?" "Quais serão minhas qualificações se me formar em Engenharia da Computação no CIn?". Contudo, caso faça perguntas cuja resposta não conste nas informações dadas pela Coordenação de Ensino, o Chatbot informará que não sabe responder.
