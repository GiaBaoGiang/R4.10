Groupe G4B

Duo Germaneau Noah, Giang Gia Bao



## Documentation POSTMAN

GET http://localhost:5402/api/likes/movie/699e9500fcb60464962bf5e4


{
  "success": true,
  "count": 0,
  "data": []
}
renvoie la liste des likes du films


GET http://localhost:5402/api/likes/my-likes


{
  "success": true,
  "data": []
}


POST http://localhost:5402/api/likes/


body
{
  "movieId": "699e9500fcb60464962bf5e4"
}


{
  "success": true,
  "data": {
    "user": "69c3dea1396423c923b37a94",
    "movie": "699e9499fcb60464962bf596",
    "_id": "69c3ea0a6a23bac80e2077f8",
    "createdAt": "2026-03-25T13:58:34.051Z",
    "updatedAt": "2026-03-25T13:58:34.051Z",
    "__v": 0
  }
}

DELETE http://localhost:5402/api/likes/69c3ea0a6a23bac80e2077f8


{
  "success": true,
  "message": "Like supprimé"
}


