export function renderPagination(container, page, total, go) {
    container.innerHTML = "";

    function addButton(label, p, active = false, disabled = false) {
        const b = document.createElement("button");
        b.textContent = label;
        if (active) b.classList.add("active");
        if (!disabled) b.onclick = () => go(p);
        container.appendChild(b);
    }

    function addDots() {
        const span = document.createElement("span");
        span.textContent = "...";
        span.style.color = "#9aa8c0";
        span.style.padding = "0 6px";
        container.appendChild(span);
    }

    addButton("1", 1, page === 1);

    if (page > 3) addDots();

    if (page > 2) addButton(page - 1, page - 1);

    if (page !== 1 && page !== total)
        addButton(page, page, true);

    if (page < total - 1) addButton(page + 1, page + 1);

    if (page < total - 2) addDots();

    if (total > 1)
        addButton(String(total), total, page === total);
}
