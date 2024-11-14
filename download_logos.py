import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def create_logos_folder():
    """Create logos folder if it doesn't exist"""
    if not os.path.exists('public/logos'):
        os.makedirs('public/logos')

def download_image(url, filename):
    """Download image from url and save to logos folder"""
    try:
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            with open(f'public/logos/{filename}', 'wb') as f:
                f.write(response.content)
            print(f'Successfully downloaded {filename}')
        else:
            print(f'Failed to download {filename}: Status code {response.status_code}')
    except Exception as e:
        print(f'Error downloading {filename}: {str(e)}')

def get_favicon(url):
    """Get favicon url from website"""
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Try different favicon possibilities
        favicon = soup.find('link', rel='icon') or \
                 soup.find('link', rel='shortcut icon') or \
                 soup.find('link', rel='apple-touch-icon')

        if favicon and favicon.get('href'):
            favicon_url = favicon['href']
            if not favicon_url.startswith(('http://', 'https://')):
                favicon_url = urljoin(url, favicon_url)
            return favicon_url

    except Exception as e:
        print(f'Error getting favicon from {url}: {str(e)}')

    # Fallback to default favicon.ico
    return urljoin(url, '/favicon.ico')

def main():
    # Create logos folder
    create_logos_folder()

    # List of tools and their URLs
    tools = [
        ('dalle_logo', 'https://openai.com'),
        ('sd_logo', 'https://stability.ai'),
        ('leonardo_logo', 'https://leonardo.ai'),
        ('jasper_logo', 'https://www.jasper.ai'),
        ('copyai_logo', 'https://www.copy.ai'),
        ('grammarly_logo', 'https://www.grammarly.com'),
        ('runway_logo', 'https://runway.com'),
        ('did_logo', 'https://www.d-id.com'),
        ('synthesia_logo', 'https://www.synthesia.io'),
        ('codewhisperer_logo', 'https://aws.amazon.com'),
        ('tabnine_logo', 'https://www.tabnine.com'),
        ('replit_logo', 'https://replit.com')
    ]

    # Download each logo
    for name, url in tools:
        favicon_url = get_favicon(url)

        # Get file extension from url
        ext = os.path.splitext(favicon_url)[1]
        if not ext:
            ext = '.ico'

        filename = f'{name}{ext}'
        download_image(favicon_url, filename)

if __name__ == '__main__':
    main()