export const timeConversion = (durationMinutes) => {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = Math.floor(durationMinutes % 60);
    return `${hours}ч ${minutes}м`;
}

export const searchFilter = ({setToSearch, text, shortMovies}) => {
    return setToSearch.filter(el => {
        return ((text && el.nameRU.toLowerCase().indexOf(text.toLowerCase()) > -1))
            && (!shortMovies || (shortMovies && el.duration <= 40))
    });
}


