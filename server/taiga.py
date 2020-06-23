"""
App <=> Dialogflow.
"""

import dialogflow


# Initialise session.
def detect_intent_texts(project_id, session_id, text, language_code):
    session_client = dialogflow.SessionsClient()
    session = session_client.session_path(project_id, session_id)

    if text:
        # Text from browser.
        text_input = dialogflow.types.TextInput(
            text=text, language_code=language_code)
        query_input = dialogflow.types.QueryInput(text=text_input)
        # Response.
        response = session_client.detect_intent(
            session=session, query_input=query_input)

        return response.query_result.fulfillment_text
