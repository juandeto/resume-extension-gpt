source vars.sh

rsync -av ../api $USER@$HOST:
cp ../api/.env .

ssh $USER@$HOST     "
    pm2 delete gpt-api
    cd /root/api/
    pipenv run pm2 start 'gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:8080' --name gpt-api
"
 