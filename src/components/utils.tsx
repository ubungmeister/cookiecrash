export const CheckMatches = (currentCookieArrangement: string[],
                             width: number,
                             validMove: () => boolean,
                             cookieName: string[],
                             itemBeingReplaced?: Element | null): { arr: string[], result: boolean, score: number } => {



    let score = 0 //return score of the matched elements, include what we matched and what matched accidentally  by moving elements down
    let counter = 0 // return whether there was a match = counter >1 or <1 if there was no match. We use it in App to move elements

    //check elements if there was a match, vertically and horizontally
    for (let i = 0; i <= 47; i++) {
        const columnOfFour = [i, i + width, i + width * 2, i + width * 3] // check 4 elements vertically
        const decidedCookie = currentCookieArrangement[i]

        if (!validMove()) continue //tell us if the dragged item was ok, allowed step 1 left/right/top/down
        if (columnOfFour.every(item => currentCookieArrangement[item] === decidedCookie)) {
            columnOfFour.forEach(item => currentCookieArrangement[item] = '')
            counter++

        }

    }
    for (let i = 0; i < 64; i++) {
        const rowOfFour = [i, i + 1, i + 2, i + 3] // check 4 elements horizontally
        const decidedCookie = currentCookieArrangement[i]
        //instead of using indexes of items, we don't need las 3 row to check
        if (i % 8 >= 5) continue

        if (!validMove()) continue
        if (rowOfFour.every(item => currentCookieArrangement[item] === decidedCookie)) {
            rowOfFour.forEach(item => currentCookieArrangement[item] = '')
            counter++
        }
    }
    for (let i = 0; i <= 47; i++) {
        const columnOfThree = [i, i + width, i + width * 2] // check 3 elements vertically
        const decidedCookie = currentCookieArrangement[i]
        if (!validMove()) continue
        if (columnOfThree.every(item => currentCookieArrangement[item] === decidedCookie)) {
            columnOfThree.forEach(item => currentCookieArrangement[item] = '')
            counter++

        }
    }
    for (let i = 0; i < 64; i++) {
        const rowOfThree = [i, i + 1, i + 2] // check 3 elements horizontally
        const decidedCookie = currentCookieArrangement[i]
        //instead of using indexes of items, we don't need last 2 row to check
        if (i % 8 >= 6) continue

        if (!validMove()) continue
        if (rowOfThree.every(item => currentCookieArrangement[item] === decidedCookie)) {
            rowOfThree.forEach(item => currentCookieArrangement[item] = '')
            counter++
        }
    }

    //move matched elements and replace them new one
    for (let i = 0; i <= 55; i++) {
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        if (firstRow.includes(i) && currentCookieArrangement[i] === '') {
            currentCookieArrangement[i] = cookieName[Math.floor(Math.random() * cookieName.length)]
            score++ //count how many times was the element in the first line was ==='', which can tell us how many score we got.
        }

        if (currentCookieArrangement[i + width] === '') {

            currentCookieArrangement[i + width] = currentCookieArrangement[i]
            currentCookieArrangement[i] = ''
        }
    }
    if (itemBeingReplaced !== null) {
        score = 0 // pretend getting score when not even start.
    }
    return {arr: currentCookieArrangement, result: counter > 0, score: score}
}

