# test-technique-AL

for running this project need 3 separate instances

N°1: REDIS for cache // BACKEND

redis is required for backend to properyly run
- install :"sudo apt-get install redis-server"
- run : "redis-server"
- check setup : check if redis is up by running "redis-cli ping" // shall return PONG

N°2: BACKEND

run npm install then npm start. Make sure Redis is running

N°3: FrontEnd


run npm install then npm start. 


# testing
BACKEND is tetable, run npm run test while in /backend
If so you are good to procede to next step.