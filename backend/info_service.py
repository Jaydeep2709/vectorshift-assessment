"""
info_service.py

Fetches website content for Info Node.
"""

import requests
from bs4 import BeautifulSoup


class InfoService:

    def fetch(self, url):

        try:

            response = requests.get(url, timeout=10)

            soup = BeautifulSoup(response.text, "html.parser")

            text = soup.get_text()

            return text[:5000]

        except Exception as e:

            return f"Error fetching info: {str(e)}"


info_service = InfoService()
