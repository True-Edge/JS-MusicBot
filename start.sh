#!/bin/bash
tmux new-session -d -s lavalink 'cd Lavalink && ./startLava.sh'
tmux new-session -d -s bot './startBot.sh'