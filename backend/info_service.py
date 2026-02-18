"""
info_service.py

Fetches webpage content for Info Node
"""

import requests
from bs4 import BeautifulSoup


class InfoService:

    def fetch(self, url):

        try:

            response = requests.get(url, timeout=10)

            soup = BeautifulSoup(response.text, "html.parser")

            # Remove scripts/styles
            for tag in soup(["script", "style"]):
                tag.decompose()

            text = soup.get_text(separator="\n")

            return text[:3000]  # limit size

        except Exception as e:

            print("InfoService error:", e)
            return ""


info_service = InfoService()
