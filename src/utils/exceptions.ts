export class UnauthorizedException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedException';
    }
}
export class ForbiddenException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ForbiddenException';
    }
}
export class BadRequestException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BadRequestException';
    }
}
export class InternalServerException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InternalServerException';
    }
}
export class UnexpectedException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnexpectedException';
    }
}
export class NotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundException';
    }
}
export class NotAcceptableException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotAcceptableException';
    }
}