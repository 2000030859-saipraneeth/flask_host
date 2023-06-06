let popupWindowId = -1;
document.addEventListener('DOMContentLoaded', () => {
  const dataInput = document.getElementById('dataInput');
  const submitBtn = document.getElementById('submitBtn');
  const loadingIndicator = document.getElementById('loading');
  const resultDiv = document.getElementById('result');
  const closeButton = document.querySelector('.close');


  submitBtn.addEventListener('click', () => {
    const data = dataInput.value;
    loadingIndicator.style.display = 'block';
    resultDiv.textContent = '';

   
    fetch('http://localhost:8000/process', {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        loadingIndicator.style.display = 'none';
        resultDiv.textContent = data.result;
      })
      .catch(error => console.log(error));
  });
  // chrome.extension.getBackgroundPage().processData(data, result => {
  //   loadingIndicator.style.display = 'none';
  //   resultDiv.textContent = result;
  // });
  // closeButton.addEventListener('click', () => {
  //   window.close(); // Close the popup window
  // });
});
chrome.windows.onFocusChanged.addListener(windowId => {
  chrome.windows.getCurrent(currentWindow => {
    if (windowId === chrome.windows.WINDOW_ID_NONE || windowId === currentWindow.id) {
      // Focus changed to another window or the current window regained focus
      return;
    }
    // Check if the popup window is open
    if (popupWindowId !== -1) {
      chrome.windows.get(popupWindowId, popupWindow => {
        if (!popupWindow) {
          // Popup window is closed, open it again
          chrome.windows.create({ url: 'popup.html', type: 'popup', width: 400, height: 300 }, window => {
            popupWindowId = window.id;
          });
        }
      });
    } else {
      // Open the popup window for the first time
      chrome.windows.create({ url: 'popup.html', type: 'popup', width: 400, height: 300 }, window => {
        popupWindowId = window.id;
      });
    }
  });
});