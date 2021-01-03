#!/bin/bash
tmux \
    new-session -s BWL "cd Lavalink; ./startLava.sh" \; \
    split-window -t BWL "./startBot.sh" \; \
    ls \; \
