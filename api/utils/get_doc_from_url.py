from langchain.document_loaders import UnstructuredHTMLLoader
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.embeddings.cohere import CohereEmbeddings
from langchain.indexes import VectorstoreIndexCreator
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores.elastic_vector_search import ElasticVectorSearch
from langchain.vectorstores import Chroma
from langchain.docstore.document import Document
from langchain.document_loaders import TextLoader

def getDocsFromHtml(file):
    loader = UnstructuredHTMLLoader(file)

    data = loader.load()

    return data

def askYourDocument(file, question):
    
    # prepare data
    document = getDocsFromHtml(file)
    print(type(document))
    print(f'loader: {document}')

    index = VectorstoreIndexCreator().from_loaders(document)

    index.query(question)

    print('INDEX: {index}')
    


askYourDocument(
    './page.html', 
    '¿Cuanto aumento la inflacion?'
    )