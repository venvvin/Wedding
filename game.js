document.addEventListener("DOMContentLoaded", () => {
    const SCENES = {
        countries: {
            sk: "images/country-sk.png",
            lu: "images/country-lu.png",
            it: "images/country-it.png"
        },
        room: "images/room.png",
        zapcha: "images/zapcha.png",
        airports: {
            sk: "images/airport-sk.png",
            lu: "images/airport-lu.png",
            it: "images/airport-it.png"
        },
        airportInside: "images/airport-inside.png",
        checkin: "images/checkin.png",
        airplaneInside: "images/airplane-inside.png",
        airplaneStart: "images/airplane-start.png",
        airplaneFly: "images/airplane-fly.png",
        airplaneFinish: "images/airplane-finish.png",
        bus: "images/bus.png",
        busFinish: "images/bus-finish.png",
        couple: "images/couple.png"
    };

    const introScreen = document.getElementById("introScreen");
    const storyScreen = document.getElementById("storyScreen");
    const packingScreen = document.getElementById("packingScreen");
    const roadScreen = document.getElementById("roadScreen");
    const securityScreen = document.getElementById("securityScreen");
    const finalScreen = document.getElementById("finalScreen");

    const beginJourneyBtn = document.getElementById("beginJourneyBtn");
    const finishPackingBtn = document.getElementById("finishPackingBtn");
    const resetSuitcaseBtn = document.getElementById("resetSuitcaseBtn");
    const repackBtn = document.getElementById("repackBtn");
    const downloadPrizeBtn = document.getElementById("downloadPrizeBtn");

    const guestNameInput = document.getElementById("guestName");
    const guestCountrySelect = document.getElementById("guestCountry");

    const storyImage = document.getElementById("storyImage");
    const storyText = document.getElementById("storyText");
    const storyNextBtn = document.getElementById("storyNextBtn");

    const packingItems = document.getElementById("packingItems");
    const suitcaseGrid = document.getElementById("suitcaseGrid");
    const suitcaseCount = document.getElementById("suitcaseCount");

    const roadCanvas = document.getElementById("roadCanvas");
    const roadCtx = roadCanvas.getContext("2d");
    const roadProgressText = document.getElementById("roadProgressText");
    const roadHitsText = document.getElementById("roadHitsText");

    const securityMessage = document.getElementById("securityMessage");
    const scannerSuitcase = document.getElementById("scannerSuitcase");
    const scannerLight = document.getElementById("scannerLight");
    const securityRetryWrap = document.getElementById("securityRetryWrap");

    const finalPersonalText = document.getElementById("finalPersonalText");

    const stepIndicators = [
        document.getElementById("stepIndicator1"),
        document.getElementById("stepIndicator2"),
        document.getElementById("stepIndicator3"),
        document.getElementById("stepIndicator4")
    ];

    let playerName = "";
    let playerCountry = "sk";
    let packedItems = [];

    let currentStorySlides = [];
    let currentStoryIndex = 0;
    let storyAfterFinish = null;

    let roadAnimationId = null;
    let roadRunning = false;
    let roadProgress = 0;
    let roadHits = 0;
    let spawnTick = 0;
    let trafficCars = [];
    let laneMarkers = [];
    let keys = { ArrowUp: false, ArrowDown: false };

    const MAX_ITEMS = 8;
    const MAX_HITS = 3;
    const suitcaseBadItems = ["water", "food", "danger"];

    const packingData = [
        { id: "water", label: "Water", icon: "💧" },
        { id: "suit", label: "Wedding outfit", icon: "👔" },
        { id: "gift", label: "Gift", icon: "🎁" },
        { id: "food", label: "Food", icon: "🍎" },
        { id: "hygiene", label: "Hygiene", icon: "🪥" },
        { id: "cosmetics", label: "Cosmetics", icon: "💄" },
        { id: "clothes", label: "Extra clothes", icon: "👕" },
        { id: "phone", label: "Phone", icon: "📱" },
        { id: "passport", label: "Passport", icon: "🛂" },
        { id: "keys", label: "Keys", icon: "🔑" },
        { id: "danger", label: "Suspicious item", icon: "❗" }
    ];

    const playerBus = {
        x: 180,
        lane: 1,
        width: 120,
        height: 70
    };

    const lanes = [120, 220, 320];

    function showScreen(screen) {
        [introScreen, storyScreen, packingScreen, roadScreen, securityScreen, finalScreen].forEach((el) => {
            if (el) el.classList.add("hidden");
        });
        screen.classList.remove("hidden");
    }

    function setStep(index) {
        stepIndicators.forEach((step, i) => {
            step.classList.toggle("active", i <= index);
            step.classList.toggle("current", i === index);
        });
    }

    function startStory(slides, onFinish) {
        currentStorySlides = slides;
        currentStoryIndex = 0;
        storyAfterFinish = onFinish;
        showScreen(storyScreen);
        renderStorySlide();
    }

    function renderStorySlide() {
        const slide = currentStorySlides[currentStoryIndex];
        storyImage.src = slide.image;
        storyText.textContent = slide.text;
        storyNextBtn.textContent = currentStoryIndex === currentStorySlides.length - 1 ? "Continue" : "Next";
    }

    function nextStorySlide() {
        if (currentStoryIndex < currentStorySlides.length - 1) {
            currentStoryIndex += 1;
            renderStorySlide();
            return;
        }

        if (typeof storyAfterFinish === "function") {
            storyAfterFinish();
        }
    }

    function renderPackingItems() {
        packingItems.innerHTML = "";
        suitcaseGrid.innerHTML = "";

        packingData.forEach((item) => {
            const tile = document.createElement("button");
            tile.type = "button";
            tile.className = "pack-item";
            tile.dataset.id = item.id;
            tile.innerHTML = `
        <div class="pack-item-image-wrap">
          <span class="pack-item-emoji">${item.icon}</span>
        </div>
        <span class="pack-item-label">${item.label}</span>
      `;
            tile.addEventListener("click", () => addToSuitcase(item.id));
            packingItems.appendChild(tile);
        });

        for (let i = 0; i < MAX_ITEMS; i++) {
            const slot = document.createElement("div");
            slot.className = "suitcase-slot";
            suitcaseGrid.appendChild(slot);
        }

        updateSuitcaseUI();
    }

    function updateSuitcaseUI() {
        const slots = suitcaseGrid.querySelectorAll(".suitcase-slot");

        slots.forEach((slot, index) => {
            slot.innerHTML = "";
            const itemId = packedItems[index];
            if (!itemId) return;

            const item = packingData.find((x) => x.id === itemId);
            if (!item) return;

            const div = document.createElement("button");
            div.type = "button";
            div.className = "suitcase-item";
            div.innerHTML = `<span class="suitcase-item-emoji">${item.icon}</span>`;
            div.addEventListener("click", () => removeFromSuitcase(index));
            slot.appendChild(div);
        });

        suitcaseCount.textContent = `${packedItems.length} / ${MAX_ITEMS}`;

        packingItems.querySelectorAll(".pack-item").forEach((btn) => {
            const id = btn.dataset.id;
            const used = packedItems.includes(id);
            btn.disabled = used;
            btn.classList.toggle("used", used);
        });
    }

    function addToSuitcase(itemId) {
        if (packedItems.length >= MAX_ITEMS) return;
        if (packedItems.includes(itemId)) return;
        packedItems.push(itemId);
        updateSuitcaseUI();
    }

    function removeFromSuitcase(index) {
        packedItems.splice(index, 1);
        updateSuitcaseUI();
    }

    function resetSuitcase() {
        packedItems = [];
        updateSuitcaseUI();
    }

    function openPackingScreen() {
        showScreen(packingScreen);
        setStep(0);
    }

    function beginJourney() {
        playerName = guestNameInput.value.trim();
        playerCountry = guestCountrySelect?.value || "sk";

        if (!playerName) {
            alert("Enter your name first.");
            return;
        }

        startStory(
            [
                {
                    image: SCENES.countries[playerCountry],
                    text: `${playerName}, your journey begins from here.`
                },
                {
                    image: SCENES.room,
                    text: `Before leaving for the wedding, you need to pack your suitcase carefully.`
                }
            ],
            openPackingScreen
        );
    }

    function finishPacking() {
        if (packedItems.length < MAX_ITEMS) {
            alert("Put 8 items into the suitcase first.");
            return;
        }

        startStory(
            [
                {
                    image: SCENES.zapcha,
                    text: `You are on the way now. Try to avoid traffic and arrive at the airport in time.`
                }
            ],
            startRoadLevel
        );
    }

    function startRoadLevel() {
        showScreen(roadScreen);
        setStep(1);

        roadRunning = true;
        roadProgress = 0;
        roadHits = 0;
        spawnTick = 0;
        trafficCars = [];
        laneMarkers = Array.from({ length: 14 }, (_, i) => ({ x: i * 100 }));
        playerBus.lane = 1;

        roadHitsText.textContent = "0";
        roadProgressText.textContent = "0%";

        if (roadAnimationId) cancelAnimationFrame(roadAnimationId);
        roadLoop();
    }

    function roadLoop() {
        if (!roadRunning) return;

        updateRoad();
        drawRoad();

        if (roadProgress >= 100) {
            roadRunning = false;
            cancelAnimationFrame(roadAnimationId);
            startAirportStory();
            return;
        }

        roadAnimationId = requestAnimationFrame(roadLoop);
    }

    function updateRoad() {
        if (keys.ArrowUp && playerBus.lane > 0) {
            playerBus.lane -= 1;
            keys.ArrowUp = false;
        }

        if (keys.ArrowDown && playerBus.lane < lanes.length - 1) {
            playerBus.lane += 1;
            keys.ArrowDown = false;
        }

        laneMarkers.forEach((mark) => {
            mark.x -= 8;
            if (mark.x < -80) mark.x = roadCanvas.width + 80;
        });

        spawnTick += 1;
        if (spawnTick > 38) {
            spawnTick = 0;
            const lane = Math.floor(Math.random() * 3);
            trafficCars.push({
                x: roadCanvas.width + 60,
                y: lanes[lane],
                width: 100,
                height: 58,
                speed: 7 + Math.random() * 2,
                color: ["#a36f5e", "#7f8fa2", "#9d8772"][Math.floor(Math.random() * 3)]
            });
        }

        trafficCars.forEach((car) => {
            car.x -= car.speed;
        });

        trafficCars = trafficCars.filter((car) => car.x + car.width > -60);

        const playerY = lanes[playerBus.lane];

        for (const car of trafficCars) {
            const hit =
                playerBus.x < car.x + car.width &&
                playerBus.x + playerBus.width > car.x &&
                playerY < car.y + car.height &&
                playerY + playerBus.height > car.y;

            if (hit) {
                roadHits += 1;
                roadHitsText.textContent = String(roadHits);
                car.x = -999;

                if (roadHits >= MAX_HITS) {
                    roadRunning = false;
                    cancelAnimationFrame(roadAnimationId);
                    startRoadLevel();
                    return;
                }
            }
        }

        roadProgress += 0.45;
        roadProgressText.textContent = `${Math.min(100, Math.floor(roadProgress))}%`;
    }

    function drawRoundedRect(ctx, x, y, width, height, radius, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
    }

    function drawRoad() {
        roadCtx.clearRect(0, 0, roadCanvas.width, roadCanvas.height);

        const sky = roadCtx.createLinearGradient(0, 0, 0, roadCanvas.height);
        sky.addColorStop(0, "#e7edf3");
        sky.addColorStop(1, "#f8f2ea");
        roadCtx.fillStyle = sky;
        roadCtx.fillRect(0, 0, roadCanvas.width, roadCanvas.height);

        roadCtx.fillStyle = "#d2debf";
        roadCtx.fillRect(0, 0, roadCanvas.width, 90);
        roadCtx.fillRect(0, roadCanvas.height - 90, roadCanvas.width, 90);

        roadCtx.fillStyle = "#70757b";
        roadCtx.fillRect(0, 90, roadCanvas.width, roadCanvas.height - 180);

        roadCtx.strokeStyle = "rgba(255,255,255,0.9)";
        roadCtx.lineWidth = 4;
        roadCtx.setLineDash([35, 24]);

        laneMarkers.forEach((mark) => {
            roadCtx.beginPath();
            roadCtx.moveTo(mark.x, 195);
            roadCtx.lineTo(mark.x + 60, 195);
            roadCtx.stroke();

            roadCtx.beginPath();
            roadCtx.moveTo(mark.x, 295);
            roadCtx.lineTo(mark.x + 60, 295);
            roadCtx.stroke();
        });

        roadCtx.setLineDash([]);

        trafficCars.forEach((car) => {
            drawRoundedRect(roadCtx, car.x, car.y, car.width, car.height, 12, car.color);
            roadCtx.fillStyle = "rgba(255,255,255,0.75)";
            roadCtx.fillRect(car.x + 12, car.y + 10, 24, 12);

            roadCtx.fillStyle = "#1f1f1f";
            roadCtx.beginPath();
            roadCtx.arc(car.x + 18, car.y + car.height, 7, 0, Math.PI * 2);
            roadCtx.arc(car.x + car.width - 18, car.y + car.height, 7, 0, Math.PI * 2);
            roadCtx.fill();
        });

        const playerY = lanes[playerBus.lane];
        drawRoundedRect(roadCtx, playerBus.x, playerY, playerBus.width, playerBus.height, 16, "#59718e");
        roadCtx.fillStyle = "rgba(255,255,255,0.82)";
        roadCtx.fillRect(playerBus.x + 14, playerY + 10, 30, 14);
        roadCtx.fillRect(playerBus.x + 52, playerY + 10, 30, 14);

        roadCtx.fillStyle = "#1f1f1f";
        roadCtx.beginPath();
        roadCtx.arc(playerBus.x + 22, playerY + playerBus.height, 8, 0, Math.PI * 2);
        roadCtx.arc(playerBus.x + playerBus.width - 22, playerY + playerBus.height, 8, 0, Math.PI * 2);
        roadCtx.fill();
    }

    function startAirportStory() {
        startStory(
            [
                {
                    image: SCENES.airports[playerCountry],
                    text: `You arrived at the airport.`
                },
                {
                    image: SCENES.airportInside,
                    text: `Inside the terminal, the journey feels very real now.`
                },
                {
                    image: SCENES.checkin,
                    text: `Now your suitcase has to pass the security check.`
                }
            ],
            startSecurityScreen
        );
    }

    function startSecurityScreen() {
        showScreen(securityScreen);
        setStep(2);

        securityRetryWrap.classList.add("hidden");
        scannerSuitcase.classList.remove("move");
        scannerLight.classList.remove("ok", "fail");
        securityMessage.textContent = "Security check in progress...";

        setTimeout(() => {
            scannerSuitcase.classList.add("move");
        }, 300);

        setTimeout(() => {
            const hasBad = packedItems.some((item) => suitcaseBadItems.includes(item));

            if (hasBad) {
                scannerLight.classList.add("fail");
                securityMessage.textContent = "There is something forbidden in your suitcase. You need to repack.";
                securityRetryWrap.classList.remove("hidden");
            } else {
                scannerLight.classList.add("ok");
                securityMessage.textContent = "Everything is fine. You can board the plane.";

                setTimeout(() => {
                    startFinalStory();
                }, 1800);
            }
        }, 1800);
    }

    function startFinalStory() {
        startStory(
            [
                {
                    image: SCENES.airplaneInside,
                    text: `${playerName} is finally on board.`
                },
                {
                    image: SCENES.airplaneStart,
                    text: `The plane is getting ready to take off.`
                },
                {
                    image: SCENES.airplaneFly,
                    text: `The journey continues through the sky.`
                },
                {
                    image: SCENES.airplaneFinish,
                    text: `You have landed safely.`
                },
                {
                    image: SCENES.bus,
                    text: `A bus is waiting for the guests.`
                },
                {
                    image: SCENES.busFinish,
                    text: `The final part of the journey begins.`
                },
                {
                    image: SCENES.couple,
                    text: `${playerName}, you made it. Your prize: a dance with the newlyweds.`
                }
            ],
            openFinalScreen
        );
    }

    function openFinalScreen() {
        showScreen(finalScreen);
        setStep(3);
        finalPersonalText.textContent = `${playerName}, welcome to Rimini.`;
    }

    function downloadPrize() {
        const prizeWindow = window.open("", "_blank");
        if (!prizeWindow) return;

        prizeWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Wedding Journey Pass</title>
        <style>
          body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f7f3ee;
            font-family: Georgia, serif;
            color: #2f2f2f;
          }
          .card {
            width: 850px;
            max-width: 92%;
            background: #fff;
            border: 1px solid #ddd2c7;
            border-radius: 28px;
            padding: 56px;
            box-shadow: 0 18px 40px rgba(0,0,0,0.08);
            text-align: center;
          }
          .kicker {
            margin: 0 0 10px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #8a827b;
            font-size: 14px;
          }
          h1 {
            margin: 0 0 18px;
            font-size: 52px;
            font-weight: 500;
          }
          .name {
            font-size: 38px;
            margin: 18px 0;
            color: #7f9788;
            font-weight: 700;
          }
          .reward {
            font-size: 28px;
            margin: 20px 0 8px;
          }
          .meta {
            font-size: 22px;
            margin: 8px 0;
          }
          .footer {
            margin-top: 30px;
            color: #8a827b;
            font-size: 20px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <p class="kicker">Reward</p>
          <h1>Wedding Journey Pass</h1>
          <div class="name">${playerName}</div>
          <p class="reward">A dance with the newlyweds</p>
          <p class="meta">Destination: Rimini</p>
          <p class="footer">See you at the celebration</p>
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        <\/script>
      </body>
      </html>
    `);

        prizeWindow.document.close();
    }

    beginJourneyBtn.addEventListener("click", beginJourney);
    storyNextBtn.addEventListener("click", nextStorySlide);
    finishPackingBtn.addEventListener("click", finishPacking);
    resetSuitcaseBtn.addEventListener("click", resetSuitcase);
    repackBtn.addEventListener("click", () => {
        scannerSuitcase.classList.remove("move");
        scannerLight.classList.remove("ok", "fail");
        openPackingScreen();
    });
    downloadPrizeBtn.addEventListener("click", downloadPrize);

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            keys[e.key] = true;
            e.preventDefault();
        }
    });

    renderPackingItems();
});