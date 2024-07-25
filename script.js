document.addEventListener('DOMContentLoaded', () => {
  const tokenContainer = document.getElementById('token-container');
  const tokenIdInput = document.getElementById('tokenIdInput');
  const tokenImage = document.getElementById('token-image');
  const tokenDescription = document.getElementById('token-description');

  const tokenDataUrl = 'https://raw.githubusercontent.com/rory-hayes/sample-project-metadata/main/tokens/${tokenId}';

  async function fetchTokenData(tokenId) {
    try {
      const response = await fetch(tokenDataUrl.replace('${tokenId}', tokenId));
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching token data:', error);
      throw error; // Re-throw the error for handling in the calling function
    }
  }

  const fetchButton = document.querySelector('button');
  fetchButton.addEventListener('click', async () => {
    const tokenId = tokenIdInput.value;

    try {
      const tokenData = await fetchTokenData(tokenId);

      tokenContainer.querySelector('h2').textContent = tokenData.name;
      tokenDescription.textContent = tokenData.description;
      tokenImage.src = tokenData.image;
    } catch (error) {
      console.error('Error displaying token:', error);
      tokenContainer.textContent = 'Token not found';
      tokenImage.src = '';
      tokenDescription.textContent = '';
    }
  });
});
