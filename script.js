
console.log("Bienvenida a mi universo ★");
const gridContainer = document.getElementById("grid");

if (gridContainer) {
    const layout = [
        "..M.....",
        "DORMIR..",
        "..V.....",
        "UNIVERSO",
        "..E....."
    ];

    const numbers = { "0-2": "2", "1-0": "1", "3-0": "3" };

    layout.forEach((row, r) => {
        row.split("").forEach((char, c) => {
            const cell = document.createElement("div");
            if (char === ".") {
                cell.className = "cell empty";
            } else {
                cell.className = "cell";
                if (numbers[`${r}-${c}`]) {
                    const num = document.createElement("span");
                    num.textContent = numbers[`${r}-${c}`];
                    cell.appendChild(num);
                }
                const input = document.createElement("input");
                input.maxLength = 1;
                input.dataset.answer = char;
                
                input.addEventListener("input", () => {
                    input.classList.remove("correct", "wrong");
                    const inputs = Array.from(gridContainer.querySelectorAll("input"));
                    const idx = inputs.indexOf(input);
                    if (input.value && inputs[idx + 1]) inputs[idx + 1].focus();
                });

                cell.appendChild(input);
            }
            gridContainer.appendChild(cell);
        });
    });

    document.getElementById("check-btn").addEventListener("click", () => {
        const inputs = gridContainer.querySelectorAll("input");
        let allGood = true;

        inputs.forEach(inp => {
            if (inp.value.toUpperCase() === inp.dataset.answer) {
                inp.classList.add("correct");
                inp.classList.remove("wrong");
            } else {
                inp.classList.add("wrong");
                inp.classList.remove("correct");
                allGood = false;
            }
        });

        document.getElementById("result-msg").textContent = allGood 
            ? "¡COMPLETADO! ★" 
            : "ALGUNA LETRA FALLA";
    });
}