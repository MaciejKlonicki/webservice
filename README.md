# Web Service
# General info
The application is implemented to simulate websites such as blogs. It provides the ability to register and log in, along with the underlying String Security system. Users on the website can add new posts, edit ONLY their own posts (with the exception of the admin account), delete ONLY their own posts, and sort posts by creation date, popularity, and post rating. Posts can also be filtered by types such as SPORT, MUSIC, EDUCATION, and OTHER, as well as by searching for a post by its title. Users can also track the average rating of a specific post, as well as rate posts and edit their post ratings.
There is also a "Settings" section on each user's account that allows for language changes.

# Technologies

• Java 17

• Spring Boot 6

• Spring Security 6

• PostgreSQL

• Tomcat

• IntelliJ IDEA

• Hibernate

• Maven

• Lombok

• JUnit 5

• JWT token

• React JS

• CSS

# Features 

• Authenticate - provided with Spring Security - Registration, Login and Logout.

• Post Management - get, create, update, delete operations on posts dependent on the role that a particular user has. Sorting posts by: creation date, popularity and rating. Filter posts by type: SPORT, MUSIC, EDUCATION, OTHER and also by title of the post.

• Rating Post Management - get, create, update operations on posts rating dependent on the role that a particular user has.

# Backend Structure
```bash
           
+---src
|   +---main
|   |   +---java
|   |   |   \---pl
|   |   |       \---maciejklonicki
|   |   |           \---ytapp
|   |   |               |   WebServiceApplication.java
|   |   |               |   
|   |   |               +---auditing
|   |   |               |       ApplicationAuditAware.java
|   |   |               |       
|   |   |               +---auth
|   |   |               |   |   AuthAccessDeniedHandler.java
|   |   |               |   |   AuthenticationController.java
|   |   |               |   |   AuthenticationRequest.java
|   |   |               |   |   AuthenticationResponse.java
|   |   |               |   |   AuthenticationService.java
|   |   |               |   |   RegisterRequest.java
|   |   |               |   |   
|   |   |               |   \---exception
|   |   |               |           PasswordMismatchException.java
|   |   |               |           
|   |   |               +---config
|   |   |               |   |   ApplicationConfig.java
|   |   |               |   |   JwtAuthenticationFilter.java
|   |   |               |   |   JwtService.java
|   |   |               |   |   LogoutService.java
|   |   |               |   |   SecurityConfig.java
|   |   |               |   |   
|   |   |               |   \---exception
|   |   |               |           LogoutException.java
|   |   |               |           
|   |   |               +---postrating
|   |   |               |   |   PostRating.java
|   |   |               |   |   PostRatingController.java
|   |   |               |   |   PostRatingRepository.java
|   |   |               |   |   PostRatingService.java
|   |   |               |   |   PostRatingServiceImpl.java
|   |   |               |   |   
|   |   |               |   +---dto
|   |   |               |   |       EditPostRatingRequest.java
|   |   |               |   |       RatePostRequest.java
|   |   |               |   |       
|   |   |               |   \---exception
|   |   |               |           PostAlreadyRatedAdvice.java
|   |   |               |           PostAlreadyRatedException.java
|   |   |               |           PostRatingNotFoundAdvice.java
|   |   |               |           PostRatingNotFoundException.java
|   |   |               |           
|   |   |               +---posts
|   |   |               |   |   Post.java
|   |   |               |   |   PostController.java
|   |   |               |   |   PostRepository.java
|   |   |               |   |   PostService.java
|   |   |               |   |   PostServiceImpl.java
|   |   |               |   |   PostType.java
|   |   |               |   |   
|   |   |               |   +---dto
|   |   |               |   |       CreatePostDTO.java
|   |   |               |   |       GetAllPostsDTO.java
|   |   |               |   |       SinglePostDTO.java
|   |   |               |   |       UpdatePostDTO.java
|   |   |               |   |       
|   |   |               |   \---exception
|   |   |               |           PostNotFoundAdvice.java
|   |   |               |           PostNotFoundException.java
|   |   |               |           PostTitleAlreadyExistsAdvice.java
|   |   |               |           PostTitleAlreadyExistsException.java
|   |   |               |           UnauthorizedAdvice.java
|   |   |               |           UnauthorizedException.java
|   |   |               |           
|   |   |               +---token
|   |   |               |       Token.java
|   |   |               |       TokenRepository.java
|   |   |               |       TokenType.java
|   |   |               |       
|   |   |               \---users
|   |   |                   |   Role.java
|   |   |                   |   UserRepository.java
|   |   |                   |   Users.java
|   |   |                   |   
|   |   |                   \---exception
|   |   |                           UsersEmailAlreadyExistsAdvice.java
|   |   |                           UsersEmailAlreadyExistsException.java
|   |   |                           UsersNotFoundAdvice.java
|   |   |                           UsersNotFoundException.java
|   |   |                           
|   |   \---resources
|   |           application-dev.properties
|   |           application.properties
|   |           
|   \---test
|       \---java
|           \---pl
|               \---maciejklonicki
|                   \---ytapp
|                       |   WebServiceApplicationTests.java
|                       |   
|                       +---auth
|                       |       AuthenticationServiceTest.java
|                       |       
|                       +---postrating
|                       |       PostRatingServiceImplTest.java
|                       |       
|                       \---posts
|                               PostServiceImplTest.java             
```

# Frontend Structure
```bash
+---public     
|   \---locales
|       +---en
|       |       translation.json
|       |       
|       \---pl
|               translation.json
|               
\---src
    |   App.js
    |   App.test.js
    |   i18next.js
    |   index.css
    |   index.js
    |   logo.svg
    |   reportWebVitals.js
    |   setupTests.js
    |   
    \---components
        |   NavigationBar.js
        |   NotFound.css
        |   NotFound.js
        |   
        +---posts
        |       Body.js
        |       CreatePost.js
        |       EditPost.js
        |       EditPostRating.js
        |       PostDetails.js
        |       RatingBox.js
        |       
        +---service
        |       PostService.js
        |       
        +---settings
        |       Settings.css
        |       Settings.js
        |       
        \---user
                Login.js
                Registration.js
```

# Rest API

### Auth

| Method | URL | Description | Sample body |
| :---: | :---: | :---: | :---: |
| POST | /api/v1/auth/register | Sign up | [JSON](#signup) |
| POST | /api/v1/auth/authenticate | Sign in | [JSON](#signin) |
| POST | /api/v1/auth/logout | Logout | [JSON](#logout) |

### Posts

| Method | URL | Description | Sample body |
| :---: | :---: | :---: | :---: |
| GET | /api/v1/posts | Get all posts | [JSON](#getallposts) |
| GET | /api/v1/posts/{id} | Get single post | [JSON](#getsinglepost) |
| GET | /api/v1/posts/user/{username} | Get user posts| [JSON](#getuserposts) |
| GET | /api/v1/posts/sorted-desc-by-popularity | Sort post descending by popularity | [JSON](#sortpostdescendingbypopularity) |
| GET | /api/v1/posts/sorted-desc-by-creation-date | Sort post descending by creation date | [JSON](#sortpostdescendingbycreationdate) |
| GET | /api/v1/posts/sorted-desc-by-rating | Sort post descending by rating | [JSON](#sortpostdescendingbyrating) |
| GET | /api/v1/posts/sorted-asc-by-popularity | Sort post ascending by popularity | [JSON](#sortpostascendingbypopularity) |
| GET | /api/v1/posts/sorted-asc-by-creation-date | Sort post ascending by creation date | [JSON](#sortpostascendingbycreationdate) |
| GET | /api/v1/posts/sorted-asc-by-rating | Sort post ascending by rating | [JSON](#sortpostascendingbyrating) |
| GET | /api/v1/posts/{postId}/average-rating | Get post average rating | [JSON](#getpostaveragerating) |
| POST | /api/v1/posts | Create new post | [JSON](#createnewpost) |
| DELETE | /api/v1/posts/{id} | Delete post | [JSON](#deletepost) |
| PUT | /api/v1/posts/update/{id} | Update post | [JSON](#updatepost) |
| PUT | /api/v1/posts/{id}/increment-popularity" | Increment post popularity | [JSON](#incrementpostpopularity) |

### Post rating

| Method | URL | Description | Sample body |
| :---: | :---: | :---: | :---: |
| GET | /api/v1/post-ratings/get-rating | Get post rating | [JSON](#getpostrating) |
| POST | /api/v1/post-ratings/rate | Add post rating | [JSON](#addpostrating) |
| PUT | /api/v1/post-ratings/edit-rating | Edit post rating | [JSON](#editpostrating) |

# Sample JSON Request/Response

#### <a id="signup">Sign up -> /api/v1/auth/register</a>
```json
{
    "username": "STRING",
    "email": "STRING",
    "password": "STRING",
    "confirmPassword": "STRING",
    "mobile": "STRING"
}
```

#### <a id="signin">Sign in -> /api/v1/auth/authenticate</a>
```json
{
    "username": "STRING",
    "password": "STRING"
}
```

#### <a id="logout">Logout -> /api/v1/auth/logout</a>
```json
{
    Logout successful!  
}
```

#### <a id="getallposts">Get all posts -> /api/v1/posts</a>
```json
[
    {
        "id": LONG,
        "title": "STRING",
        "body": "STRING",
        "author": "STRING",
        "type": "STRING",
        "creationDate": "DATE",
        "photo": "BYTE []",
        "popularity": 0,
        "totalRatings": 0
    }
]
```

#### <a id="getsinglepost">Get single post -> /api/v1/posts/{id}</a>
```json
{
    "title": "STRING",
    "body": "STRING",
    "author": "STRING",
    "type": "STRING"
}
```

#### <a id="getuserposts">Get user posts -> /api/v1/posts/user/{username}</a>

`Authorization -> Bearer Token`
```json
[
    {
        "id": LONG,
        "title": "STRING",
        "body": "STRING",
        "author": "STRING",
        "type": "STRING",
        "creationDate": "DATE",
        "photo": "BYTE []",
        "popularity": 0,
        "totalRatings": 0
    }
]
```

#### <a id="sortpostdescendingbypopularity">Sort post descending by popularity -> /api/v1/posts/sorted-by-popularity</a>
```json
[
    {
        "title": "STRING",
        "body": "STRING",
        "author": "STRING",
        "type": "STRING",
        "creationDate": "DATE",
        "photo": "BYTE []",
        "popularity": 0,
        "totalRatings": 0
    }
]
```

#### <a id="sortpostdescendingbycreationdate">Sort post descending by creation date -> /api/v1/posts/sorted-by-creation-date</a>
```json
[
    {
        "title": "STRING",
        "body": "STRING",
        "author": "STRING",
        "type": "STRING",
        "creationDate": "DATE",
        "photo": "BYTE []",
        "popularity": 0,
        "totalRatings": 0
    }
]
```

#### <a id="sortpostdescendingbyrating">Sort post descending by rating -> /api/v1/posts/sorted-by-rating</a>
```json
[
    {
        "title": "STRING",
        "body": "STRING",
        "author": "STRING",
        "type": "STRING",
        "creationDate": "DATE",
        "photo": "BYTE []",
        "popularity": 0,
        "totalRatings": 0
    }
]
```

#### <a id="sortpostascendingbypopularity">Sort post ascending by popularity -> /api/v1/posts/sorted-by-popularity</a>
```json
[
    {
        "title": "STRING",
        "body": "STRING",
        "author": "STRING",
        "type": "STRING",
        "creationDate": "DATE",
        "photo": "BYTE []",
        "popularity": 0,
        "totalRatings": 0
    }
]
```

#### <a id="sortpostascendingbycreationdate">Sort post ascending by creation date -> /api/v1/posts/sorted-by-creation-date</a>
```json
[
    {
        "title": "STRING",
        "body": "STRING",
        "author": "STRING",
        "type": "STRING",
        "creationDate": "DATE",
        "photo": "BYTE []",
        "popularity": 0,
        "totalRatings": 0
    }
]
```

#### <a id="sortpostascendingbyrating">Sort post ascending by rating -> /api/v1/posts/sorted-by-rating</a>
```json
[
    {
        "title": "STRING",
        "body": "STRING",
        "author": "STRING",
        "type": "STRING",
        "creationDate": "DATE",
        "photo": "BYTE []",
        "popularity": 0,
        "totalRatings": 0
    }
]
```

#### <a id="getpostaveragerating">Get post average rating -> /api/v1/posts/{postId}/average-rating</a>
```json
    DOUBLE
```

#### <a id="createnewpost">Create new post -> /api/v1/posts</a>

`Authorization -> Bearer Token`
```json
    {
        "title": "STRING",
        "body": "STRING",
        "author": "STRING",
        "type": "STRING",
        "creationDate": "DATE",
        "photo": "BYTE []"
    }
```

#### <a id="deletepost">Delete post -> /api/v1/posts/{id}</a>

`Authorization -> Bearer Token`
```json
    Delete successful!
```

#### <a id="updatepost">Update post -> /api/v1/posts/update/{id}</a>

`Authorization -> Bearer Token`
```json
  {
    "title": "STRING",
    "body": "STRING",
    "type": "STRING"
  }
```

 #### <a id="incrementpostpopularity">Increment post popularity -> /api/v1/posts/{id}/increment-popularity</a>

 ```json
    Implemented!
```

#### <a id="getpostrating">Get post rating -> /api/v1/post-ratings/get-rating</a>

```json
{
    "id": LONG,
    "rating": INT
}
```

#### <a id="addpostrating">Add post rating -> /api/v1/post-ratings/rate</a>

`Authorization -> Bearer Token`
```json
    You rated post successfuly!
```

#### <a id="editpostrating">Edit post rating -> /api/v1/post-ratings/edit-rating</a>

`Authorization -> Bearer Token`
```json
    You have changed the rate of the post successfuly!
```
