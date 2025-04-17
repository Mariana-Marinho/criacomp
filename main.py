# importação das bibliotecas necessárias
from openai import OpenAI
from tqdm import tqdm
from dotenv import load_dotenv
import gradio as gr
import concurrent
import os


# Pega a chave da OpenAI do arquivo .env e cria o cliente
load_dotenv('.venv')
openai_api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=openai_api_key)


# Cria o diretório "input_pdfs" se não existir, e se existir, faz uma lista com os arquivos PDF do diretório
dir_pdfs = 'input_pdfs'
if not os.path.exists(dir_pdfs):
    os.makedirs(dir_pdfs)
pdf_files = [os.path.join(dir_pdfs, f) 
             for f in os.listdir(dir_pdfs)] # faz uma lista com os arquivos PDF do diretório "input_pdfs"
     

def upload_single_pdf(file_path: str, vector_store_id: str):
    # função para fazer o upload de um único arquivo PDF para o vector store
    file_name = os.path.basename(file_path)
    try:
        file_response = client.files.create(file=open(file_path, 'rb'), 
                                            purpose="assistants")
        attach_response = client.vector_stores.files.create(
            vector_store_id=vector_store_id,
            file_id=file_response.id
        )
        return {"file": file_name, 
                "status": "success"}
    
    except Exception as e:
        print(f"Error with {file_name}: {str(e)}")
        return {"file": file_name, 
                "status": "failed", 
                "error": str(e)}
    

def upload_pdf_files_to_vector_store(vector_store_id: str, pdf_files: list):
    # função para fazer o upload de todos os arquivos PDF para o vector store

    stats = {"total_files": len(pdf_files), 
             "successful_uploads": 0, 
             "failed_uploads": 0, 
             "errors": []}

    print(f"{len(pdf_files)} PDF files to process. Uploading in parallel...")

    #executor para fazer o upload dos arquivos em paralelo
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        # dicionário para armazenar os resultados
        futures = {executor.submit(upload_single_pdf, 
                                   file_path, 
                                   vector_store_id): file_path for file_path in pdf_files}
        #itera sobre os resultados conforme eles são concluídos
        for future in tqdm(concurrent.futures.as_completed(futures), total=len(pdf_files)):
            result = future.result()
            if result["status"] == "success":
                stats["successful_uploads"] += 1

            else:
                stats["failed_uploads"] += 1
                stats["errors"].append(result)

    return stats

def create_vector_store(store_name: str) -> dict:
    # função para criar o vector store
    try:
        vector_store = client.vector_stores.create(name=store_name)
        details = {
            "id": vector_store.id,
            "name": vector_store.name,
            "created_at": vector_store.created_at,
            "file_count": vector_store.file_counts.completed
        }
        print("Vector store created:", details)
        return details
    except Exception as e:
        print(f"Error creating vector store: {e}")
        return {}
     

store_name = "CIn_Assintente_Coordenação_de_Ensino"
vector_store_details = create_vector_store(store_name)
upload_pdf_files_to_vector_store(vector_store_details["id"], pdf_files)


def response_output(query, history):  
  # função que responde a pergunta do usuário

  error_message = "Desculpe, não sei informar sobre, está fora do meu escopo"

  def get_response():
        # função que faz a chamada para o modelo GPT-4o-mini e retorna sua resposta
        response = client.responses.create(
          model="gpt-4o-mini",
          input=[
              {"role": "system", 
               "content": "Você é um assistente da Coordenação de Ensino do CIn/UFPE. Responda em português brasileiro, baseando-se ESTRITAMENTE no conteúdo dos PDFs fornecidos como base. Se a pergunta não estiver relacionada com o conteúdo dos pdfs, diga 'Desculpe, não sei informar sobre, está fora do meu escopo'."},
              {"role": "user", "content": query}
          ],
          tools=[{
              "type": "file_search",
              "vector_store_ids": [vector_store_details['id']]
          }]
      )
        return response
  
  # tente pegar a resposta em até 30 segundos
  try:
        # cria um executor para rodar a função em paralelo
        with concurrent.futures.ThreadPoolExecutor() as executor: # cria um executor para rodar a função em paralelo
          future = executor.submit(get_response)
          response = future.result(timeout=30)
        # verifica se veio resposta relevante
        if (len(response.output) > 1        # se o tamanho da resposta for maior que 1
            and hasattr(response, "output")     # se a resposta tiver o atributo output 
            and hasattr(response.output[1], "content")      # se a resposta tiver o atributo content
            and response.output[1].content[0].text.strip() != ""        # se a resposta não estiver vazia
            ):
            return response.output[1].content[0].text.strip()
        
        else:
            return error_message
        
  except concurrent.futures.TimeoutError:
      return error_message
  except Exception as e:
      return error_message
     
     

#executar tudo
if __name__ == "__main__":
    store_name = "CIn_Assintente_Coordenação_de_Ensino"
    vector_store_details = create_vector_store(store_name) 
    upload_pdf_files_to_vector_store(vector_store_details["id"], pdf_files) 

    demo = gr.ChatInterface(response_output, 
                            type="messages",
                            title="Assistente virtual da Coordenação de Ensino do CIn",
                            description="Um assistente virtual para ajudar com perguntas relacionadas à Coordenação de Ensino do CIn-UFPE. Caso eu não saiba responder a resposta, informo que está fora do meu escopo.")
    

    demo.launch(share=True)