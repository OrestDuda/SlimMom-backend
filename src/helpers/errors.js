class ProjectErrors extends Error {
    constructor(message) {
        super(message)
        this.status = 400
    }
}

class ValidationError extends ProjectErrors {
    constructor(message) {
        super(message)
        this.status = 400
    }
}

class EmailInUseError extends ProjectErrors {
    constructor(message) {
        super(message)
        this.status = 409
    }
}

class NotAuthorizedError extends ProjectErrors {
    constructor(message) {
        super(message)
        this.status = 401
    }
}

module.exports = {
    ProjectErrors,
    ValidationError,
    EmailInUseError,
    NotAuthorizedError
}