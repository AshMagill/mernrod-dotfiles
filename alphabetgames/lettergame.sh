#!/bin/bash
clear
        echo
        echo "Welcome! Lets Play a Game!"
        echo
        echo "Tell me what sounds the following Russian letters make.."
        sleep 4
        clear
declare -A russian_alphabet=(
    ["А а"]="a" ["Б б"]="b" ["В в"]="v" ["Г г"]="g" ["Д д"]="d" ["Stressed Е е"]="ye" ["Non stressed Е е"]="ee" ["Ё ё"]="yo" ["Ж ж"]="zh" ["З з"]="z" ["И и"]="ee" ["Й й"]="y" ["К к"]="k" ["Л л"]="l" ["М м"]="m" ["Н н"]="n" ["О о"]="o" ["П п"]="p" ["Р р"]="rr" ["С с"]="s" ["Т т"]="t" ["У у"]="oo" ["ф ф"]="f" ["Х х"]="h" ["Ц ц"]="ts" ["Ч ч"]="ch" ["Ш ш"]="sh" ["Щ щ"]="sh" ["Ы ы"]="eu" ["Э э"]="e" ["Ю ю"]="yoo" ["Я я"]="yah"
)
score=0
for letter in "${!russian_alphabet[@]}"; do
    echo
    echo "What sound does the letter '$letter' make?"
    echo
    read -p "Enter your answer: " answer
    clear
    if [[ $answer == "${russian_alphabet[$letter]}" ]]; then
        echo
        echo "Correct!"
        echo
        echo "Nice Job!!"
        score=$((score + 1))
        sleep 1
        clear
    else
        echo
        echo "Incorrect!"
        echo
        echo "${letter} makes the sound '${russian_alphabet[$letter]}'"
        sleep 4 
        clear
    fi
done
echo "Total score: $score out of 33"
#if [$score == 31] then echo "
#Exellent!"
#To use this script, save it in a file (e.g., `russian_alphabet_quiz.sh`), make it executable (`chmod +x russian_alphabet_quiz.sh`), and then run it (`./russian_alphabet_quiz.sh`). The script will prompt you to enter the sound associated with each Russian letter and provide feedback on whether your answer is correct or incorrect. It will keep a tally of your score and display the total score at the end.

