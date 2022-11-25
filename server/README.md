# Nestjs Social-Media Rest Api
Nestjs social media restful api example

## Installation & Clone
```bash
# Download this project
git clone https://github.com/recepkefelii/social-media
```

```bash
# Build and Run
cd ./social-media
npm install

# API Endpoint : http://localhost:8000/api/
```


## API

#### api/auth/register
* `POST` : Create a new account

#### api/auth/login
* `POST` : Login account

#### /api/profile
* `GET` : fetch user information

#### /api/file/upload
* `POST` : Update user profile photo

#### /api/post/create
* `POST` : Create new post

#### /api/post/update/:id[integer]
* `PATCH` : Update post by id

#### /api/post/delete/:id[integer]
* `DELETE` : Delete post by id

#### /api/post/all
* `GET` : Fetch all posts

#### /api/post/user/john[username]
* `GET` : Fetch Post by username

#### /api/followers
* `GET` : Fetch the user's followers

#### /api/following
* `GET` : Fetch the user's following

#### /api/follow/:id[integer]
* `GET` : Follow user by id

#### /api/unfollow/:id[integer]
* `GET` : Unfollow user by id


## Todo

- [x] Support basic REST APIs.
- [x] Support Authentication with user for securing the APIs.
- [ ] Write the tests for all APIs.
- [ ] Detailed documentation will be created