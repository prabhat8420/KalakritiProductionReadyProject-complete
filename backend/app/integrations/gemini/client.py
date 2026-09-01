import os
import json
import logging
from typing import Optional
from google import genai
from app.config import settings

logger = logging.getLogger("kalakriti.gemini")

class GeminiClient:
    """
    Centralized Google GenAI (Gemini 3.7 Flash) Interactions API Client.
    """

    @staticmethod
    def get_client() -> Optional[genai.Client]:
        api_key = (
            settings.GEMINI_API_KEY or
            settings.GOOGLE_API_KEY or
            os.getenv("GEMINI_API_KEY") or
            os.getenv("GOOGLE_API_KEY")
        )
        if not api_key or api_key.startswith("placeholder") or api_key == "your_gemini_api_key_here":
            try:
                return genai.Client()
            except Exception:
                return None
        try:
            return genai.Client(api_key=api_key)
        except Exception as e:
            logger.warning(f"Failed to initialize Google GenAI Client with key: {e}")
            return None

    @classmethod
    def create_interaction(
        cls,
        prompt: str,
        model: str = "gemini-3.7-flash"
    ) -> Optional[str]:
        """
        Runs an interaction using Gemini 3.7 Flash Interactions API.
        """
        client = cls.get_client()
        if not client:
            return None

        try:
            interaction = client.interactions.create(
                model=model,
                input=prompt
            )
            return interaction.output_text
        except Exception as e:
            logger.warning(f"Gemini Interactions API ({model}) call failed: {e}")
            return None

    @classmethod
    def create_json_interaction(
        cls,
        prompt: str,
        model: str = "gemini-3.7-flash"
    ) -> Optional[dict]:
        """
        Runs an interaction and safely extracts and parses JSON output.
        """
        text = cls.create_interaction(prompt=prompt, model=model)
        if not text:
            return None

        try:
            clean_text = text.strip()
            if "```json" in clean_text:
                clean_text = clean_text.split("```json")[1].split("```")[0].strip()
            elif "```" in clean_text:
                clean_text = clean_text.split("```")[1].split("```")[0].strip()

            if "{" in clean_text and "}" in clean_text:
                json_str = clean_text[clean_text.find("{"):clean_text.rfind("}")+1]
                return json.loads(json_str)
        except Exception as e:
            logger.warning(f"Failed to parse Gemini JSON output: {e}. Raw text: {text[:200]}")

        return None
