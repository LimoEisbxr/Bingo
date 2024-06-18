export const prisma = new PrismaClient() as any;

export async function getUserData(googleId: string): Promise<any> {
    return prisma.bingoUser.findUnique({
        where: {
            googleId: googleId,
        },
    });
}

export async function saveToDB(
    modelName: string,
    uniqueIdentifier: string,
    data: any[]
): Promise<void> {
    try {
        for (const item of data) {
            await prisma[modelName].upsert({
                where: { [uniqueIdentifier]: item[uniqueIdentifier] },
                update: item,
                create: item,
            });
        }
        console.log('Data saved successfully');
    } catch (error) {
        console.error(
            `An error occurred while saving the data to ${modelName}:`,
            error
        );
    }
}

export async function getAllEntries(modelName: string): Promise<any[]> {
    return prisma[modelName].findMany();
}

export async function readDB(modelName: string): Promise<any[]> {
    return prisma[modelName].findMany();
}

export async function getDataFromTableByKey(
    modelName: string,
    uniqueKey: string,
    keyValue: any
): Promise<any[]> {
    return prisma[modelName].findMany({
        where: {
            [uniqueKey]: keyValue,
        },
    });
}
