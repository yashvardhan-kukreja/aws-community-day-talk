#!/bin/bash
cd ~
sudo rm -rf aws-community-day-talk
git clone git@github.com:yashvardhan-kukreja/aws-community-day-talk.git
cd aws-community-day
kubectl apply -f deployment.yaml