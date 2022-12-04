var upload = document.createElement("input");
upload.setAttribute("type", "file");
upload.setAttribute("style", "appearance: initial; top: 0; position: fixed;");
document.body.appendChild(upload);
var code = 'KITSUNE';
const download = ( data) => {
    console.log(data);
    const element = document.createElement('a');
    // remove the square brackets around data; it's already an array
    const file = new Blob(data, { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = prompt('Save as?');
    element.click();
};
// See mdn page for Blob constructor for valid formats
// https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
function saveKitsune() {
    var jsonData = {};
    for(let key of Object.keys(localStorage)) {
        if(key.startsWith(code)) {
            jsonData[key] = localStorage.getItem(key);
        }
    }
    download([JSON.stringify(jsonData)]);
}
function handleFiles(event) {
    var files = event.target.files;
    var reader = new FileReader();
    reader.addEventListener('load', function(event) {
        var save = JSON.parse(event.target.result);
        for(let key of Object.keys(save)) {
            localStorage.setItem(key, save[key]);
        }
    });
    reader.readAsText(files[0]);
}

upload.addEventListener("change", handleFiles, false);
