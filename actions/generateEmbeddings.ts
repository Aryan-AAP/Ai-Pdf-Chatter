'use server'

import { generateEmbeddingsInPineconeVectorStore } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generateEmbeddings(decId:string) {
    auth().protect()
    await generateEmbeddingsInPineconeVectorStore(decId);

    revalidatePath(`/dashboard`)
    return {completed:true};
}