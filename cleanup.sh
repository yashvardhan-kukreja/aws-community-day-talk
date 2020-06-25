#!/bin/bash

docker container stop $(docker container ps -a -q) 2>&1 && echo "All containers stopped" || echo "No containers found to stop"
docker container rm $(docker container ps -a -q) 2>&1 && echo "All containers removed" || echo "No containers found to remove"

docker image rm yashvardhan-kukreja/aws-community-day:test 2>&1 && echo "Removed the test image" || echo "Test image not found"