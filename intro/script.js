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
let des1 = document.getElementById("des1");
let des2 = document.getElementById("des2");
let des3 = document.getElementById("des3");
let des4 = document.getElementById("des4");
let des5 = document.getElementById("des5");
let des6 = document.getElementById("des6");

chinese.addEventListener("click", function() {
  console.log("CHINESE")
  subtitle.innerHTML="看人工智能如何诠释手写输入法里的中文文字"
  intro.innerHTML="在手机上书写中文的最常用输入方式之一是使用手指进行手写输入。<span style='font-size:25px; font-style:italic; font-weight:bold;'>《What Do (AI) See》</span>是在收集这种手写输入与人工智能的预测输出的背景下进行的一系列作品。这一系列作品包括将这种新形式的字符应用于实体书籍中，以及在电子设备中引入基于这种新形式字符的词库。该项目建立在一个数据库的基础上，编纂了通过人工智能识别成现有中文字符的包含不规则笔画组合的新型中文字符。它旨在探索一种由人与机器协作共同创造的全新书写方式。"
  des1.innerHTML="我采取的第一步是让一些人使用iPhone的手写输入法写下相同的信息，并记录下他们的写字过程。当将他们的写字过程进行对比时，很容易发现每个人都有不同的写字习惯，而手写输入法对他们手写的文字给出了不同的猜测。";
  des2.innerHTML="在第二步中，我关注的是手写输入法的人工智能在写入特定文字时，随着笔画的改变如何给出不同的猜测。在完整写完一个文字的过程中，未完成的笔画组合也被人工智能识别为不同的文字。";
  des3.innerHTML="在收集了更多人们手写不同内容的过程后，我开始处理录制的视频，提取每个人工智能进行识别的瞬间，并将其作为单独的案例进行分析。";
  des4.innerHTML="接着，我使用Python将截取的图像组合成文件夹，以人工智能识别的文字作为文件夹名称，每个文件夹中包含手写部分的图像和人工智能第一个猜测的文字。";
  des5.innerHTML="由于在收集过程中，人工智能在不同情况下会生成相同的文字，因此我还使用了一个JSON文件来合并被识别的不同文字，使得一个文字可以以多种不同的形式被书写。在接下来的步骤中，将随机选择并展示这些具有多种形式的文字。";
  des6.innerHTML="现在，就轮到来你使用拼音输入法在输入框中输入中文，并观察你想要输入的文字会以哪种形式出现在我的作品中。点击<span style='font-size:18px; font-weight:bold;'>Clear</span>按钮即可清空文本框。（如果数据库中尚未收集到某个文字，它将以原始形式显示。数据库仍在不断完善中，请谅解。）";
});

english.addEventListener("click", function() {
  console.log("ENGLISH")
  subtitle.innerHTML="How AI Perceives Chinese Characters That Uses Handwriting Input Methods";
  intro.innerHTML="One of the most common input methods for writing Chinese on a phone is to use a finger to handwrite the characters. <span style='font-size:25px; font-style:italic; font-weight:bold;'>What Do (AI) See</span> is a series of works conducted in the context of a collection of this handwritten input alongside AI’s predictive output, which includes the implementation of this new form of characters in physical books and the introduction of a new thesaurus in electronic devices. This project is based on a database, compiling stroke compositions that the AI recognizes as existing Chinese characters, despite the irregularity of stroke combinations. It sheds light on a new form of writing that is being invented by a human-machine collaboration."
  des1.innerHTML="The first step I took was to ask a number of people to write the same message using iPhone's handwriting input method, and recorded their writing process. When putting their writing processes together for comparison, it's easy to discover that each person has different writing habits and the handwriting input method gives different guesses to their handwritten characters."
  des2.innerHTML="At the second step, I focused on how the AI of the handwriting input method gives different guesses as the stroke changes when one writes a particular character. In the process of completing a character, the unfinished combinations of strokes are also recognized by the AI as different characters.";
  des3.innerHTML="After collecting the process of handwriting different contents from more people, I started to work on the recorded videos, extracting each moment when the AI made the recognition and analyzing it as individual cases.";
  des4.innerHTML="Afterwards, I used Python to assemble the captured images into folders, using the AI-recognized character as the folder name, with each folder containing both the handwritten part of the image and the first guess of character that the AI made.";
  des5.innerHTML="Since the AI will generate the same character in different cases during the collection, I also used a json file to merge different characters which are recognized, such that one character will be written in many different forms. In the next step, these characters that have multiple forms will be randomly selected and presented.";
  des6.innerHTML="Now, it is time for you to try using the Pinyin Input Method to type out Chinese characters in the input box and see what form the character you want to type will appear in my work. Press the <span style='font-size:18px; font-weight:bold;'>Clear</span> button to empty the text box. (If there is a character that has not yet been collected in the database, it will be shown in its original form. The database is still being continuously improved. Thank you for your understanding.)";
});
