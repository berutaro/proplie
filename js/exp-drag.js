document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".exp-wrapper");
    const track = document.querySelector(".exp-logos");
    if (!wrapper || !track) return;

    // 1) 카드들을 복제해서 이어 붙여서 "무한 느낌" 만들기
    const originalCards = Array.from(track.children);
    // 한 번 더 붙여서 2배 길이 만들기 (필요하면 3번도 가능)
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    let isDragging = false;
    let startX = 0;
    let currentX = 0;    // 현재 translateX 값 (px)

    // translateX 값을 무한 루프 범위 안으로 감싸주는 함수
    function setTranslate(x) {
        const loopWidth = track.scrollWidth / 2; // 원본 + 복제 기준 길이
        if (loopWidth <= 0) return;

        // x를 [-loopWidth, 0] 사이로 감싸기
        x = x % loopWidth;
        if (x > 0) x -= loopWidth; // 항상 0 이하로

        currentX = x;
        track.style.transform = `translateX(${x}px)`;
    }

    // 마우스 시작
    wrapper.addEventListener("mousedown", (e) => {
        isDragging = true;
        wrapper.classList.add("is-dragging");
        startX = e.clientX - currentX;
    });

    // 마우스 끝
    const stopDrag = () => {
        isDragging = false;
        wrapper.classList.remove("is-dragging");
    };

    wrapper.addEventListener("mouseup", stopDrag);
    wrapper.addEventListener("mouseleave", stopDrag);

    // 마우스 이동
    wrapper.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.clientX - startX;
        setTranslate(x);
    });

    // 터치 시작
    wrapper.addEventListener("touchstart", (e) => {
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX - currentX;
    }, { passive: true });

    // 터치 끝
    wrapper.addEventListener("touchend", () => {
        isDragging = false;
    });

    // 터치 이동
    wrapper.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const x = touch.clientX - startX;
        setTranslate(x);
    }, { passive: true });

    // 초기 위치 설정
    setTranslate(0);
});