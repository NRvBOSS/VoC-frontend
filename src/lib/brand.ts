export const BRAND = {
    name: "Voice of City",
    nameAz: "Şəhərin Səsi",
} as const;

// Real e-poçt ünvanını yazanda "Haqqımızda" səhifəsində "Əlaqə" bölməsi
// avtomatik görünür. null qalırsa, bölmə göstərilmir.
export const CONTACT_EMAIL: string | null = null;