
function isLeap(year) {
    let leap = false
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                leap = true
            }
        } else {
            leap = true
        }
    } else {
        leap = false
    }
    return leap
}

console.log(isLeap(2000))