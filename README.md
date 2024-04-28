# url-shortnener
A url shortener service created using nodejs with express and mongodb as backend. 

## Requirements

1. Git 
2. Nodejs
3. Npm
4. Docker 
5. MongoDB

<br>


## Installation

#### Method 1

- Clone the Repo
```bash
$ git clone  https://github.com/prthm786/url-shortnener.git
```

- Run docker compose 
```bash
$ docker compose up -d
```

---


#### Method 2

- Clone the Repo
```bash
$ git clone  https://github.com/prthm786/url-shortnener.git
```

<br>

- Edit .env file
Change the port in BASE_URL
> BASE_URL=http://localhost:3000

Comment out MONGO_URI and add this line
> MONGO_URI=mongodb://localhost:27017

<br>

- Create a docker container with mongodb image (Optional) 
MongoDB can be used without docker on local machine
```bash
$ docker run --name mongodb-container -p 27017:27017 -d mongo
```

<br>

- Run these commands
```bash
$ cd Server

$ npm install

$ npm start
```

<br>


## Technologies Used

1. Javascript, HTML and CSS 
2. Nodejs
3. Expressjs
4. MongoDB
5. Docker and Docker Compose

<br> 

---