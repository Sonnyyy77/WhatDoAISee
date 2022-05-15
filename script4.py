console.log("running");

async function getData(){
    const dataFile = 'data.json';
    const request = new Request(dataFile);

    const response = await fetch(request);
    const data = await response.json();

    startScript(data)

}
getData();

function startScript(data){

    console.log(data)
    let characters = Object.keys(data);
    console.log(characters);
    for(let i = 0; i < characters.length; i++){
        let characterEntry = document.createElement("div");
        characterEntry.className = "characterEntry"


        // construct dictaionairy
        let char = characters[i];
        let charData = data[char]
        console.log(char);
        console.log(charData);

        let p = document.createElement("p");
        p.className = "character"
        p.innerHTML = char;
        characterEntry.appendChild(p)
        // loop over appearances:
        for(let j = 0; j < charData.appearances.length; j++){
            console.log(charData.appearances[j]);
            let appearance = charData.appearances[j]
            let drawing = appearance.drawing_path;
            let img = document.createElement("img")
            img.src = drawing;
            // document.body.appendChild(img);
            characterEntry.appendChild(img)

        }


        document.body.appendChild(characterEntry);
    }









}
