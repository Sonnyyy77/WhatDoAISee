console.log("running")

let inputbox = document.getElementById("textInput")
let sentence = document.getElementById("sentence")
let button = document.getElementById("clearStc")
let chinese = document.getElementById("Chinese")
let english = document.getElementById("English")


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

let intro = document.getElementById("introduction");
let subtitle = document.getElementById("subtitle");

chinese.addEventListener("click", function() {
  console.log("CHINESE")
  subtitle.innerHTML="看人工智能如何诠释手写输入法里的中文文字"
  intro.innerHTML="在手机上书写中文的最常用输入方式之一是使用手指进行手写输入。<span style='font-size:25px; font-style:italic; font-weight:bold;'>《What Do (AI) See》</span>是在收集这种手写输入与人工智能的预测输出的背景下进行的一系列作品。这一系列作品包括将这种新形式的字符应用于实体书籍中，以及在电子设备中引入基于这种新形式字符的词库。该项目建立在一个数据库的基础上，编纂了通过人工智能识别成现有中文字符的包含不规则笔画组合的新型中文字符。它旨在探索一种由人与机器协作共同创造的全新书写方式。"
});

english.addEventListener("click", function() {
  console.log("ENGLISH")
  subtitle.innerHTML="How AI Perceives Chinese Characters That Uses Handwriting Input Methods";
  intro.innerHTML="One of the most common input methods for writing Chinese on a phone is to use a finger to handwrite the characters. <span style='font-size:25px; font-style:italic; font-weight:bold;'>What Do (AI) See</span> is a series of works conducted in the context of a collection of this handwritten input alongside AI’s predictive output, which includes the implementation of this new form of characters in physical books and the introduction of a new thesaurus in electronic devices. This project is based on a database, compiling stroke compositions that the AI recognizes as existing Chinese characters, despite the irregularity of stroke combinations. It sheds light on a new form of writing that is being invented by a human-machine collaboration."
});
