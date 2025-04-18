# Assistente virtual da Coordenação de Ensino do CIn
### Um assistente virtual para ajudar com perguntas relacionadas à Coordenação de Ensino do CIn-UFPE. Voltado para discentes, docentes ou qualquer outra pessoa que tenha dúvidas acercca das especificidades da Coordenação. O Chat é treinado com PDFs que contém todo o conteúdo da página online da Coordenação, por isso, caso não saiba responder a pergunta feita pelo usuário, informa que está fora do escopo.

Aqui você encontra o vídeo com a explicação: https://drive.google.com/file/d/1QsqP03jeLo28M5aaFyC3fFxUBMQeoND3/view?usp=drive_link

## Funcionalidades:
- Respostas em português
- Interface gráfica (via Gradio)

## Estrutura do projeto:
├── .gitignore 
├── CRIACOMP_Assistente_Virtual_com_OpenAI_Responses_e_Gradio.ipynb 
├── LICENSE 
├── main.py 
├── README.md 
├── requirements.txt
├── input_pdfs/ 
  │ ├── Ata Equivalencias_novo perfil SI.pdf 
  │ ├── Plano Pedagógico Curso Ciência da Computação 2024.pdf 
  │ ├── Plano Pedagógico Curso Engenharia da Computação 2024.pdf 
  │ ├── Plano Pedagógico Curso Sistemas de Informação 2024.pdf 
  │ ├── Ata Equivalencias novo perfil EC.pdf
  │ ├── perguntas frequentes.pdf
  │ ├── Requerimento Migracao Ciência da Computação v2.pdf 
  │ ├── Requerimento Migracao Ciência da Computação v2.pdf
  │ └── Requerimento Migracao Ciência da Computação v2.pdf

## Pré-requisitos

- Python 3.8 ou superior
- Chave de API da OpenAI (que você pode armazenar no arquivo .venv)
- Dependências listadas no arquivo `requirements.txt`

## Instalação

1. Clone este repositório:
   git clone https://github.com/Mariana-Marinho/criacomp.git
   cd seu-repositorio

2. Crie um ambiente virtual e ative-o:
    python -m venv .venv
    source .venv/bin/activate   # No Windows: .venv\Scripts\activate

3. Instale as dependências:
    pip install -r requirements.txt

4. Configure a chave da OpenAI: crie um arquivo .venv na raiz do projeto e adicione
    OPENAI_API_KEY=sua_chave_openai

5. Execute o script no terminal
    python [main.py]

## Interação com o Chatbot
Ao executar o comando 5, no terminal será informado o endereço em que o projeto estará pronto para uso (http://127.0.0.1:5000). Ao acessar o endereço, você já pode interagir com o Chatbot fazendo perguntas, como "O que faz a Coordenação de Ensino?" "É possível fazer migração do perfil curricular antigo para o novo?" "Quais serão minhas qualificações se me formar em Engenharia da Computação no CIn?". Contudo, caso faça perguntas cuja resposta não conste nas informações dadas pela Coordenação de Ensino, o Chatbot informará que não sabe responder.
