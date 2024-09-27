import requests
from bs4 import BeautifulSoup
import re

# URL of the Cisco Security Advisory page
url = "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-webui-csrf-ycUYxkKO"

# Fetch the webpage content
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Initialize a dictionary to hold the scraped data
scraped_data = {
    "Product Name": "Cisco Product",
    "Product Version": "NA",
    "OEM Name": "Cisco",
    "Severity Level": "High",
    "Vulnerability": None,
    "Mitigation Strategy": None,
    "Published Date": None,
    "Unique ID": None
}

# Scrape the vulnerability details (headline text)
headline_section = soup.find('h1', {'class': 'headline'})
if headline_section:
    vulnerability_text = headline_section.get_text().strip()
    scraped_data["Vulnerability"] = vulnerability_text


# Scrape the mitigation strategy
mitigation_section = soup.find('div', {'class': 'mitigation-strategy'}) 
if mitigation_section:
    mitigation_text = mitigation_section.get_text().strip()
    scraped_data["Mitigation Strategy"] = mitigation_text

# Scrape the published date
published_date = soup.find('span', {'class': 'ud-divHeaderLabelSpacing'})
if published_date:
    scraped_data["Published Date"] = published_date.get_text().strip

# Use regex to scrape the CVE ID (Unique ID)
page_text = soup.get_text()  # Get full text of the webpage
cve_match = re.search(r'(CVE-\d{4}-\d{4,7})', page_text)
if cve_match:
    scraped_data["Unique ID"] = cve_match.group(1)

# Print the scraped data
for key, value in scraped_data.items():
    print(f"{key}: {value}")