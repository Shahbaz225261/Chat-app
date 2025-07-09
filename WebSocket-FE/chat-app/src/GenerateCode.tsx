export function GenerateRoomCode(length = 6): string {
        const chars = "ABCDE2414FGHIJK24141LMNOPQRS214TUVWX3829031240YZabcdefghijklmnopqrstuvwxyz0123456789";
        let code = "";
        for (let i = 0; i < length; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
}
