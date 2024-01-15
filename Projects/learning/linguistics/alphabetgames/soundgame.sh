#!/bin/bash
start=$SECONDS
    clear
    setxkbmap -layout ru
        echo
        echo "Welcome! Lets Play a Game!"
        echo
        echo "Tell me what in lower case, what letters are used to make these sounds:"
        sleep 4
        clear
        echo
        echo "NOTE - before we start:"
        echo
        echo "For the duration of this game I will set the keyboard to Russian, don't worry though, when the game is finished, I will change it back for you!"
        sleep 6
        clear
declare -A russian_alphabet=(
['ah' as in 'father']="а" ['b' as in 'bad']="б" ['v' as in 'vine']="в" ['g' as in 'go']="г" ['d' as in 'do']="д" ['ee' as in 'meet']="е" ['ye' as in 'yet']="е" ['yo' as in 'yolk']="ё" ['zh' as in 'pleasure']="ж" ['z' as in 'zoo']="з" ['ee' as in 'police']="и" ['y' as in 'toy']="й" ['k' as in 'kept']="к" ['l' as in 'lamp']="л" ['m' as in 'mother']="м" ['n' as in 'not']="н" ['o' as in 'more']="о" ['p' as in 'pet']="п" [as rolled 'r']="р" ['s' as in 'set']="с" ['t' as in 'top']="т" ['oo' as in 'tool']="у" ['f' as in 'face']="ф" ['h' as in 'home']="х" ['ts' as in 'sits']="ц" ['ch' as in 'chat']="ч" ['sh' as in 'sharp']="ш" ['sh' as in 'sheer']="щ" [prevents 'softening' consonant]="ъ" ["eu sound"]="ы" ["softens consonant"]="ь" ['e' as in 'met']="э" ['yoo' as in 'use']="ю" ['yah' as in 'yard']="я"
)
score=0
for sound in "${!russian_alphabet[@]}"; do
    echo
    echo "What letter corresponds to the sound '$sound'?"
    echo
    read -p "Enter your answer: " answer
    clear
    if [[ $answer == "${russian_alphabet[$sound]}" ]]; then
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
        echo "'${russian_alphabet[$sound]}' makes the sound '${sound}'"
        sleep 4 
        clear
    fi
done
duration=$(( SECONDS - start ))
setxkbmap -layout us
echo
echo "Total score: $score out of 34"
echo
echo "Time spent: $duration seconds"



#Save this script in a file (e.g., `russian_sound_quiz.sh`), make it executable (`chmod +x russian_sound_quiz.sh`), and then run it (`./russian_sound_quiz.sh`). The script will display a sound from the Russian alphabet and prompt you to enter the corresponding letter. It will provide feedback on whether your answer is correct or incorrect and keep a tally of your score. The total score will be displayed at the end.

