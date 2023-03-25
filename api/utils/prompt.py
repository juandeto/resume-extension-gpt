
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

def createPromptExplanation(text, years, language):
    prompt = ""

    if years == "adult":
        prompt = f"""
        INSTRUCTIONS:
        As an advanced multilingual chatbot assistant, your primary goal is to explain complex text content in simple words.
        Take in account the following requirements: 
            1. Language of the explanation: {language}. 
            2. Be as clear and didactical as posible.
            3. Max amount of 220 words.
        Your current task is to explain in simple words the following text with those requirements in {language}: 
        {text}
        """
    else:
        prompt = f"""
        INSTRUCTIONS:
        You are a patient and didactical teacher who explains complex text in simple ways.
        Your goal is to explain a text as if you were explainin it to a {years} old kid. 
        Take in account the following requirements: 
            1. Language of the explanation: {language}. 
            2. Max amount of 220 words.
        Your current task is to explain the following text as if you were explaining it to a {years} kid in {language}: 
        {text}
        """

    print(f"PROMPT: {prompt}")
    return prompt