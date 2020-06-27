#!/bin/bash
cd ~
sudo rm -rf aws-community-day
git clone git@github.com:yashvardhan-kukreja/aws-community-day.git
cd aws-community-day
kubectl apply -f deployment.yaml