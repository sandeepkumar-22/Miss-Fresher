/* ==================================================
   MISS FRESHER 2K26
================================================== */


/* ==================================================
   GAME DATA
================================================== */

let playerName = "";

let selectedAnimal = "";

let selectedChallenge = "";

let cameraStream = null;

let capturedPhoto = "";



/* ==================================================
   SCREEN SWITCH
================================================== */

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(function(screen) {

            screen.classList.remove(
                "active"
            );

        });


    const target =
        document.getElementById(
            screenId
        );


    if (target) {

        target.classList.add(
            "active"
        );

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



/* ==================================================
   WELCOME
================================================== */

const nameInput =
    document.getElementById(
        "nameInput"
    );


const startButton =
    document.getElementById(
        "startButton"
    );


if (startButton) {

    startButton.addEventListener(
        "click",
        function() {

            const name =
                nameInput.value.trim();


            if (name === "") {

                alert(
                    "Please enter your name 😊"
                );

                nameInput.focus();

                return;

            }


            playerName =
                name;


            console.log(
                "Player:",
                playerName
            );


            showScreen(
                "round1Screen"
            );

        }
    );

}


/* ENTER KEY */

if (nameInput) {

    nameInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key ===
                "Enter"
            ) {

                event.preventDefault();

                startButton.click();

            }

        }
    );

}



/* ==================================================
   ROUND 1
================================================== */

const animalInput =
    document.getElementById(
        "animalInput"
    );


const animalReason =
    document.getElementById(
        "animalReason"
    );


const round1Next =
    document.getElementById(
        "round1Next"
    );


if (round1Next) {

    round1Next.addEventListener(
        "click",
        function() {

            const animal =
                animalInput.value.trim();


            if (animal === "") {

                alert(
                    "Tell us your animal spirit 🐾"
                );

                animalInput.focus();

                return;

            }


            selectedAnimal =
                animal;


            console.log(
                "Animal:",
                selectedAnimal
            );


            console.log(
                "Reason:",
                animalReason.value.trim()
            );


            showScreen(
                "round2Screen"
            );

        }
    );

}



/* ==================================================
   ROUND 2
================================================== */

const songButton =
    document.getElementById(
        "songButton"
    );


const nailsButton =
    document.getElementById(
        "nailsButton"
    );


const round2Next =
    document.getElementById(
        "round2Next"
    );


const challengeButtons =
    document.querySelectorAll(
        ".challenge-btn"
    );



/* SONG */

if (songButton) {

    songButton.addEventListener(
        "click",
        function() {

            selectedChallenge =
                "Sing a Song";


            challengeButtons.forEach(
                function(button) {

                    button.classList.remove(
                        "selected"
                    );

                }
            );


            songButton.classList.add(
                "selected"
            );

        }
    );

}



/* NAILS */

const nailsPhoto =
    document.getElementById(
        "nailsPhoto"
    );


const nailsPreview =
    document.getElementById(
        "nailsPreview"
    );


if (nailsButton) {

    nailsButton.addEventListener(
        "click",
        function() {

            selectedChallenge =
                "Show Your Nails";


            challengeButtons.forEach(
                function(button) {

                    button.classList.remove(
                        "selected"
                    );

                }
            );


            nailsButton.classList.add(
                "selected"
            );


            if (nailsPhoto) {

                nailsPhoto.click();

            }

        }
    );

}



/* NAIL PHOTO */

if (nailsPhoto) {

    nailsPhoto.addEventListener(
        "change",
        function() {

            const file =
                this.files[0];


            if (!file) {

                return;

            }


            const imageURL =
                URL.createObjectURL(
                    file
                );


            nailsPreview.src =
                imageURL;


            nailsPreview.style.display =
                "block";


            setTimeout(
                function() {

                    round2Next.scrollIntoView({

                        behavior: "smooth",

                        block: "center"

                    });

                },
                200
            );

        }
    );

}



/* ROUND 2 CONTINUE */

if (round2Next) {

    round2Next.addEventListener(
        "click",
        function() {

            if (
                selectedChallenge === ""
            ) {

                alert(
                    "Choose one challenge first 😊"
                );

                return;

            }


            showScreen(
                "round3Screen"
            );

        }
    );

}



/* ==================================================
   ROUND 3 — LIVE CAMERA
================================================== */

const photoButton =
    document.getElementById(
        "photoButton"
    );


const cameraBox =
    document.getElementById(
        "cameraBox"
    );


const cameraVideo =
    document.getElementById(
        "cameraVideo"
    );


const captureButton =
    document.getElementById(
        "captureButton"
    );


const cameraCanvas =
    document.getElementById(
        "cameraCanvas"
    );


const hairstylePreview =
    document.getElementById(
        "hairstylePreview"
    );


const round3Next =
    document.getElementById(
        "round3Next"
    );


const finalGirl =
    document.getElementById(
        "finalGirl"
    );



/* OPEN CAMERA */

if (photoButton) {

    photoButton.addEventListener(
        "click",
        async function() {

            try {

                cameraStream =
                    await navigator
                    .mediaDevices
                    .getUserMedia({

                        video: {

                            facingMode:
                                "user"

                        },

                        audio: false

                    });


                cameraVideo.srcObject =
                    cameraStream;


                cameraVideo.play();


                cameraBox.classList.remove(
                    "hidden"
                );


                photoButton.innerHTML =
                    "✓ CAMERA ACTIVE";


            }

            catch (error) {

                console.error(
                    "Camera error:",
                    error
                );


                alert(
                    "Camera permission Allow karo."
                );

            }

        }
    );

}



/* TAKE PHOTO */

if (captureButton) {

    captureButton.addEventListener(
        "click",
        function() {

            if (
                !cameraStream ||
                !cameraVideo ||
                !cameraCanvas
            ) {

                return;

            }


            const context =
                cameraCanvas
                .getContext(
                    "2d"
                );


            cameraCanvas.width =
                cameraVideo.videoWidth;


            cameraCanvas.height =
                cameraVideo.videoHeight;


            context.drawImage(

                cameraVideo,

                0,
                0,

                cameraCanvas.width,
                cameraCanvas.height

            );


            capturedPhoto =
                cameraCanvas.toDataURL(
                    "image/jpeg",
                    0.92
                );


            hairstylePreview.src =
                capturedPhoto;


            hairstylePreview.style.display =
                "block";


            /* STOP CAMERA */

            cameraStream
                .getTracks()
                .forEach(
                    function(track) {

                        track.stop();

                    }
                );


            cameraStream =
                null;


            cameraVideo.srcObject =
                null;


            cameraBox.classList.add(
                "hidden"
            );


            photoButton.innerHTML =
                "✓ PHOTO CAPTURED";


            round3Next.classList.add(
                "show"
            );


            setTimeout(
                function() {

                    round3Next.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "center"

                    });

                },
                200
            );

        }
    );

}



/* ==================================================
   ROUND 3 CONTINUE
================================================== */

if (round3Next) {

    round3Next.addEventListener(
        "click",
        function() {


            if (
                capturedPhoto !== ""
            ) {

                finalGirl.src =
                    capturedPhoto;

            }


            showScreen(
                "announcementScreen"
            );


            startAnnouncement();

        }
    );

}



/* ==================================================
   ANNOUNCEMENT
================================================== */

function startAnnouncement() {

    const shraddha =
        document.getElementById(
            "shraddhaReveal"
        );


    const sorry =
        document.getElementById(
            "sorryReveal"
        );


    const final =
        document.getElementById(
            "finalReveal"
        );


    const sorryVideo =
        document.getElementById(
            "sorryVideo"
        );


    const winnerName =
        document.getElementById(
            "winnerName"
        );



    if (
        !shraddha ||
        !sorry ||
        !final
    ) {

        return;

    }



    /* RESET */

    shraddha.classList.remove(
        "hidden"
    );


    sorry.classList.add(
        "hidden"
    );


    final.classList.add(
        "hidden"
    );


    if (sorryVideo) {

        sorryVideo.pause();

        sorryVideo.currentTime =
            0;

    }



    /* ==================================================
       SHRADDHA
    ================================================== */

    setTimeout(
        function() {

            shraddha.classList.add(
                "hidden"
            );


            sorry.classList.remove(
                "hidden"
            );


            if (sorryVideo) {

                sorryVideo.currentTime =
                    0;


                const playPromise =
                    sorryVideo.play();


                if (
                    playPromise !==
                    undefined
                ) {

                    playPromise.catch(
                        function(error) {

                            console.log(
                                "Video blocked:",
                                error
                            );

                        }
                    );

                }

            }

        },
        2500
    );



    /* ==================================================
       FINAL WINNER
    ================================================== */

    setTimeout(
        function() {

            if (sorryVideo) {

                sorryVideo.pause();

            }


            sorry.classList.add(
                "hidden"
            );


            if (winnerName) {

                winnerName.innerText =
                    playerName;

            }


            final.classList.remove(
                "hidden"
            );

        },
        6500
    );

}