console.log("running")

let inputBox = document.getElementById("textInput");
let sentence = document.getElementById("sentence");

// inputBox.addEventListener("input", function(){
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

  // inputBox.addEventListener("compositionend", (event)=>{
  //   console.log("composition donw!");
  //   console.log(inputBox.value.splite(''));
  //
  //   let character = inputBox.value.splite('');
  //   for (let i = 0; i < character.length; i++){
  //     let char = chracters[i];
  //     //if we have an image for this character, append that image
  //     console.log("current char is", char);
  //     console.log("is", char, "in data?");
  //     console.log(data[char])
  //     if (data[char] != undefined){
  //       //we have image for this charset
  //       let char_data = data[char].appearance;
  //       console.log("char data", char_data)
  //       let numAppearancesForThisChar = char_data.length;
  //       let ranIdx = Math.floor(Math.random()*numAppearancesForThisChar)
  //       let ran_appearance = char_data[ranIdx]
  //       console.log(ran_appearance)
  //       let drawingPath = ran_appearance.drawing_path;
  //       console.log('path', drawingPath)
  //
  //       let img = document.createElement("img")
  //       img.src = drawingPath
  //       sentence.append(img)
  //     }
  //     else{
  //       //if no image is available, apend a normap p tag to the page
  //     }
  //     //if no image is available, apend a normap p tag to the page
  //     let p = document.createElement("p");
  //     p.innerHTML = charData.value;
  //     sentence.append(p)
  //   }
  //
  //
  //   inputBox.value = ""
  // })


  let characters = Object.keys(data);
  console.log(characters);
  for (let i = 0; i < characters.length; i++){
    let charEntry = document.createElement("div");
    charEntry.className = "characterEntry"
    // charEntry.style.textAlign = "center";

    let char  = characters[i];
    let charData = data[char];
    console.log(char);
    console.log(charData);

    let p = document.createElement("p");
    p.className = "character";
    p.innerHTML = char;
    charEntry.appendChild(p)
    // loop over appearance
    for (let j = 0; j < charData.appearance.length; j++){
      console.log(charData.appearance[j]);
      let appear = charData.appearance[j]
      let drawing = appear.drawing_path;
      let img = document.createElement("img");
      img.src = drawing;
      img.className = "strokes";
      document.body.appendChild(img);
      img.style.height = "100px";
      // img.style.textAlign = "center";
    }
    document.body.appendChild(p);
  }
}
