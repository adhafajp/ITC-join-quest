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



  // 🌡️ Cuaca
  function cuacaKita() {
    // Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let codee = "a6b62c83";
        let code = "0b6132af";
        let codeApi = "ec774b5b";
        let Apicode = "eab64f5c";
        let key = codeApi + code + Apicode + codee;
        // Gunakan koordinat tersebut untuk mendapatkan data cuaca dari OpenWeatherMap
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=id`)
          .then(res => res.json())
          .then(data => {
            let temp = data.main.temp;
            let description = data.weather[0].description;
            let city = data.name;
  
            document.querySelector("#weather").innerText = `Cuaca di ${city}: ${description}, ${temp}°C`;
          })
          .catch(() => {
            document.querySelector("#weather").innerText = "Gagal memuat cuaca";
          });
      }, 
      function(error) {
        console.error("Error Geolocation:", error);
        document.querySelector("#weather").innerText = "Gagal mendapatkan lokasi";
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    } else {
      document.querySelector("#weather").innerText = "Geolocation tidak didukung di browser ini";
    }
  };
  
  cuacaKita();
  
  


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
