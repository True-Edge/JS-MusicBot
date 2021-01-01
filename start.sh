#!/bin/bash
tmux new-session -d -s lavalink 'cd Lavalink && java -jar ./Lavalink.jar'
tmux new-session -d -s bot 'node d.js'