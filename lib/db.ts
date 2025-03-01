import {Prisma, PrismaClient} from '@prisma/client'
const db = globalThis.prisma || new PrismaClient()

declare global{
    var prisma: PrismaClient | undefined
}
if(process.env.NODE_ENV !== 'production'){
    globalThis.prisma = db
}
export default db;