const tokenContainer = document.getElementById('token-container');
const tokenIdInput = document.getElementById('tokenIdInput');
const tokenImage = document.getElementById('token-image');
const tokenDescription = document.getElementById('token-description');

const tokenDataUrl = 'https://raw.githubusercontent.com/rory-hayes/sample-project-metadata/main/tokens/${tokenId}';

const fetchButton = document.querySelector('button');
fetchButton.addEventListener('click', async () => {
  const tokenId = tokenIdInput.value;

  if (!tokenId) {
    // Handle case where no token ID is entered
    return;
  }

  try {
    const response = await fetch(tokenDataUrl.replace('${tokenId}', tokenId));
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();

    tokenContainer.querySelector('h2').textContent = data.name;
    tokenDescription.textContent = data.description;
    tokenImage.src = data.image;
  } catch (error) {
    console.error('Error fetching token data:', error);
    // Handle error, e.g., display an error message to the user
  }
});
