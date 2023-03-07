### Task
```
https://docs.google.com/spreadsheets/d/1PHMh-F8APgbbNZRzDsn_gIX9JIwcFbzbRn2Ht_34ZQ8/edit?usp=sharing
```

### Backend
```
docker-compose up -d --build
```

## Migrate database
```
docker-compose exec api python manage.py migrate
```

## Create supper user
```
docker-compose exec api python manage.py createsuperuser
```
### Frontend
```
npm install
npm start
```
