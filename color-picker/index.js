const colorPicker = document.getElementById('colorPicker');
const selectedColor = document.getElementById('selectedColor');
const copyColorBtn = document.getElementById('copyColorBtn');

colorPicker.addEventListener('input', async (event) => {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    selectedColor.innerText = event?.target?.value;
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: (color) => {
            document.body.style.background = color;
        },
        args: [event.target.value]
    });
});

copyColorBtn.addEventListener('click', (event) => {
    const colorText = selectedColor.innerText;
    navigator.clipboard.writeText(colorText).then(() => {
        copyColorBtn.innerText = 'Copied!';
        setTimeout(() => {
            copyColorBtn.innerText = 'Copy';
        }, 2000);
    })
});