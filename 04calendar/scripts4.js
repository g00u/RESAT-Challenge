// scripts4.js
let currentMonth = new Date().getMonth();  // 현재 월
let currentYear = new Date().getFullYear();  // 현재 연도
let selectedDate;  // 선택된 날짜를 저장하는 변수

const daysContainer = document.getElementById('days');  // 달력의 일자를 표시
const currentMonthElement = document.getElementById('currentMonth');  // 현재 월을 표시
const memoInput = document.getElementById('memoInput');  // 메모 입력
const saveMemoButton = document.getElementById('saveMemo');  // 메모 저장 버튼 
const memoList = document.getElementById('memoList');  // 메모 리스트를 표시

// 달력을 렌더링하는 함수
function renderCalendar(month, year) {
    currentMonth = month;  // 전역 변수의 월을 업데이트
    currentYear = year;  // 전역 변수의 연도를 업데이트
    const daysInMonth = new Date(year, month + 1, 0).getDate();  // 해당 월의 일수를 구함
    const firstDayOfMonth = new Date(year, month, 1).getDay();  // 해당 월의 첫 날의 요일을 구함
    daysContainer.innerHTML = '';  // 일자를 표시하는 컨테이너를 비움
    currentMonthElement.textContent = `${year}년 ${month + 1}월`;  // 현재 월을 표시

    const nameDaysHeader = document.getElementById('nameDays');
    nameDaysHeader.innerHTML = '';
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    for (let i = 0; i < dayNames.length; i++) {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = dayNames[i];
        nameDaysHeader.appendChild(dayHeader);
    }

    // 이전 달의 남은 일자를 표시
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.classList.add('inactive');
        day.textContent = new Date(year, month, -i).getDate();
        daysContainer.appendChild(day);
    }

    // 현재 월의 일자를 표시
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.textContent = i;

        // 오늘 날짜 확인
        if (isToday(year, month, i)) {
            day.classList.add('today');
        }
        //메모가 있는 날짜 확인
        const memoKey = getStorageKey(new Date(year, month, i));
        const hasMemo = localStorage.getItem(memoKey) !== null;
        
        if (hasMemo) {
            day.classList.add('hasMemo');
        } else{
            day.classList.remove('hasMemo');
        }

        // 선택된 날짜인지 확인하고 해당되면 'selected' 클래스를 추가
        if (selectedDate && selectedDate.getFullYear() === year && selectedDate.getMonth() === month && selectedDate.getDate() === i) {
            day.classList.add('selected');
            loadMemo(selectedDate)
        }

        // 각 일자를 클릭하면 메모 팝업이 나타나도록 이벤트 리스너를 추가
        day.addEventListener('click', () => showMemoPopup(year, month, i));
        daysContainer.appendChild(day);
    }
}

// 오늘 날짜인지 확인하는 함수
function isToday(year, month, day) {
    const today = new Date();
    return year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
}


// 메모 팝업을 표시하는 함수
function showMemoPopup(year, month, day) {
    selectedDate = new Date(year, month, day);  // 선택된 날짜를 업데이트
    loadMemo(selectedDate);

    // 선택된 날짜에 빨간색 테두리를 추가
    const selectedDay = document.querySelector('.selected');
    if (selectedDay) {
        selectedDay.classList.remove('selected');
    }

    //현재 선택된 날짜에 'selected'클래스 추가
    const days = document.querySelectorAll('#days > div');
    days[(day - 1) + new Date(year, month, 1).getDay()].classList.add('selected');
}

// 메모를 편집하는 함수
function editMemo(date, index) {
    const memoKey = getStorageKey(date);
    const savedMemos = getSavedMemos(date);
    const editedMemo = prompt('메모를 편집하세요:', savedMemos[index]);

    if (editedMemo !== null) {
        savedMemos[index] = editedMemo;
        localStorage.setItem(memoKey, JSON.stringify(savedMemos));
        loadMemo(date); // 편집 후 메모 목록을 다시 로드
    }
}

// 메모를 로드하는 함수
function loadMemo(date) {
    const memoKey = getStorageKey(date);
    const savedMemos = getSavedMemos(date);

    memoList.innerHTML = ''; // 메모 리스트를 비움

    savedMemos.forEach((memo, index) => {
        const memoItem = document.createElement('li');
        memoItem.textContent = memo;

        // 편집 버튼 추가
        const editButton = document.createElement('button');
        editButton.textContent = '수정';
        editButton.className='editButton';
        editButton.addEventListener('click', () => editMemo(date, index));
        
        //삭제 버튼 추가
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.className = 'deleteButton';
        deleteButton.addEventListener('click', () => deleteMemo(date, index));

        memoItem.appendChild(editButton);
        memoItem.appendChild(deleteButton);
        memoList.appendChild(memoItem);
    });

    memoInput.value = ''; // 입력 필드를 비움
    memoInput.focus(); // 메모 입력 필드에 포커스를 줌
}

// 메모를 저장하는 함수
function saveMemo() {
    const memoContent = memoInput.value.trim(); //메모 내용 가져오기
    const memoKey = getStorageKey(selectedDate); // 선택된 날짜를 기준으로 localStorage에 저장할 키 생성
    let savedMemos = getSavedMemos(selectedDate); //선택된 날짜에 대하여 저장된 목록 가져오기 

    if (memoContent !== '') { //메모 내용이 비어있는지 확인
        const existingMemoIndex = savedMemos.indexOf(memoContent);
        if (existingMemoIndex !== -1) {
            const editedMemo = prompt('메모를 편집하세요:', memoContent);
            if (editedMemo !== null) {
                savedMemos[existingMemoIndex] = editedMemo;
            }
        } else {
            savedMemos.push(memoContent);
        }

        localStorage.setItem(memoKey, JSON.stringify(savedMemos));
        
         // 노란색 표시를 추가
        const selectedDay = document.querySelector('.selected');
        if (selectedDay) {
            selectedDay.classList.add('hasMemo');
        }

        loadMemo(selectedDate);
        renderCalendar(selectedDate.getMonth(), selectedDate.getFullYear());
    } else {
        // 메모 내용이 비어있으면 해당 날짜의 메모를 삭제
        localStorage.removeItem(memoKey);
         
         // 노란색 표시를 제거
        const selectedDay = document.querySelector('.selected');
        if (selectedDay) {
            selectedDay.classList.remove('hasMemo');
        }

        loadMemo(selectedDate); // 메모를 삭제한 후에 메모를 다시 로드
        renderCalendar(selectedDate.getMonth(), selectedDate.getFullYear()); // 캘린더를 다시 렌더링하여 메모가 있는 날짜를 표시
    }
    memoInput.value = ''; // 입력 필드를 비움
    memoInput.focus(); // 메모 입력 필드에 포커스를 줌

}
// 메모를 삭제하는 함수
function deleteMemo(date, index) {
    const memoKey = getStorageKey(date);
    let savedMemos = getSavedMemos(date);

    savedMemos.splice(index, 1); // 선택된 인덱스의 메모를 배열에서 삭제

    localStorage.setItem(memoKey, JSON.stringify(savedMemos));
    loadMemo(date); // 메모를 삭제한 후에 메모를 다시 로드
    renderCalendar(date.getMonth(),date.getFullYear());
}

// 저장된 메모를 가져오는 함수
function getSavedMemos(date) {
    const memoKey = getStorageKey(date);
    const savedMemos = localStorage.getItem(memoKey);

    return savedMemos ? JSON.parse(savedMemos) : [];
}

// 메모를 저장할 때 사용할 키를 생성하는 함수
function getStorageKey(date) {
    return `memo_${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}`;
}

// 초기에 달력을 렌더링
renderCalendar(currentMonth, currentYear);

// '이전 달' 버튼에 이벤트 리스너를 추가
document.getElementById('prevMonth').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

// '다음 달' 버튼에 이벤트 리스너를 추가
document.getElementById('nextMonth').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

// '메모 저장' 버튼에 이벤트 리스너를 추가
saveMemoButton.addEventListener('click', saveMemo);
