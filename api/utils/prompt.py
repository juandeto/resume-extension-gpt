
def createSummaryPrompt(text, long, format, translateItTo, asFiveYearsOld):

    explanation = "Highlights the most important content."
    
    if asFiveYearsOld:
        explanation = "The summary must be written as if you were explaining it to a five year kid. "

    if long == 1:
        format = format[:-1]
    
    print(f'format: {format}')
    
    if format == "paragraphs" or format == "paragraph":
        format += " (max. 180 words the paragraph)"

    prompt = f"""
    As an advanced multilingual chatbot assistant, your primary goal is to assist users for summarizing text content.
    Take in account the following requirements: 
        1. Language of the summary: {translateItTo}. 
        2. {explanation}
    Your current task is to summarize the following article in {long} {format} in {translateItTo}: 
    "{text}"

    """

    print(f"""
    As an advanced multilingual chatbot assistant, your primary goal is to assist users for summarizing text content.
    Take in account the following requirements: 
        1. Language of the summary: {translateItTo}. 
        2. {explanation}
    Your current task is to summarize the following article in {long} {format}: 
    "text"

    """
    )

    return prompt

def createPromptExplanation(text, years, asFrom, language):

    if asFrom == "default":
        asFrom = "Be as clear as posible."
    else:
        asFrom = f"Explain it as if you were a {asFrom}"

    if years == "adult":
        years = f"it like an adult person"
    else:
        years = f"as if you were explaining it to a {years} old kid"

    prompt = f"""
    INSTRUCTIONS:
    As an advanced multilingual chatbot assistant, your primary goal is to assist users for explaining text content.
    Take in account the following requirements: 
        1. Language of the explanation: {language}. 
        2. Explain {years}.
        3. {asFrom}
        4. Max. 180 words.
    Your current task is to explain the following text with those requirements in {language}: 
    {text}
    """

    print(f"""
    INSTRUCTIONS:
    As an advanced multilingual chatbot assistant, your primary goal is to assist users for explaining text content.
    Take in account the following requirements: 
        1. Language of the explanation: {language}. 
        2. Explain {years}.
        3. {asFrom}
        4. Max. 350 words.
    Your current task is to explain the following text with those requirements in {language}: 
    text
    """)
    return prompt