document.addEventListener("DOMContentLoaded", function () {
    // Link Ke Media Sosial
    document.querySelectorAll(".btn-box .btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            const url = btn.getAttribute("data-link");
            if (url) {
                window.open(url, "_blank");
            }
        });
    });


    // 🌙 Mode Gelap/Terang
    let switchmode = localStorage.getItem("switchmode");
    const themeSwitch = document.querySelector(".theme-switch");

    const enableSwitchmode = () => {
        document.body.classList.add("switchmode");
        localStorage.setItem("switchmode", "active");
    };

    const disableSwitchmode = () => {
        document.body.classList.remove("switchmode");
        localStorage.setItem("switchmode", null);
    };

    if(switchmode === "active") {
        enableSwitchmode();
    }

    themeSwitch.addEventListener("click", () => {
        switchmode = localStorage.getItem("switchmode");
        switchmode !== "active" ? enableSwitchmode() : disableSwitchmode();
    });


    // 📝 Efek Teks Auto-Typing
    const words = ["Aspiring AI Researcher", "Aspiring Data Scientist", "AI Enthusiast"];
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