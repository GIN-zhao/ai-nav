import requests
import os

def download_dalle_logo():
    # DALL-E logo URL (使用OpenAI官方的高质量logo)
    url = "https://cdn.openai.com/research-covers/dall-e/2x-no-mark.jpg"

    # 确保logos目录存在
    if not os.path.exists('public/logos'):
        os.makedirs('public/logos')

    # 下载图片
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open('public/logos/dalle_logo.png', 'wb') as f:
                f.write(response.content)
            print("Successfully downloaded DALL-E logo")
        else:
            print(f"Failed to download DALL-E logo: Status code {response.status_code}")
    except Exception as e:
        print(f"Error downloading DALL-E logo: {str(e)}")

if __name__ == "__main__":
    download_dalle_logo()