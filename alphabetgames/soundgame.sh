#!/bin/bash
declare -A russian_alphabet=(
    ["ah"]="А" ["beh"]="Б" ["veh"]="В" ["geh"]="Г" ["deh"]="Д" ["yeh"]="Е" ["yo"]="Ё" ["zheh"]="Ж" ["zeh"]="З" ["ee"]="И" ["ee kratkoyeh"]="Й" ["kah"]="К" ["ehl"]="Л" ["ehm"]="М" ["ehn"]="Н" ["oh"]="О" ["peh"]="П" ["ehr"]="Р" ["ehs"]="С" ["teh"]="Т" ["oo"]="У" ["ehf"]="Ф" ["khah"]="Х" ["tseh"]="Ц" ["cheh"]="Ч" ["sheh"]="Ш" ["shcheh"]="Щ" ["tvyordiy znak"]="Ъ" ["ih"]="Ы" ["myagkiy znak"]="Ь" ["eh"]="Э" ["yoo"]="Ю" ["yah"]="Я"
)
score=0
for sound in "${!russian_alphabet[@]}"; do
    echo "What letter corresponds to the sound '$sound'?"
    read -p "Enter your answer: " answer
    if [[ $answer == "${russian_alphabet[$sound]}" ]]; then
        echo "Correct!"
        score=$((score + 1))
    else
        echo "Incorrect!"
    fi
    echo
done
echo "Total score: $score"

#Save this script in a file (e.g., `russian_sound_quiz.sh`), make it executable (`chmod +x russian_sound_quiz.sh`), and then run it (`./russian_sound_quiz.sh`). The script will display a sound from the Russian alphabet and prompt you to enter the corresponding letter. It will provide feedback on whether your answer is correct or incorrect and keep a tally of your score. The total score will be displayed at the end.

