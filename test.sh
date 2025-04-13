#!/bin/bash

# URL of your load balancer
URL="http://localhost:3000"

# Number of requests to send
TOTAL_REQUESTS=20

echo "Sending $TOTAL_REQUESTS requests to $URL..."

for ((i = 1; i <= TOTAL_REQUESTS; i++))
do
  curl -s $URL &
done

wait
echo -e "\nDone!"
