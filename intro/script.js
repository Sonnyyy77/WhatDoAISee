console.log("running")

let inputbox = document.getElementById("textInput")
let sentence = document.getElementById("sentence")
let button = document.getElementById("clearStc")

// inputbox.addEventListener("input", function(){
//   console.log("now")
// })


async function getData(){
  const dataFile = 'data.json';
  const request = new Request(dataFile);

  const response = await fetch(request);
  const data = await response.json();

  // console.log(superHeroes)
  startScript(data)

}

getData();

function startScript(data){
  //
  console.log(data)


  inputbox.addEventListener('compositionend', (event) => {
    console.log("composition done!");
    console.log(inputbox.value.split(''))
    let characters = inputbox.value.split('');
    for(let i = 0; i < characters.length; i++){
      let char = characters[i];


      console.log("current char is", char)
      console.log("is ", char, "in data?")

      // if we have an image for this character, append that image to the page
      if(data[char] != undefined){
        // we have an image for this char
        let char_data = data[char].appearance;
        console.log("char data", char_data)
        let numAppearancesForThisChar = char_data.length;
        let ranIdx = Math.floor( Math.random()*numAppearancesForThisChar );
        let ran_appearance = char_data[ ranIdx ]
        console.log(ran_appearance)
        let drawingPath = ran_appearance.drawing_path;
        console.log('path', drawingPath)


        let img = document.createElement("img")
        img.src = drawingPath;
        // img.style.width = "30%";
        // img.style.height = "15%";
        let div = document.createElement("div");
        div.className = "characterContainer";
        div.appendChild(img);
        sentence.append(div);
        sentence.scrollTop = sentence.scrollHeight;

      }else{
        // if no image is available, append a normal p tag to the page

        let p = document.createElement("p")
        p.innerHTML = char;
        p.style.display = "inline";
        p.style.color = "lightgray";

        let div = document.createElement("div");
        div.className = "characterContainer";
        div.appendChild(p);
        sentence.append(div);

        // sentence.append(p);
      }

    }
    // let character =

    // clear out input box:
    inputbox.value = ""
  });

  button.addEventListener("click", function() {
    sentence.innerHTML = "";
  });



}
