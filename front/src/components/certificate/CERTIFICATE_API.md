


POST/user/login 토큰발급용
http://localhost:5000/user/login

BODYraw
{
    "email": "ktkim@elicer.com",
    "password":"1234"
}




POSTcertificate/create
http://localhost:5000/certificate/create
HEADERS
Authorization
bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWY0ZmYwYWYtMmE1Zi00ZWVhLTk5ZjItZDE4YjQyYWJhNDE5IiwiaWF0IjoxNjQ3MjMwOTQzfQ.jOGfqncuG-kMk9Oiie27WvI5SdYlJu_4xbucUXlg_z4
BODYraw
{
    "user_id":"af4ff0af-2a5f-4eea-99f2-d18b42aba419",
    "title":"운전면허증",
    "description":"2종 보통입니다.",
    "when_date":"2021-03-20"
}



GETcertificates/:id
http://localhost:5000/certificates/0e6ed708-ef03-4980-9bce-95fcd0e68642
HEADERS
Authorization
bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWY0ZmYwYWYtMmE1Zi00ZWVhLTk5ZjItZDE4YjQyYWJhNDE5IiwiaWF0IjoxNjQ3MjMwOTQzfQ.jOGfqncuG-kMk9Oiie27WvI5SdYlJu_4xbucUXlg_z4





PUTcertificates/:id
http://localhost:5000/certificates/0e6ed708-ef03-4980-9bce-95fcd0e68642
HEADERS
Authorization
bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWY0ZmYwYWYtMmE1Zi00ZWVhLTk5ZjItZDE4YjQyYWJhNDE5IiwiaWF0IjoxNjQ3MjMwOTQzfQ.jOGfqncuG-kMk9Oiie27WvI5SdYlJu_4xbucUXlg_z4
BODYraw
{
    "title":"운전면허증 2탄",
    "description":"수정용 2탄입니다.",
    "when_date":"2099-01-20"
}




GETcertificatelist/:user_id
http://localhost:5000/certificatelist/af4ff0af-2a5f-4eea-99f2-d18b42aba419
HEADERS
Authorization
bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWY0ZmYwYWYtMmE1Zi00ZWVhLTk5ZjItZDE4YjQyYWJhNDE5IiwiaWF0IjoxNjQ3MjMwOTQzfQ.jOGfqncuG-kMk9Oiie27WvI5SdYlJu_4xbucUXlg_z4

