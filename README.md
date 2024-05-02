# Note-taking-app

## React-Django Restful CRUD API with PostgreSQL

### notetaking folder -- django api (backend)(create a virtual environment)

## Running the Application

Create the DB tables first:

```
python manage.py migrate
```

Run the development web server:

```
python manage.py runserver 8080
```

### react-notes folder -- react app (frontend)

## Project setup

In the project directory, you can run:

```
npm install
# or
yarn install
```

or

### Compiles and hot-reloads for development

```
npm start
# or
yarn start
```

#### api calls

```
1.Get    "api/notes"
2.Get    "api/notes/:id"
3.Post   "api/notes"
4.Put    "api/notes/:id/"
5.Delete "api/notes/:id"
6.Delete "api/notes"
7.Get    "api/notes?title=${title}"
```
