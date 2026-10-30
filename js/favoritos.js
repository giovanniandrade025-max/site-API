export function obterFavoritos() {
    return JSON.parse(localStorage.getItem('favoritos')) || [];
}

export function alternarFavorito(id) {
    let favoritos = obterFavoritos();
    const idStr = String(id);
    const index = favoritos.indexOf(idStr);

    if (index > -1) {
        favoritos.splice(index, 1);
    } else {
        favoritos.push(idStr);
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    return favoritos;
}

export function ehFavorito(id) {
    const favoritos = obterFavoritos();
    return favoritos.includes(String(id));
}