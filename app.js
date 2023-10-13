// ##################
// #
// #   Part One
// #
// ##################


// let data;

// $.getJSON('http://numbersapi.com/20?json', response => {
//     data = response;
//     console.log(data);
// });

// ############################################

// let numbersPromises = [];
// for (let i = 0; i<5; i++){
//     numbersPromises.push(axios.get('http://numbersapi.com/random?json'));
// }

// Promise.all(numbersPromises)
//     .then(numbersArr => {
//         numbersArr.forEach(num => {
//             $('body').append(`<h1>${num.data.text}</h1>`)
//         });
//     })
//     .catch(err => console.log(err));

// ############################################

// function getFact(el) {
//     return new Promise((resolve, reject) => {
//         $.getJSON('http://numbersapi.com/20?json', response => {
//             data = response;
//             $('body').append(`<${el}>${data.text}</${el}>`);
//             resolve();
//         })
//     })
// }

// getFact('h1')
//     .then(() => getFact('h1'))
//     .then(() => getFact('h1'))
//     .then(() => getFact('h1'))

// ##################
// #
// #   Part Two
// #
// ##################

let BaseURL = 'https://deckofcardsapi.com'

// axios
//     .get(`${BaseURL}/api/deck/new/draw?count=1`)

//     // Draw random card
//     // .then(card => {
//     //     console.log(card.data)
//     //     console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`)
//     // })

//     // Draw two cards from the same deck
//     .then(card => {
//         console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`)
//         return axios.get(`${BaseURL}/api/deck/${card.data.deck_id}/draw?count=1`)
//     })
//     .then(card2 => {
//         console.log(`${card2.data.cards[0].value} of ${card2.data.cards[0].suit}`)
//     })

let deck_id;

$('#start').on('click', function () {
    $(this).hide();
    axios
        .get(`${BaseURL}/api/deck/new/draw?count=1`)
        .then(card => {
            deck_id = card.data.deck_id;

            const img = new Image();
            img.src = card.data.cards[0].image;
            $('div').append(img);
        })
});

$('#hit').on('click', function () {
    axios
        .get(`${BaseURL}/api/deck/${deck_id}/draw?count=1`)
        .then(nextCard => {
            const img = new Image();
            img.src = nextCard.data.cards[0].image;
            $('div').append(img);
        })
        .catch(error => {
            alert("No more cards left!")
        })
})
