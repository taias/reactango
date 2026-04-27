"""
Domain Exceptions - ドメイン層の例外クラス
"""


class DomainException(Exception):
    """ドメイン層の基底例外クラス"""
    
    def __init__(self, message: str, code: str = None):
        super().__init__(message)
        self.message = message
        self.code = code or "DOMAIN_ERROR"


class DuplicateCodeException(DomainException):
    """コード重複時の例外"""
    
    def __init__(self, code_value, entity_name: str = None):
        entity_info = f" in {entity_name}" if entity_name else ""
        message = f"Code '{code_value}' already exists{entity_info}"
        super().__init__(message, code="DUPLICATE_CODE")
        self.duplicate_code = code_value
        self.entity_name = entity_name


class EntityNotFoundException(DomainException):
    """エンティティが見つからない場合の例外"""
    
    def __init__(self, entity_name: str, entity_id):
        message = f"{entity_name} with id '{entity_id}' not found"
        super().__init__(message, code="ENTITY_NOT_FOUND")
        self.entity_name = entity_name
        self.entity_id = entity_id


class ValidationException(DomainException):
    """バリデーションエラーの例外"""
    
    def __init__(self, message: str, field: str = None):
        super().__init__(message, code="VALIDATION_ERROR")
        self.field = field
