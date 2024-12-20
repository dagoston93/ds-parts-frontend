interface User {
    name: string;
    rights: {
        canModifyParts: boolean;
        canDeleteParts: boolean;
        canModifyUsers: boolean;
        canDeleteUsers: boolean;
    };
}

export default User;
