export interface CreateUserInterface {
    UserName: string;
    Email: string;
    DOB: Date;
}

export interface UserInterface {
    Id: number;
    UserName: string;
    Email: string;
    ProfileUrl: string;
    NoOfReactedTimes: number;
    DOB: Date;
}