(function () {
    var themeToggleBtn = document.getElementById("themeToggleBtn");
    var hamburgerBtn = document.getElementById("hamburgerBtn");
    var navLinks = document.getElementById("navLinks");
    var backToTopBtn = document.getElementById("backToTopBtn");

    function loadSavedTheme() {
        var saved = "light";
        try {
            saved = localStorage.getItem("gamingCafeTheme") || "light";
        } catch (err) {
            saved = "light";
        }
        if (saved === "dark") {
            document.body.classList.add("dark-mode");
            if (themeToggleBtn) {
                themeToggleBtn.textContent = "Light Mode";
            }
        } else {
            document.body.classList.remove("dark-mode");
            if (themeToggleBtn) {
                themeToggleBtn.textContent = "Dark Mode";
            }
        }
    }

    loadSavedTheme();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            var isDark = document.body.classList.toggle("dark-mode");
            themeToggleBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
            try {
                localStorage.setItem("gamingCafeTheme", isDark ? "dark" : "light");
            } catch (err) {}
        });
    }

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener("click", function () {
            navLinks.classList.toggle("show");
        });
    }

    window.addEventListener("scroll", function () {
        if (!backToTopBtn) {
            return;
        }
        if (window.scrollY > 220) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    var sliderImage = document.getElementById("sliderImage");
    var sliderText = document.getElementById("sliderText");
    var prevSlideBtn = document.getElementById("prevSlideBtn");
    var nextSlideBtn = document.getElementById("nextSlideBtn");

    var slides = [
        {
            src: "images/board-games.jpg",
            alt: "Friends playing a board game at the cafe",
            caption: "Pick a game, order some chai, and settle in."
        },
        {
            src: "images/arcade-lounge.jpg",
            alt: "Row of glowing retro arcade cabinets and pinball machines",
            caption: "Free-play retro arcade cabinets and classic pinball alley."
        },
        {
            src: "images/board-games.jpg",
            alt: "Friends playing a strategy board game together",
            caption: "Chess, ludo, carrom, cards, and Uno for a relaxed game."
        }
    ];

    var currentSlide = 0;

    function updateSlider() {
        if (!sliderImage || !sliderText) {
            return;
        }
        sliderImage.src = slides[currentSlide].src;
        sliderImage.alt = slides[currentSlide].alt;
        sliderText.textContent = slides[currentSlide].caption;
    }

    if (prevSlideBtn && nextSlideBtn) {
        prevSlideBtn.addEventListener("click", function () {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        });
        nextSlideBtn.addEventListener("click", function () {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        });
    }

    var printMenuBtn = document.getElementById("printMenuBtn");
    if (printMenuBtn) {
        printMenuBtn.addEventListener("click", function () {
            window.print();
        });
    }

    var galleryItems = document.querySelectorAll(".gallery-item");
    var lightbox = document.getElementById("lightboxModal");
    var lightboxImg = document.getElementById("lightboxImg");
    var lightboxCaption = document.getElementById("lightboxCaption");
    var lightboxCloseBtn = document.getElementById("lightboxCloseBtn");

    if (galleryItems.length > 0 && lightbox && lightboxImg && lightboxCaption) {
        galleryItems.forEach(function (item) {
            item.addEventListener("click", function () {
                var img = item.querySelector("img");
                var title = item.querySelector("h3");
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                }
                if (title) {
                    lightboxCaption.textContent = title.textContent;
                }
                lightbox.classList.add("open");
            });
        });
    }

    if (lightboxCloseBtn && lightbox) {
        lightboxCloseBtn.addEventListener("click", function () {
            lightbox.classList.remove("open");
        });
        lightbox.addEventListener("click", function (e) {
            if (e.target === lightbox) {
                lightbox.classList.remove("open");
            }
        });
    }

    var bookingForm = document.getElementById("bookingForm");

    function validateField(field) {
        var errorSpan = document.getElementById(field.id + "Error");
        if (!errorSpan) {
            return true;
        }
        var val = field.value.trim();
        var msg = "";

        if (field.hasAttribute("required") && val === "") {
            msg = "This field is required.";
        } else if (field.id === "fullName" && val.length < 3) {
            msg = "Please enter at least 3 characters for your name.";
        } else if (field.id === "emailAddress" && val !== "") {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(val)) {
                msg = "Please enter a valid email address (example: name@example.in).";
            }
        } else if (field.id === "phoneNumber" && val !== "") {
            var phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(val)) {
                msg = "Please enter a 10-digit phone number using numbers only.";
            }
        } else if (field.id === "playerCount" && val !== "") {
            var count = parseInt(val, 10);
            if (isNaN(count) || count < 1 || count > 12) {
                msg = "Number of players must be between 1 and 12.";
            }
        } else if (field.id === "gameZone" && val === "") {
            msg = "Please select a gaming zone.";
        }

        errorSpan.textContent = msg;
        return msg === "";
    }

    if (bookingForm) {
        var watchedIds = ["fullName", "emailAddress", "phoneNumber", "bookingDate", "bookingTime", "playerCount", "gameZone"];
        watchedIds.forEach(function (id) {
            var input = document.getElementById(id);
            if (input) {
                input.addEventListener("input", function () {
                    validateField(input);
                });
                input.addEventListener("change", function () {
                    validateField(input);
                });
            }
        });

        bookingForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var allValid = true;
            watchedIds.forEach(function (id) {
                var input = document.getElementById(id);
                if (input && !validateField(input)) {
                    allValid = false;
                }
            });

            var statusBox = document.getElementById("formStatus");
            if (allValid && statusBox) {
                var nameVal = document.getElementById("fullName").value.trim();
                var zoneVal = document.getElementById("gameZone").value;
                var dateVal = document.getElementById("bookingDate").value;
                statusBox.textContent = "Booking confirmed for " + nameVal + " (" + zoneVal + " on " + dateVal + ")! We saved your table.";
                statusBox.className = "form-status success";
                bookingForm.reset();
            }
        });
    }
})();
