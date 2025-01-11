// DOM elementlarini olish
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const themeToggleBtn = document.querySelector('.theme-toggler');
const calculator = document.querySelector('.calculator');

let isDark = true; // Mavzu bosh holati

// Har bir tugmaga hodisa biriktirish
buttons.forEach((button) => {
    button.onclick = () => {
        const buttonText = button.innerText; // Tugma matnini olish

        if (button.id === 'clear') {
            display.innerText = ''; // Displeyni tozalash

        } else if (button.id === 'backspace') {
            display.innerText = display.innerText.slice(0, -1); // Oxirgi belgini o‘chirish

        } else if (button.id === 'equal') {
            if (display.innerText.trim() === '') {
                display.innerText = '!'; // Bo‘sh bo‘lsa xabar chiqarish
                setTimeout(() => (display.innerText = ''), 2000);
            } else {
                try {
                    display.innerText = evaluateExpression(display.innerText); // Ifodani hisoblash
                } catch (error) {
                    display.innerText = 'Error';
                    setTimeout(() => (display.innerText = ''), 2000);
                }
            }

        } else {
            display.innerText += buttonText; // Matnni displeyga qo‘shish
        }
    };
});

// Xavfsiz ifoda hisoblash
function evaluateExpression(expression) {
    // Faqat ruxsat etilgan belgilarni tekshirish
    if (/^[0-9+\-*/.() ]+$/.test(expression)) {
        return Function(`return ${expression}`)(); // Ifodani hisoblash
    } else {
        throw new Error('Invalid Expression');
    }
}
 

// Mavzuni o‘zgartirish funksiyasi
themeToggleBtn.onclick = () => {
    calculator.classList.toggle('dark'); // "dark" sinfini almashtirish
    themeToggleBtn.classList.toggle('active'); // Tugma ko‘rinishini o‘zgartirish
    isDark = !isDark; // Holatni o‘zgartirish
};
