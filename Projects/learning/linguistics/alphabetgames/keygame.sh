#!/bin/bash
start=$SECONDS
    clear
    setxkbmap -layout ru
        echo
        echo "Welcome! Lets Play a Game!"
        echo
        echo "Type in the Russian keys as I call them out:"
        sleep 4
        clear
        echo
        echo "NOTE - before we start:"
        echo
        echo "For the duration of this game I will set the keyboard to Russian, don't worry though, when the game is finished, I will change it back for you!"
        sleep 6
        clear
alphabet=("а" "б" "в" "г" "д" "е" "ё" "ж" "з" "и" "й" "к" "л" "м" "н" "о" "п" "р" "с" "т" "у" "ф" "х" "ц" "ч" "ш" "щ" "ъ" "ы" "ь" "э" "ю" "я")
score=0
while [[ ${#alphabet[@]} -gt 0 ]]; do
    random_index=$((RANDOM % ${#alphabet[@]}))
    letter=${alphabet[$random_index]}
    echo
    echo "Type the letter: $letter"
    echo
    read -r user_input
    clear
    if [[ $user_input == "$letter" ]]; then
        echo
        echo "Correct!"
        echo
        echo "Nice Job!!"
        sleep 1 
        clear
        score=$((score + 1))
    else
        echo
        echo "Incorrect!"
        sleep 1 
        clear
    fi
    unset 'alphabet[$random_index]'
    alphabet=("${alphabet[@]}")
    echo
    sleep 1
    clear
done
duration=$(( SECONDS - start ))
setxkbmap -layout us
echo
echo "Total score: $score out of 34"
echo
echo "Time spent: $duration seconds"


#This script will randomly select a letter from the Russian alphabet array and prompt the user to type it. If the user types the correct letter, the script will increment the score. If the user types the incorrect letter, the script will display "Incorrect!" and move on to the next letter. The script will continue until all letters have been asked. Finally, it will display the final score.

