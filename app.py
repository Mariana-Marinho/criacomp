#executar tudo
if __name__ == "__main__":
    store_name = "coordenacao_ensino"
    vector_store_details = create_vector_store(store_name)
    upload_pdf_files_to_vector_store(vector_store_details["id"], pdf_files)

    demo = gr.ChatInterface(response_output, type="messages")
    demo.launch()