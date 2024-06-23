"use strict"

let is_clicked = new Array(9);
let total = 0;

const audio_context = new AudioContext();
let audio_on = true;

function clicked()  {
        window.onclick = e => {
                // Check if already won
                if (document.getElementById("Title").innerText != "Tic Tac Toe") {
                        is_clicked = new Array(9)
                        total = 0
                        for (let i = 1; i < 10; i++) {
                                document.getElementById(i.toString()).innerText = ""
                                document.getElementById(i.toString()).className = "square no_click"
                        }
                        document.getElementById("Title").innerText = "Tic Tac Toe"              
                        return;
                }

                // Check if in game
                if (is_clicked[e.target.id-1] == undefined && 1 <= Number(e.target.id) && Number(e.target.id) <= 9) {

                        total += 1

                        if (total % 2 == 0) {
                                e.target.innerText = "◯"
                                document.getElementById(e.target.id).className = "square circle"
                                is_clicked[e.target.id - 1] = 'knot'
                                play_sound("triangle", 100)
                        }
                        else {
                                e.target.innerText = "⨉"
                                document.getElementById(e.target.id).className = "square cross"
                                is_clicked[e.target.id - 1] = 'cross'
                                play_sound("sine", 100)
                        }

                }

                // Check end conditions
                if (is_won(is_clicked, 'knot')) {
                        document.getElementById("Title").innerText = "Knots Won"
                        play_sound("triangle", 250)

                } else
                if (is_won(is_clicked, 'cross')) {
                        document.getElementById("Title").innerText = "Crosses Won"
                        play_sound("sine", 250)
                } else
                if (total == 9) {
                        document.getElementById("Title").innerText = "Draw"
                        play_sound("square", 30)
                }
        }
}

function is_won(grid, check) {
        return [
                // all rows
                grid[0] == check && grid[1] == check && grid[2] == check,
                grid[3] == check && grid[4] == check && grid[5] == check,
                grid[6] == check && grid[7] == check && grid[8] == check,

                // all columns
                grid[0] == check && grid[3] == check && grid[6] == check,
                grid[1] == check && grid[4] == check && grid[7] == check,
                grid[2] == check && grid[5] == check && grid[8] == check,
                // all diagonals
                grid[0] == check && grid[4] == check && grid[8] == check,
                grid[6] == check && grid[4] == check && grid[2] == check
        ].some(i => i == true)
}

function play_sound(type, frequency) {
        if (audio_on) {
                let gain = audio_context.createGain();
                let oscillator = audio_context.createOscillator();

                oscillator.connect(gain);
                gain.connect(audio_context.destination);

                oscillator.frequency.value = frequency
                oscillator.type = type

                oscillator.start(0)
                gain.gain.exponentialRampToValueAtTime(.01, audio_context.currentTime + 1)
                oscillator.stop(audio_context.currentTime + 2)
        }
}

function toggle_audio() {
        if (audio_on) {
                audio_on = false
                document.getElementById("Audio").innerText = "🔇"
        }
        else {
                audio_on = true
                document.getElementById("Audio").innerText = "🔊"
        }
}
