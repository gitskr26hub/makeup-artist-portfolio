import admin from "firebase-admin";

let firestore: admin.firestore.Firestore;

try {
    if (!admin.apps.length) {
        const privateKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.replace(/\\n/g, "\n");

        if (!privateKey) throw new Error("Missing Firebase private key");

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey,
            }),
        });
    }

    firestore = admin.firestore();
} catch (error) {
    console.error("Firebase initialization failed:", error);
    throw error;
}

export const admindb = firestore;