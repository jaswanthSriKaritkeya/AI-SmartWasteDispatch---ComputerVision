from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from app.auth import SECRET_KEY, ALGORITHM
from app.database import users_collection
from bson import ObjectId


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={
            "WWW-Authenticate": "Bearer"
        }
    )

    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("user_id")

        if user_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    try:
        user = users_collection.find_one({
            "_id": ObjectId(user_id)
        })
    except Exception:
        raise credentials_exception

    if user is None:
        raise credentials_exception

    return user




def require_citizen(current_user=Depends(get_current_user)):

    if current_user["role"] != "citizen":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Citizen access required"
        )

    return current_user


def require_captain(current_user=Depends(get_current_user)):

    if current_user["role"] != "captain":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Captain access required"
        )

    return current_user