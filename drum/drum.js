document.addEventListener("DOMContentLoaded", function () {
  // 🥁 Virtual Drum
  const drumSounds = {
    w: "sounds/tom-1.mp3",
    a: "sounds/tom-2.mp3",
    s: "sounds/tom-3.mp3",
    d: "sounds/tom-4.mp3",
    j: "sounds/snare.mp3",
    k: "sounds/crash.mp3",
    l: "sounds/kick-bass.mp3"
  };

  let clickCount = 0;

  const clickDisplay = document.getElementById("click-count");
  clickDisplay.innerText = `Drum clicks: ${clickCount}`;

  document.querySelectorAll(".drum").forEach((button) => {
    button.addEventListener("click", () => handleDrumInput(button.innerHTML));
  });

  document.addEventListener("keypress", (event) => {
    handleDrumInput(event.key.toLowerCase());
  });

  function handleDrumInput(key) {
    if (drumSounds[key]) {
      playSound(drumSounds[key]);
      buttonAnimation(key);
      incrementClickCount();
    }
  }

  function playSound(audioSrc) {
    const sound = new Audio(audioSrc);
    sound.play();
  }

  function buttonAnimation(key) {
    const activeButton = document.querySelector("." + key);
    if (activeButton) {
      activeButton.classList.add("pressed");
      setTimeout(() => activeButton.classList.remove("pressed"), 100);
    }
  }

  function incrementClickCount() {
    clickCount++;
    clickDisplay.innerText = `Drum clicks: ${clickCount}`;

    clickDisplay.classList.add("animate","bounce");
    
    setTimeout(() => {
      clickDisplay.classList.remove("animate","bounce");
    }, 100);

    if (clickCount >= 10000) {
      clickDisplay.style.fontSize = "40px";
    } else if (clickCount >= 500) {
      clickDisplay.style.fontSize = "35px";
    } else if (clickCount >= 250) {
      clickDisplay.style.fontSize = "30px";
    } else if (clickCount >= 100) {
      clickDisplay.style.fontSize = "25px";
    } else if (clickCount >= 50) {
      clickDisplay.style.fontSize = "22px";
    } else if (clickCount >= 20) {
      clickDisplay.style.fontSize = "20px";
    } else {
      clickDisplay.style.fontSize = "18px";
    }
  }


  // 🌙 Mode Gelap/Terang
  let switchmode = localStorage.getItem("switchmode");
  const themeSwitch = document.querySelector(".theme-switch");

  const enableSwitchmode = () => {
      document.body.classList.add("switchmode");
      localStorage.setItem("switchmode", "active");
  };

  const disableSwitchmode = () => {
      document.body.classList.remove("switchmode");
      localStorage.removeItem("switchmode");
  };

  if(switchmode === "active") {
      enableSwitchmode();
  }

  themeSwitch.addEventListener("click", () => {
      switchmode = localStorage.getItem("switchmode");
      switchmode !== "active" ? enableSwitchmode() : disableSwitchmode();
  });


  // 📝 Efek Teks Auto-Typing Judul
  const words = ["Mini 🥁 Drum", "Virtual 🥁 Drum"];
  let wordIndex = 0;
  let charIndex = 0;
  let typingElement = document.querySelector("#auto-type");

  function type() {
      if (charIndex < words[wordIndex].length) {
          typingElement.textContent += words[wordIndex].charAt(charIndex);
          charIndex++;
          setTimeout(type, 100);
      } else {
          setTimeout(erase, 1000);
      }
  }

  function erase() {
      if (charIndex > 0) {
          typingElement.textContent = words[wordIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(erase, 50);
      } else {
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, 500);
      }
  }

  type();

});
