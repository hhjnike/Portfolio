const works = [
    {
        title: "광명 유스필 오케스트라\n창단 및 제1회 연주회 포스터 & 리플렛",
        tool: "일러스트레이터 · 인디자인 ｜ 편집디자인",
        image: "img/preview1.png"
    },
    {
        title: "광명 유스필 오케스트라\n정기연주회 포스터 & 리플렛",
        tool: "일러스트레이터 · 인디자인 ｜ 편집디자인",
        image: "img/preview2.png"
    },
    {
        title: "샤넬 리플렛 디자인",
        tool: "인디자인 · 일러스트레이터 ｜ 리플렛 디자인",
        image: "img/preview3.png"
    },
    {
        title: "우아한 거짓말 인포그래픽",
        tool: "일러스트레이터 ｜ 인포그래픽 디자인",
        image: "img/preview4.png"
    },
    {
        title: "있지 체셔 리디자인",
        tool: "일러스트레이터 ｜ 앨범패키지 디자인",
        image: "img/preview5.png"
    },
    {
        title: "Weekend 브랜드 디자인",
        tool: "일러스트레이터 · 피그마 · 비주얼 스튜디오 ｜  브랜드디자인",
        image: "img/preview6.png"
    },
    {
        title: "빛과 덕수궁",
        tool: "일러스트레이터 ｜ 포스터디자인",
        image: "img/preview7.png"
    },
];

let currentIndex = 0;
let isPlaying = false;
let slideTimer = null;
let progressTimer = null;
let progressValue = 0
const slideDuration = 2000;
const progressStepTime = 20;

const previewImg = document.getElementById("preview_img");
const previewTitle = document.getElementById("preview_title");
const previewTool = document.getElementById("preview_tool");
const progressBar = document.getElementById("progress_bar");

const previewFirst = document.getElementById("preview_first");
const previewPrev = document.getElementById("preview_prev");
const previewPlay = document.getElementById("preview_play");
const previewNext = document.getElementById("preview_next");
const previewLast = document.getElementById("preview_last");
const previewPlayImg = previewPlay.querySelector("img");

function updatePreview(){
    const work = works[currentIndex];
    previewImg.src = work.image;
    previewTitle.innerHTML = work.title.replace(/\n/g, "<br>");
    previewTool.textContent = work.tool;
    progressBar.style.width = ((currentIndex + 1) / works.length) * 100 + "%";
}
function resetProgress(){
    progressValue = 0;
    progressBar.style.width = "0%";
}

function startProgress(){
    clearInterval(progressTimer);
    progressTimer = setInterval(function(){
        progressValue += (progressStepTime / slideDuration) * 100;
        progressBar.style.width = progressValue + "%";
    }, progressStepTime);
}

function stopProgress(){
    clearInterval(progressTimer);
}

function goFirst(){
    currentIndex = 0;
    updatePreview();
    if(isPlaying){
        resetProgress();
        startProgress();
    }
}

function goPrev(){
    currentIndex--;
    if(currentIndex < 0){
        currentIndex = works.length - 1;
    }
    updatePreview();
    if(isPlaying){
        resetProgress();
        startProgress();
    }
}

function goNext(){
    currentIndex++;
    if(currentIndex >= works.length){
        currentIndex = 0;
    }
    updatePreview();
    if(isPlaying){
        resetProgress();
        startProgress();
    }
}

function goLast(){
    currentIndex = works.length - 1;
    updatePreview();
    if(isPlaying){
        resetProgress();
        startProgress();
    }
}

function playSlide(){
    isPlaying = true;
    previewPlayImg.src = "img/playbutton6.png";
    startProgress();
    slideTimer = setInterval(function(){
        goNext();
        resetProgress();
        startProgress();
    }, slideDuration);
}

function stopSlide(){
    clearInterval(slideTimer);
    stopProgress();
    isPlaying = false;
    previewPlayImg.src = "img/playbutton3.png";
}

previewFirst.addEventListener("click", goFirst);
previewPrev.addEventListener("click", goPrev);
previewNext.addEventListener("click", goNext);
previewLast.addEventListener("click", goLast);

previewPlay.addEventListener("click", function(){
    if(isPlaying){
        stopSlide();
    }else{
        playSlide();
    }
});

updatePreview();

const folderItems = document.querySelectorAll(".folder_item");
const workCards = document.querySelectorAll(".work_card");
const detailWindow = document.getElementById("detail_window");
const detailSearchInput = document.getElementById("detail_search_input");

let highestZ = 100;

function bringToFront(windowElement){
    highestZ++;
    windowElement.style.zIndex = highestZ;
}

function filterWorks(category){
    workCards.forEach(function(card){
        if(card.dataset.category === category){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }
    });
}

folderItems.forEach(function(folderItem){
    folderItem.addEventListener("click", function(){
        const folderName = folderItem.dataset.folder;
        filterWorks(folderName);
        detailSearchInput.value = "";
        openWindow(detailWindow);
    });
});

const allWindows = document.querySelectorAll(".window");

allWindows.forEach(function(windowItem){
    windowItem.addEventListener("mousedown", function(){
        bringToFront(windowItem);
    });
});

const memoText = document.getElementById("memo_text");
const memoStatus = document.querySelector(".memo_status");

const savedMemo = localStorage.getItem("mamyongMemo");

if(savedMemo){
    memoText.value = savedMemo;
}

memoText.addEventListener("input", function(){
    localStorage.setItem("mamyongMemo", memoText.value);

    memoStatus.textContent = "Auto Saved";
});

memoText.addEventListener("focus", function(){
    memoStatus.textContent = "Typing...";
});

memoText.addEventListener("blur", function(){
    memoStatus.textContent = "Auto Save";
});
const heartButtons = document.querySelectorAll(".heart_btn");
const likedWorks = JSON.parse(localStorage.getItem("likedWorks")) || [];

heartButtons.forEach(function(button, index){

    if(likedWorks.includes(index)){
        button.classList.add("active");
        button.textContent = "핲";
    }else{
        button.classList.remove("active");
        button.textContent = "핱";
    }

    button.addEventListener("click", function(){
        if(button.classList.contains("active")){
            button.classList.remove("active");
            button.textContent = "핱";
            const removeIndex = likedWorks.indexOf(index);
            if(removeIndex > -1){
                likedWorks.splice(removeIndex, 1);
            }
        }else{
            button.classList.add("active");
            button.textContent = "핲";

            if(!likedWorks.includes(index)){
                likedWorks.push(index);
            }
        }
        localStorage.setItem("likedWorks", JSON.stringify(likedWorks));
    });
});

const detailSearchBtn = document.getElementById("detail_search_btn");

function searchWorks(){
    const keyword = detailSearchInput.value.toLowerCase().trim();
    workCards.forEach(function(card){
        const searchText = card.dataset.search.toLowerCase();
        const titleText = card.querySelector(".work_title").textContent.toLowerCase();
        if(searchText.includes(keyword) || titleText.includes(keyword)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }
    });
}

detailSearchInput.addEventListener("input", searchWorks);

detailSearchBtn.addEventListener("click", function(){
    searchWorks();
});
detailSearchInput.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        searchWorks();
    }
});

let dragTarget = null;
let offsetX = 0;
let offsetY = 0;

document.querySelectorAll(".window_header").forEach(function(header){
    header.addEventListener("mousedown", function(e){
        if(window.innerWidth <= 768){
            return;
        }
        dragTarget = header.parentElement;
        bringToFront(dragTarget);

        offsetX = e.clientX - dragTarget.offsetLeft;
        offsetY = e.clientY - dragTarget.offsetTop;
    });
});

document.addEventListener("mousemove", function(e){
    if(!dragTarget) return;
    dragTarget.style.left = (e.clientX - offsetX) + "px";
    dragTarget.style.top = (e.clientY - offsetY) + "px";
});
document.addEventListener("mouseup", function(){
    dragTarget = null;
});

const taskbar = document.getElementById("taskbar");

function createTaskButton(windowItem){
    const taskId = windowItem.id + "_task";
    if(document.getElementById(taskId)) return;
    const taskIcon = windowItem.dataset.taskIcon;
    const taskName = windowItem.dataset.taskName;
    if(!taskIcon || !taskName) return;
    const taskButton = document.createElement("button");
    taskButton.type = "button";
    taskButton.id = taskId;
    taskButton.className = "task_btn";
    taskButton.title = taskName;
    taskButton.innerHTML = `<span class="task_icon">${taskIcon}</span>`;
    taskButton.addEventListener("click", function(){
    openWindow(windowItem);
    taskButton.remove();
});
    taskbar.appendChild(taskButton);
}

const closeButtons = document.querySelectorAll(".window_close");

closeButtons.forEach(function(button){
    button.addEventListener("click", function(e){
        e.stopPropagation();
        const windowItem = button.closest(".window");
        windowItem.classList.remove("show");
        setTimeout(function(){
            windowItem.style.display = "none";
            const taskButton = document.getElementById(windowItem.id + "_task");
            if(taskButton){
                taskButton.remove();
            }
        },180);
    });
});

const desktopIcons = document.querySelectorAll(".desktop_icon");

desktopIcons.forEach(function(icon){
    icon.addEventListener("click", function(){
        const windowId = icon.dataset.openWindow;
        const windowItem = document.getElementById(windowId);
        openWindow(windowItem);
    });
});

const minimizeButtons = document.querySelectorAll(".window_min");

minimizeButtons.forEach(function(button){
    button.addEventListener("click", function(e){
        e.stopPropagation();
        const windowItem = button.closest(".window");
        windowItem.classList.remove("show");
        setTimeout(function(){
            windowItem.style.display = "none";
            createTaskButton(windowItem);
        },180);
    });
});

const maximizeButtons = document.querySelectorAll(".window_max");

maximizeButtons.forEach(function(button){
    button.addEventListener("click", function(e){
        e.stopPropagation();
        const windowItem = button.closest(".window");
        windowItem.classList.toggle("maximized");
    });
});

const clockDate = document.getElementById("clock_date");
const clockTime = document.getElementById("clock_time");

function updateClock(){
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const date = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");
    clockDate.textContent = `${year}.${month}.${date}`;
    clockTime.textContent = `${hour}:${minute}:${second}`;
}

updateClock();

setInterval(updateClock, 1000);

const searchForm = document.getElementById("search_form");
const searchInput = document.getElementById("search_input");

function openWindow(windowItem){
    if(!windowItem) return;

    windowItem.style.display = "block";

    requestAnimationFrame(function(){
        windowItem.classList.add("show");
    });

    bringToFront(windowItem);
}

searchForm.addEventListener("submit", function(e){
    e.preventDefault();

    const keyword = searchInput.value.toLowerCase().trim();

    if(keyword.includes("profile") || keyword.includes("about") || keyword.includes("프로필")){
        openWindow(document.getElementById("profile_window"));
    }else if(keyword.includes("contact") || keyword.includes("연락")){
        openWindow(document.getElementById("contact_window"));
    }else if(keyword.includes("works") || keyword.includes("folder") || keyword.includes("작업")){
        openWindow(document.getElementById("folder_window"));
    }else if(keyword.includes("preview") || keyword.includes("미리보기")){
        openWindow(document.getElementById("preview_window"));
    }
});

document.addEventListener("keydown", function(e){
    if(e.key !== "Escape") return;
    const openedWindows = Array.from(document.querySelectorAll(".window"))
        .filter(function(windowItem){
            return windowItem.style.display === "block";
        });
    if(openedWindows.length === 0) return;
    const topWindow = openedWindows.reduce(function(prev, current){
        const prevZ = Number(prev.style.zIndex) || 0;
        const currentZ = Number(current.style.zIndex) || 0;

        return currentZ > prevZ ? current : prev;
    });

    topWindow.classList.remove("show");

    setTimeout(function(){
        topWindow.style.display = "none";
        const taskButton = document.getElementById(topWindow.id + "_task");
        if(taskButton){
            taskButton.remove();
        }
    }, 180);
});