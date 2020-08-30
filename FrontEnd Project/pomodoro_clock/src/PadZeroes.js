//  Just a simple function which pads a single digit number to 2 digit with 0.

export default function padZeroes(time) {
    return (time < 10? '0': '') + time;
}