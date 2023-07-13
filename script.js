const fileInput = document.getElementById("file-input")
const regionSelect = document.getElementById("region")
const barSelect = document.getElementById('bar')

let sData;

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0]

    // Create a new FileReader
    const reader = new FileReader();

    // Listen for the load event
    reader.addEventListener('load', (event) => {
    // Get the file data as an ArrayBuffer
    const data = event.target.result;

    // Create a Uint8Array from the ArrayBuffer
    const uint8Array = new Uint8Array(data);

    // Convert the Uint8Array to a binary string
    let binaryString = '';
    for (let i = 0; i < uint8Array.length; i++) {
       binaryString += String.fromCharCode(uint8Array[i]);
    }

    // Read the data from the binary string
    const workbook = XLSX.read(binaryString, {type: 'binary'});

     // Log the workbook data
     const sheetName = workbook.SheetNames[0]
     const sheet = workbook.Sheets[sheetName]
     sData = XLSX.utils.sheet_to_json(sheet);
     console.log(sData)
     addOptions(sData)
    });
// Read the file as an ArrayBuffer
reader.readAsArrayBuffer(file);
})

regionSelect.addEventListener('change', (event) => {
    console.log('regionSelect happened')
    
    const filteredData = sData.filter(item => item.city === event.target.value);
    const html = filteredData.map(item => `<option value=${item.bar}>${item.bar}</option>`).join('');
    
    barSelect.innerHTML += html;
})

function addOptions(data){
    const html = data?.map(item => {
        return (
            `<option value=${item.city}>${item.city}</option>`
        )
    }).join('')

    regionSelect.innerHTML += html
}
