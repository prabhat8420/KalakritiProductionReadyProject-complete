from fastapi import HTTPException, status

class AppException(HTTPException):
    def __init__(self, status_code: int, message: str, details: dict = None):
        super().__init__(status_code=status_code, detail={"message": message, "details": details or {}})

class NotFoundException(AppException):
    def __init__(self, resource: str, identifier: str):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            message=f"{resource} with id '{identifier}' not found"
        )

class UnauthorizedException(AppException):
    def __init__(self, message: str = "Invalid or expired authentication credentials"):
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, message=message)

class ForbiddenException(AppException):
    def __init__(self, message: str = "You do not have permission to perform this action"):
        super().__init__(status_code=status.HTTP_403_FORBIDDEN, message=message)

class ValidationException(AppException):
    def __init__(self, message: str, errors: dict = None):
        super().__init__(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, message=message, details=errors)
